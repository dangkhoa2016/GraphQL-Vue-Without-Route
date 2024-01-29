
import { reactive, toRefs } from 'vue';
// import { sleep } from '/src/libs/helpers.mjs';
import api, { endpoint } from '/src/libs/api.mjs';
import { setToggleFollowResult, } from './usersStore.mjs';
import { setToggleFollowResult as setHomeToggleFollowResult, } from './homeStore.mjs';

const maxFollowRequest = 2;
const maxUnfollowRequest = 2;


// Create a reactive store
const toggleFollowsStore = reactive({
  following: {},
  followResult: {},
  unfollowing: {},
  unfollowResult: {},
  errorFollowing: {},
  errorUnfollowing: {},
});

// Mutations

// Actions
const follow = async (id, token) => {
  if (Object.keys(toggleFollowsStore.following).length >= maxFollowRequest) {
    const err = new Error('Max follow request reached, please wait a few seconds and try again.');
    err.name = 'MaxFollowRequestReached';
    throw err;
  }

  // console.log('follow', id);
  toggleFollowsStore.following[id] = true;
  toggleFollowsStore.followResult[id] = null;

  // await sleep(5000);

  try {
    const response = await api.post(`${endpoint}/graphql`, {
      query: `
      mutation {
        follow(userId: ${id}) {
          id, name, image, followers_count, likes_count, followed
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

    const followResult = (data || {}).follow;
    // console.log('followResult', followResult);
    toggleFollowsStore.following[id] = false;
    toggleFollowsStore.followResult[id] = followResult;

    setToggleFollowResult(id, followResult);
    setHomeToggleFollowResult(id, followResult);

    // clear the state after 500 milliseconds
    setTimeout(() => {
      delete toggleFollowsStore.following[id];
      delete toggleFollowsStore.followResult[id];
    }, 500);

    return followResult;
  } catch (ex) {
    console.log('Error follow', ex);
    toggleFollowsStore.following[id] = false;
    toggleFollowsStore.errorFollowing[id] = ex.message;
    return null;
  }
};

const unfollow = async (id, token) => {
  if (Object.keys(toggleFollowsStore.unfollowing).length >= maxUnfollowRequest) {
    const err = new Error('Max unfollow request reached, please wait a few seconds and try again.');
    err.name = 'MaxUnfollowRequestReached';
    throw err;
  }

  // console.log('unfollow', id);
  toggleFollowsStore.unfollowing[id] = true;
  toggleFollowsStore.unfollowResult[id] = null;
  toggleFollowsStore.errorUnfollowing[id] = null;

  // await sleep(5000);

  try {
    const response = await api.post(`${endpoint}/graphql`, {
      query: `
      mutation {
        unfollow(userId: ${id}) {
          id, name, image, followers_count, likes_count, followed
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

    const unfollowResult = (data || {}).unfollow;
    // console.log('unfollowResult', unfollowResult);
    toggleFollowsStore.unfollowing[id] = false;
    toggleFollowsStore.unfollowResult[id] = unfollowResult;

    setToggleFollowResult(id, unfollowResult);
    setHomeToggleFollowResult(id, unfollowResult);

    // clear the state after 500 milliseconds
    setTimeout(() => {
      delete toggleFollowsStore.unfollowing[id];
      delete toggleFollowsStore.unfollowResult[id];
    }, 500);

    return unfollowResult;
  } catch (ex) {
    console.log('Error unfollow', ex);
    toggleFollowsStore.unfollowing[id] = false;
    toggleFollowsStore.errorUnfollowing[id] = ex.message;
    return null;
  }
};

const isFollowing = (id) => {
  return toggleFollowsStore.following[id];
};

const isUnfollowing = (id) => {
  return toggleFollowsStore.unfollowing[id];
};

const getFollowResult = (id) => {
  return toggleFollowsStore.followResult[id];
};

const getUnfollowResult = (id) => {
  return toggleFollowsStore.unfollowResult[id];
};

const getUnfollowError = (id) => {
  return toggleFollowsStore.errorUnfollowing[id];
};

const getFollowError = (id) => {
  return toggleFollowsStore.errorFollowing[id];
};

const resetFollowResult = (id) => {
  delete toggleFollowsStore.followResult[id];
  delete toggleFollowsStore.following[id];
  delete toggleFollowsStore.errorFollowing[id];
};

const resetUnfollowResult = (id) => {
  delete toggleFollowsStore.unfollowResult[id];
  delete toggleFollowsStore.unfollowing[id];
  delete toggleFollowsStore.errorUnfollowing[id];
};


// Use toRefs for read-only access in components
const useToggleFollowsStore = () => {
  return toRefs(toggleFollowsStore);
};


export {
  follow,
  unfollow,
  isFollowing,
  isUnfollowing,
  getFollowResult,
  getUnfollowResult,
  resetFollowResult,
  resetUnfollowResult,
  useToggleFollowsStore,
  getUnfollowError,
  getFollowError,
};
