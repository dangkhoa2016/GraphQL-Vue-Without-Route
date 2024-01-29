
import { reactive, toRefs } from 'vue';
// import { sleep } from '/src/libs/helpers.mjs';
import api, { endpoint } from '/src/libs/api.mjs';
import { setCat, } from './catsStore.mjs';
import { setUser, } from './usersStore.mjs';
import { setPhoto, } from './photosStore.mjs';

const setters = {
  'Cat': setCat,
  'User': setUser,
  'Photo': setPhoto
};

const graphqlFields = {
  'Cat': 'id, name, status, likes_count',
  'User': 'id, name, status, likes_count',
  'Photo': 'id, title, status, likes_count'
};


// Create a reactive store
const toggleStatusesStore = reactive({
  togglingStatus: false,
  toggleStatusResult: null,
  errorTogglingStatus: null,
});

// Mutations


// Actions
const toggleStatus = async (type, id, active, token) => {
  // console.log('toggleStatus', type, id, active);
  toggleStatusesStore.togglingStatus = true;
  toggleStatusesStore.toggleStatusResult = null;
  toggleStatusesStore.errorTogglingStatus = null;

  // await sleep(5000);

  try {
    const response = await api.post(`${endpoint}/graphql`, {
      query: `
        mutation {
          toggleStatus${type}(${type.toLowerCase()}Id: ${id}, active: ${active}) {
            ${graphqlFields[type]}
          }
        }
      `,
    }, {
      headers: {
        'x-access-token': `${token}`
      }
    });

    const { data, errors } = response.data || {};
    if (errors && errors.length > 0)
      throw new Error(errors[0].message);

    const toggleStatusResult = (data || {})[`toggleStatus${type}`];
    // console.log('toggleStatusResult', toggleStatusResult);
    toggleStatusesStore.togglingStatus = false;
    toggleStatusesStore.toggleStatusResult = toggleStatusResult;

    if (setters[type]) {
      setters[type](toggleStatusResult, true);
    } else {
      console.error(`Invalid type: ${type}`);
    }

    return toggleStatusResult;
  } catch (error) {
    console.log('toggleStatus error:', error);
    toggleStatusesStore.togglingStatus = false;
    toggleStatusesStore.errorTogglingStatus = error.message;
    return null;
  }
};

const resetToggleStatusResult = () => {
  toggleStatusesStore.toggleStatusResult = null;
};

const setErrorTogglingStatus = (error) => {
  toggleStatusesStore.errorTogglingStatus = error;
};


// Use toRefs for read-only access in components
const useToggleStatusesStore = () => {
  return toRefs(toggleStatusesStore);
};


export { useToggleStatusesStore, toggleStatus, setErrorTogglingStatus, resetToggleStatusResult };
