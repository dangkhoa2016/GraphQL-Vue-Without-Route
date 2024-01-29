
import { reactive, toRefs } from 'vue';
import api, { endpoint } from '/src/libs/api.mjs';
// import { sleep } from '/src/libs/helpers.mjs';


// Create a reactive store
const homeStore = reactive({
  users: null,
  loadingUsers: false,
  loadUsersError: null,
});


// Mutations
const setUsers = (users) => {
  homeStore.users = users;
};

const setToggleFollowResult = (id, result) => {
  const users = homeStore.users;
  if (users) {
    const indx = users.findIndex(u => u.id.toString() === id.toString());
    if (indx !== -1)
      users[indx] = { ...users[indx], ...result };
  }
};


// Actions
const fetchTopUsers = async (fields, pageSize, token) => {
  homeStore.loadingUsers = true;
  homeStore.loadUsersError = null;
  setUsers(null);
  // await sleep(5000);

  try {
    // const response = await api.get('/graphql/top-users', { params: fields });
    const response = await api.post(`${endpoint}/graphql`, {
      query: `
        query {
          topUsersByLikeCount(pageSize: ${pageSize}) {
            id, name, image, followed, followers_count, job_title,
            country, cats_count, photos_count, status, created_at, likes_count
          }
        }
      `,
    }, {
      headers: {
        'x-access-token': (token ?? '')
      }
    });

    const { data, errors } = response.data || {};
    if (Array.isArray(errors) && errors.length > 0)
      throw new Error(errors[0].message);

    const { topUsersByLikeCount = [] } = data || {};
    setUsers(topUsersByLikeCount);
  } catch (ex) {
    console.log('Error fetch users', ex);
    homeStore.loadUsersError = ex.message;
  }

  homeStore.loadingUsers = false;
  return homeStore.users;
};


// Use toRefs for read-only access in components
const useHomeStore = () => {
  return toRefs(homeStore);
};


export { useHomeStore, fetchTopUsers, setToggleFollowResult };
