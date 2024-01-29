
import { reactive, toRefs } from 'vue';
import api, { endpoint } from '/src/libs/api.mjs';
// import { sleep } from '/src/libs/helpers.mjs';
import { setLocalStorageItem, getLocalStorageItem } from '/src/libs/localStorageHelpers.mjs';


// Create a reactive store
const userStore = reactive({
  user: null,
  loadingUser: false,
  loadingUsers: false,
  users: null,
  totalItems: 0,
  totalPages: 0,
  loadUsersError: null,
  loadUserError: null,
});


// Mutations
const setUser = (user, merge = false) => {
  userStore.user = merge ? { ...userStore.user, ...user } : user;
  if (!userStore.users || !user)
    return;

  const users = userStore.users;
  const indx = users.findIndex(u => u.id === user.id);
  if (indx !== -1)
    users[indx] = { ...users[indx], ...user };
  else
    users.push(user);
};

const setToggleFollowResult = (id, result) => {
  const users = userStore.users;
  if (users) {
    const indx = users.findIndex(u => u.id.toString() === id.toString());
    if (indx !== -1)
      users[indx] = { ...users[indx], ...result };
  }

  if (userStore.user && userStore.user.id.toString() === id.toString())
    userStore.user = { ...userStore.user, ...result };
};

const setResults = (users, totalItems, totalPages) => {
  userStore.users = users;
  userStore.totalItems = totalItems;
  userStore.totalPages = totalPages;
};


// Actions

const setLoadUsersError = (error) => {
  userStore.loadUsersError = error;
};

const setLoadUserError = (error) => {
  userStore.loadUserError = error;
};

const fetchUser = async (id, fields, token) => {
  // console.log('fetchUser', id, fields);
  setUser(null);
  userStore.loadingUser = true;
  userStore.loadUserError = null;
  // await sleep(5000);

  try {
    const response = await api.post(`${endpoint}/graphql`, {
      query: `
        query {
          user(id: "${id}") { ${fields} }
        }
      `
    }, {
      headers: {
        'x-access-token': (token ?? '')
      }
    });
    const { data, errors } = response.data || {};
    if (errors && errors.length > 0)
      throw new Error(errors[0].message);

    setUser(data.user);
  } catch (ex) {
    console.log('Error fetch user', ex);
    userStore.loadUserError = ex.message;
  }

  userStore.loadingUser = false;
  return userStore.user;
};

const fetchUsers = async (fields, token, mainField, pageIndex, itemsPerPage) => {
  // console.log('fetchUsers', fields, mainField, pageIndex, itemsPerPage);
  userStore.loadingUsers = true;
  setLoadUsersError(null);
  setResults(null, 0, 0);
  // await sleep(5000);

  try {
    const response = await api.post(`${endpoint}/graphql`, {
      query: `
        query {
          users(pageIndex: ${pageIndex}, pageSize: ${itemsPerPage}) {
            items { ${fields} },
            total_items, total_pages
          }
        }
      `
    }, {
      headers: {
        'x-access-token': (token ?? '')
      }
    });

    const { data, errors } = response.data || {};
    if (errors && errors.length > 0)
      throw new Error(errors[0].message);

    const users = (data || {})[mainField];
    const { items = [], total_items, total_pages } = users || {};
    // console.log('users', items);
    setResults(items, total_items, total_pages);
  } catch (ex) {
    console.log('Error fetch users', ex);
    setLoadUsersError(ex.message);
  }

  userStore.loadingUsers = false;
  return userStore.users;
};

const getUserById = (id) => {
  if (!id)
    return null;

  if (!userStore.users) {
    if (userStore.user && userStore.user.id.toString() === id.toString())
      return userStore.user;
  }

  return userStore.users.find(u => u.id.toString() === id.toString());
};

const getPendingLoadUserId = () => {
  return getLocalStorageItem('pendingLoadUserId');
};

const setPendingLoadUserId = (id) => {
  setLocalStorageItem('pendingLoadUserId', id);
};


// Use toRefs for read-only access in components
const useUserStore = () => {
  return toRefs(userStore);
};


export {
  useUserStore, setLoadUsersError,
  fetchUsers, fetchUser, setUser, setResults, getUserById,
  setToggleFollowResult, setLoadUserError,
  setPendingLoadUserId, getPendingLoadUserId,
};
