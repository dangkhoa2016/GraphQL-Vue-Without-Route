
import { reactive, toRefs } from 'vue';
import api, { endpoint } from '/src/libs/api.mjs';
// import { sleep } from '/src/libs/helpers.mjs';
import { setUser } from './usersStore.mjs';


// Create a reactive store
const photoStore = reactive({
  loadingPhotos: false,
  photos: null,
  totalItems: 0,
  totalPages: 0,
  loadPhotosError: null,
  loadPhotoError: null,
});


// Mutations
const setResults = (photos, totalItems, totalPages) => {
  photoStore.photos = photos;
  photoStore.totalItems = totalItems;
  photoStore.totalPages = totalPages;
};

const setPhoto = (photo) => {
  if (!photoStore.photos)
    return;

  const photos = photoStore.photos;
  const indx = photos.findIndex(p => p.id.toString() === photo.id.toString());
  if (indx !== -1)
    photos[indx] = { ...photos[indx], ...photo };
  else if (photo)
    photos.push(photo);
};

const setToggleLikeResult = (result) => {
  setPhoto(result);

  setUser(result.owner, true);
};


// Actions
const fetchPhotosByCat = async (catId, fields, token, { mainField, pageIndex, itemsPerPage }) => {
  // console.log('fetchPhotosByCat', fields, mainField, pageIndex, itemsPerPage);
  photoStore.loadingPhotos = true;
  setResults(null, 0, 0);
  photoStore.loadPhotosError = null;
  // await sleep(5000);

  try {
    const response = await api.post(`${endpoint}/graphql`, {
      query: `
        query {
          photosByCatId(catId: ${catId}, pageIndex: ${pageIndex}, pageSize: ${itemsPerPage}) {
            items { ${fields} }
            total_items total_pages
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

    const photos = (data || {})[mainField];
    const { items = [], total_items, total_pages } = photos || {};
    // console.log('photos', items);

    setResults(items, total_items, total_pages);
  } catch (ex) {
    console.log('Error fetch photos', ex);
    photoStore.loadPhotosError = ex.message;
  }

  photoStore.loadingPhotos = false;
  return photoStore.photos;
};

const fetchPhotosByUser = async (userId, fields, token, { mainField, pageIndex, itemsPerPage }) => {
  // console.log('fetchPhotosByUser', fields, mainField, pageIndex, itemsPerPage);
  photoStore.loadingPhotos = true;
  setResults(null, 0, 0);
  photoStore.loadPhotosError = null;
  // await sleep(1000);

  try {
    const response = await api.post(`${endpoint}/graphql`, {
      query: `
        query {
          photosByUserId(userId: "${userId}", pageIndex: ${pageIndex}, pageSize: ${itemsPerPage}) {
            items { ${fields} }
            total_items total_pages
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

    const photos = (data || {})[mainField];
    const { items = [], total_items, total_pages } = photos || {};
    // console.log('photos', items);
    setResults(items, total_items, total_pages);
  } catch (ex) {
    console.log('Error fetch photos', ex);
    photoStore.loadPhotosError = ex.message;
  }

  photoStore.loadingPhotos = false;
  return photoStore.photos;
};

const setLoadPhotosError = (error) => {
  photoStore.loadPhotosError = error;
};


// Use toRefs for read-only access in components
const usePhotoStore = () => {
  return toRefs(photoStore);
};


export {
  usePhotoStore, fetchPhotosByCat, setPhoto, setLoadPhotosError,
  setResults, setToggleLikeResult, fetchPhotosByUser
};
