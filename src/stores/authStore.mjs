
import { reactive, toRefs } from 'vue';
import api, { endpoint } from '/src/libs/api.mjs';
import { getLocalStorageItem, setLocalStorageItem } from '/src/libs/localStorageHelpers.mjs';


// Create a reactive store
const authStore = reactive({
  authInfo: null,
  isAuthenticated: false,
  errorLogin: null,
  isProcessing: false,
  isAdmin: false,
});


// Mutations
const setAuthInfo = (authInfo) => {
  const { user, token, userToken } = authInfo || {};
  if (userToken)
    setLocalStorageItem('authInfo', userToken);
  else
    setLocalStorageItem('authInfo', null);
  authStore.authInfo = authInfo;
  authStore.isAdmin = user?.role === 'admin';
  authStore.isAuthenticated = Boolean(token);
};


// Actions
const login = (username, password) => {
  authStore.errorLogin = null;
  authStore.isProcessing = true;

  api.post(`${endpoint}/graphql`, {
    query: `
      mutation {
        login(email: "${username}", password: "${password}") {
          user { id name role email }, token, userToken
        }
      }
    `
  }).then((result) => {

    authStore.isProcessing = false;

    const { data, errors } = result.data || {};
    if (Array.isArray(errors) && errors.length > 0) {
      authStore.errorLogin = errors[0].message;
      return;
    }

    setAuthInfo(data.login);
  }).catch((error) => {
    authStore.isProcessing = false;
    console.error('Error:', error);
  });
};

const logout = () => {
  setAuthInfo(null);
};

const init = async () => {
  const authInfo = getLocalStorageItem('authInfo');

  if (!authInfo)
    return;

  authStore.isProcessing = true;

  try {
    const result = await api.post(`${endpoint}/graphql`, {
      query: `
        mutation {
          decryptUserToken(userToken: "${authInfo}") {
            user { id name role email }, token
          }
        }
      `,
    });

    const { data, errors } = result.data || {};
    authStore.isProcessing = false;

    if (Array.isArray(errors) && errors.length > 0) {
      // authStore.errorLogin = errors[0].message;
      return;
    }

    setAuthInfo({ ...data.decryptUserToken, userToken: authInfo });
  } catch (error) {
    authStore.isProcessing = false;
    console.error('Error:', error);
  };
};


// Use toRefs for read-only access in components
const useAuthStore = () => {
  return toRefs(authStore);
};


export { useAuthStore, login, logout, init };
