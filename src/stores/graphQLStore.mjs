
import { reactive, toRefs } from 'vue';
import api, { endpoint } from '/src/libs/api.mjs';


// Create a reactive store
const graphQLStore = reactive({
  fields: {},
});

// Mutations
const setFields = (key, fields) => {
  graphQLStore.fields[key] = fields;
};

// Actions
const fetchUserFields = async () => {
  try {
    const response = await api.post(`${endpoint}/graphql`, {
      query: `
        query { userFields }
      `,
    });

    const { data, errors } = response.data || {};
    if (errors && errors.length > 0)
      throw new Error(errors[0].message);

    setFields('users', data.userFields);

    return data.userFields;
  } catch (error) {
    console.error('Error fetching fields:', error);
    return null;
  }
};

const getField = (field) => {
  return graphQLStore.fields?.[field];
};

const getFields = () => {
  return graphQLStore.fields;
};

const hasField = (field) => {
  return Boolean(getField(field));
};


// Use toRefs for read-only access in components
const useGraphQLStore = () => {
  return toRefs(graphQLStore);
};


export { useGraphQLStore, fetchUserFields, getFields, getField, hasField };
