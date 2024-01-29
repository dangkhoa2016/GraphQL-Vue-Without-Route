
import { reactive, toRefs } from 'vue';
// import { sleep } from '/src/libs/helpers.mjs';
import api, { endpoint } from '/src/libs/api.mjs';
import { setToggleLikeResult as setToggleLikeCatResult, } from './catsStore.mjs';
import { setToggleLikeResult as setToggleLikePhotoResult, } from './photosStore.mjs';
import { getLocalStorageItem, setLocalStorageItem } from '/src/libs/localStorageHelpers.mjs';

const maxLikeRequest = 2;
const maxUnlikeRequest = 2;
const updateMethod = {
  'Cat': setToggleLikeCatResult,
  'Photo': setToggleLikePhotoResult,
}


// Create a reactive store
const toggleLikesStore = reactive({
  toggleLikingCat: {},
  toggleUnlikingCat: {},
  toggleLikeCatResult: {},
  toggleUnlikeCatResult: {},
  errorLikingCat: {},
  errorUnlikingCat: {},


  toggleLikingPhoto: {},
  toggleUnlikingPhoto: {},
  toggleLikePhotoResult: {},
  toggleUnlikePhotoResult: {},
  errorLikingPhoto: {},
  errorUnlikingPhoto: {},

  likeCatData: [],
  likePhotoData: [],
});

// Mutations


// Actions
const toggleLike = async (type, id, token, fields) => {
  if (Object.keys(toggleLikesStore[`toggleLiking${type}`]).length >= maxLikeRequest) {
    const err = new Error('Max like request reached, please wait a few seconds and try again.');
    err.name = 'MaxUnlikeRequestReached';
    throw err;
  }

  // console.log('toggleLike', type, id);
  toggleLikesStore[`toggleLiking${type}`][id] = true;
  toggleLikesStore[`toggleLike${type}Result`][id] = null;
  toggleLikesStore[`errorLiking${type}`][id] = null;

  // await sleep(5000);

  let toggleResult = null;

  const response = await api.post(`${endpoint}/graphql`, {
    query: `
      mutation {
        updateLike${type}(${type.toLowerCase()}Id: ${id}, like: true) {
          ${fields}
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

  toggleResult = (data || {})[`updateLike${type}`];
  // console.log('toggleResult', toggleResult);
  // toggleLikesStore[`toggleLiking${type}`][id] = false;
  toggleLikesStore[`toggleLike${type}Result`][id] = toggleResult;

  // Update local storage
  const likeData = toggleLikesStore[`like${type}Data`];
  if (!likeData.includes(id)) {
    likeData.push(id);
    setLocalStorageItem(`like${type}`, likeData);
  }

  if (updateMethod[type])
    updateMethod[type](toggleResult);
  else
    console.error(`Invalid type: ${type}`);


  // clear the state after 500 milliseconds
  setTimeout(() => {
    delete toggleLikesStore[`toggleLiking${type}`][id];
    delete toggleLikesStore[`toggleLike${type}Result`][id];
    delete toggleLikesStore[`errorLiking${type}`][id];
  }, 500);

  toggleLikesStore[`toggleLiking${type}`][id] = false;
  return toggleResult;
};

const toggleUnlike = async (type, id, token, fields) => {
  if (Object.keys(toggleLikesStore[`toggleUnliking${type}`]).length >= maxUnlikeRequest) {
    const err = new Error('Max unlike request reached, please wait a few seconds and try again.');
    err.name = 'MaxLikeRequestReached';
    throw err;
  }

  // console.log('toggleUnlike', type, id);
  toggleLikesStore[`toggleUnliking${type}`][id] = true;
  toggleLikesStore[`toggleUnlike${type}Result`][id] = null;
  toggleLikesStore[`errorUnliking${type}`][id] = null;

  // await sleep(5000);

  let toggleResult = null;

  const response = await api.post(`${endpoint}/graphql`, {
    query: `
      mutation {
        updateLike${type}(${type.toLowerCase()}Id: ${id}, like: false) {
          ${fields}
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

  toggleResult = (data || {})[`updateLike${type}`];
  // console.log('toggleResult', toggleResult);
  toggleLikesStore[`toggleUnliking${type}`][id] = false;
  toggleLikesStore[`toggleUnlike${type}Result`][id] = toggleResult;
  toggleLikesStore[`errorUnliking${type}`][id] = null;

  // Update local storage
  const likeData = toggleLikesStore[`like${type}Data`];
  if (likeData.includes(id)) {
    likeData.splice(likeData.indexOf(id), 1);
    setLocalStorageItem(`like${type}`, likeData);
  }

  if (updateMethod[type])
    updateMethod[type](toggleResult);
  else
    console.error(`Invalid type: ${type}`);


  // clear the state after 500 milliseconds
  setTimeout(() => {
    delete toggleLikesStore[`toggleUnliking${type}`][id];
    delete toggleLikesStore[`toggleUnlike${type}Result`][id];
    delete toggleLikesStore[`errorUnliking${type}`][id];
  }, 500);

  toggleLikesStore[`toggleUnliking${type}`][id] = false;
  return toggleResult;
};

const isLiking = (type, id) => {
  return toggleLikesStore[`toggleLiking${type}`][id];
};

const isUnliking = (type, id) => {
  return toggleLikesStore[`toggleUnliking${type}`][id];
};

const getToggleLikeResult = (type, id) => {
  return toggleLikesStore[`toggleLike${type}Result`][id];
};

const getToggleUnlikeResult = (type, id) => {
  return toggleLikesStore[`toggleUnlike${type}Result`][id];
};

const resetToggleLikeResult = (type, id) => {
  delete toggleLikesStore[`toggleLike${type}Result`][id];
};

const resetToggleUnlikeResult = (type, id) => {
  delete toggleLikesStore[`toggleUnlike${type}Result`][id];
};

const isLiked = (type, id) => {
  return toggleLikesStore[`like${type}Data`].includes(id);
};

const init = () => {
  // console.log('init toggleLikesStore');
  toggleLikesStore.likeCatData = getLocalStorageItem('likeCat') || [];
  toggleLikesStore.likePhotoData = getLocalStorageItem('likePhoto') || [];
};


// Use toRefs for read-only access in components
const useToggleLikesStore = () => {
  return toRefs(toggleLikesStore);
};


export {
  useToggleLikesStore, toggleLike,
  toggleUnlike, isLiking, isUnliking,
  getToggleLikeResult, getToggleUnlikeResult,
  resetToggleLikeResult, resetToggleUnlikeResult,
  isLiked, init,
};
