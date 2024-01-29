
import { reactive, toRefs } from 'vue';
import api, { endpoint } from '/src/libs/api.mjs';
// import { sleep } from '/src/libs/helpers.mjs';
import { setLocalStorageItem, getLocalStorageItem } from '/src/libs/localStorageHelpers.mjs';
import { setUser } from './usersStore.mjs';


// Create a reactive store
const catStore = reactive({
  cat: null,
  loadingCat: false,
  loadingCats: false,
  cats: null,
  totalItems: 0,
  totalPages: 0,
  loadCatsError: null,
  loadCatError: null,
});


// Mutations
const setCat = (cat, merge = false) => {
  catStore.cat = merge ? { ...catStore.cat, ...cat } : cat;
  if (!catStore.cats || !cat)
    return;

  const cats = catStore.cats;
  const indx = cats.findIndex(c => c.id.toString() === cat.id.toString());
  if (indx !== -1)
    cats[indx] = { ...cats[indx], ...cat };
  else
    cats.push(cat);
};

const setToggleLikeResult = (result) => {
  setCat(result, true);

  setUser(result.owner, true);
};

const setResults = (cats, totalItems, totalPages) => {
  catStore.cats = cats;
  catStore.totalItems = totalItems;
  catStore.totalPages = totalPages;
};


// Actions

const setLoadCatsError = (error) => {
  catStore.loadCatsError = error;
};

const setLoadCatError = (error) => {
  catStore.loadCatError = error;
};

const fetchCat = async (id, fields, token) => {
  setCat(null);
  catStore.loadingCat = true;
  catStore.loadCatError = null;
  // await sleep(5000);

  try {
    const response = await api.post(`${endpoint}/graphql`, {
      query: `
        query {
          cat(id: ${id}) {
            ${fields}
          }
        }
      `
    }, {
      headers: {
        'x-access-token': `${token}`
      }
    });

    const { data, errors } = response.data || {};
    if (errors && errors.length > 0)
      throw new Error(errors[0].message);

    const { cat } = data || {};
    // console.log('cat', cat);
    setCat(cat);
  } catch (ex) {
    console.log('Error fetch cat', ex);
    catStore.loadCatError = ex.message;
  }

  catStore.loadingCat = false;
  return catStore.cat;
};

const fetchCats = async (fields, token, { mainField, pageIndex, itemsPerPage }) => {
  // console.log('fetchCats', fields, mainField, pageIndex, itemsPerPage);
  setResults(null, 0, 0);
  setLoadCatsError(null);
  catStore.loadingCats = true;
  // await sleep(5000);

  try {
    const response = await api.post(`${endpoint}/graphql`, {
      query: `
        query {
          cats(pageIndex: ${pageIndex}, pageSize: ${itemsPerPage}) {
            items { ${fields} }
            total_items, total_pages
          }
        }
      `
    }, {
      headers: {
        'x-access-token': `${token}`
      }
    });

    const { data, errors } = response.data || {};
    if (errors && errors.length > 0)
      throw new Error(errors[0].message);

    const cats = (data || {})[mainField];
    const { items = [], total_items, total_pages } = cats || {};
    setResults(items, total_items, total_pages);
  } catch (ex) {
    console.log('Error fetch cats', ex);
    setLoadCatsError(ex.message);
  }

  catStore.loadingCats = false;
  return catStore.cats;
};

const fetchCatsByUser = async (userId, fields, token, { mainField, pageIndex, itemsPerPage }) => {
  // console.log('fetchCatsByUser', fields, mainField, pageIndex, itemsPerPage);
  setResults(null, 0, 0);
  catStore.loadingCats = true;
  setLoadCatsError(null);
  // await sleep(5000);

  try {
    const response = await api.post(`${endpoint}/graphql`, {
      query: `
        query {
          catsByUserId(userId: ${userId}, pageIndex: ${pageIndex}, pageSize: ${itemsPerPage}) {
            items { ${fields} }
            total_items, total_pages
          }
        }
      `
    }, {
      headers: {
        'x-access-token': `${token}`
      }
    });

    const { data, errors } = response.data || {};
    if (errors && errors.length > 0)
      throw new Error(errors[0].message);

    const cats = (data || {})[mainField];
    const { items = [], total_items, total_pages } = cats || {};
    // console.log('cats', items);
    setResults(items, total_items, total_pages);
  } catch (ex) {
    console.log('Error fetch cats', ex);
    setLoadCatsError(ex.message);
  }

  catStore.loadingCats = false;
  return catStore.cats;
};

const getCatById = (id) => {
  if (!id)
    return null;

  if (!catStore.cats) {
    if (catStore.cat && catStore.cat.id.toString() === id.toString())
      return catStore.cat;
  }

  return catStore.cats.find(c => c.id.toString() === id.toString());
};

const setPendingLoadCatId = (id) => {
  setLocalStorageItem('pendingLoadCatId', id);
};

const getPendingLoadCatId = () => {
  return getLocalStorageItem('pendingLoadCatId');
};


// Use toRefs for read-only access in components
const useCatStore = () => {
  return toRefs(catStore);
};


export {
  useCatStore,
  fetchCatsByUser, setResults, getCatById,
  fetchCats, fetchCat,
  setLoadCatError,
  setCat, setToggleLikeResult, setLoadCatsError,
  setPendingLoadCatId, getPendingLoadCatId,
};
