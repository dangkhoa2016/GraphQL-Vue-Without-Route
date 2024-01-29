<template>

  <button @click="toggleStatus" :disabled="loading || isError"
    :title="`${statusText} this ${modelType?.toLowerCase()}`"
    class="btn btn-sm" :class="btnClass">
    {{ statusText }}
  </button>

</template>

<script>
  export default {
    name: 'ToggleStatus',
  }
</script>

<script setup>

  import { computed, inject, } from 'vue';


  const props = defineProps({
    modelType: {
      type: String,
      default: '',
    },
    modelId: {
      type: String,
      default: '',
    },
    status: Boolean,
    loading: Boolean,
    isError: Boolean,
  });

  const emitter = inject('emitter');
  const authStore = inject('authStore');
  const { useAuthStore, } = authStore;
  const { isAuthenticated } = useAuthStore();

  const btnClass = computed(() => {
    if (props.loading)
      return 'skeleton';
    else
      return props.status ? 'btn-danger' : 'btn-warning';
  });

  const statusText = computed(() => {
    if (props.loading || props.isError)
      return 'Loading...';
    else
      return props.status ? 'Disable' : 'Enable';
  });


  const toggleStatus = () => {
    // console.log('toggleStatus', props.modelId);
    const action = props.status ? 'disable' : 'enable';
    if (!isAuthenticated.value) {
      emitter.emit('toast', { title: 'Notice', message: `Please login to ${action} ${props.modelType}` });
      return;
    }

    emitter.emit('toggle-status', { type: props.modelType, action, id: props.modelId });
  };

</script>
