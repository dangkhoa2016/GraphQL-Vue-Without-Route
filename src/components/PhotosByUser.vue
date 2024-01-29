<template>

  <div class='mt-4' :id='`photos-by-user-${userId}`'>
    <img v-if='!isAuthenticated' src='/src/assets/images/must-login-to-view-photos.png'
      class="d-flex mx-auto h-auto mw-sm-75 mw-md-50">
    <transition v-else :name="noPhotos ? '' : 'just-fade'" mode="out-in">
      <div v-if="loadingPhotos" class="text-center">
        <p>Loading...</p>

        <PhotosLoading />
      </div>
      <div v-else-if="loadPhotosError">
        <ErrorLoadPhotos :message="loadPhotosError"
          :show-reload-button='true' @reload="handlePageChange" />
      </div>
      <p v-else-if="noPhotos">No photos found.</p>
      <div v-else>
        <PhotosBlock :gallery-id='`user-${userId}`' :data="photos" :is-admin="isAdmin"
          :current-user-id='authInfo.user?.id'
          main-class='row-cols-1 row-cols-xl-4 row-cols-sm-2 row-cols-md-3 g-xl-3 g-lg-3 g-md-3 g-3' />
        <Pagination v-if='totalItems' v-model="pageIndex"
          :total-items="totalItems"
          :items-per-page="itemsPerPage" />
      </div>
    </transition>
  </div>

</template>

<script>
  export default {
    name: 'PhotosByUser',
  }
</script>

<script setup>

  import { ref, onMounted, watch, computed, onBeforeUnmount, inject, } from 'vue';

  import { usePhotoStore, fetchPhotosByUser, setLoadPhotosError } from '/src/stores/photosStore.mjs';

  import PhotosBlock from './PhotosBlock.vue';
  import Pagination from './Pagination.vue';
  import ErrorLoadPhotos from './ErrorLoadPhotos.vue';
  import PhotosLoading from './PhotosLoading.vue';


  const props = defineProps({
    userId: {
      type: [Number, String],
      required: false,
      default: null,
    },
    modelValue: {
      type: Number,
      required: false,
      default: 1,
    },
  });

  const emits = defineEmits(['update:modelValue']);

  const emitter = inject('emitter');
  const authStore = inject('authStore');
  const { useAuthStore, logout } = authStore;
  const { isAuthenticated, authInfo, isAdmin } = useAuthStore();

  const itemsPerPage = 8;
  const pageIndex = ref(1);
  const { photos, totalItems = 0, /*totalPages = 0, */ loadingPhotos, loadPhotosError } = usePhotoStore();
  const loaded = ref(false);
  const noPhotos = computed(() => (loaded.value && !(photos.value && photos.value.length > 0)));

  const timeoutRedirect = ref(null);

  const fetchOptions = computed(() => {
    return {
      mainField: 'photosByUserId',
      pageIndex: pageIndex.value,
      itemsPerPage,
    };
  });


  const scrollToTop = () => {
    const el = document.getElementById(`photos-by-user-${props.userId}`);
    if (!el) return;

    window.scrollTo(0, el.offsetTop - 150);
  };

  const clearTimeoutRedirect = () => {
    if (timeoutRedirect.value) {
      clearTimeout(timeoutRedirect.value);
      timeoutRedirect.value = null;
    }
  };

  const handlePageChange = () => {
    clearTimeoutRedirect();

    fetchPhotosByUser(props.userId,
      'id, title, description, url, likes_count, status, created_at, owner { id }',
      authInfo.value?.token, fetchOptions.value);

    loaded.value = true;
  };


  onMounted(() => {
    if (!isAuthenticated.value) {
      emitter.emit('toast', { title: 'Notice', message: 'Please login to see user photos.' });
      return;
    }

    if (!props.userId)
      return;

    pageIndex.value = props.modelValue ?? 1;
    if (!photos.value || photos.value.length === 0)
      handlePageChange();
  });

  onBeforeUnmount(() => {
    clearTimeoutRedirect();
  });

  watch(() => loadPhotosError.value, (newVal/*, oldVal*/) => {
    if (newVal && (newVal.includes('Session was expired') || newVal.includes('Session was not found'))) {
      emitter.emit('toast', { title: 'Session Expired', message: 'Please login again.<br>You will be redirected to login page in 10 seconds.' });
      timeoutRedirect.value = setTimeout(() => {
        setLoadPhotosError(null);
        logout();

        emitter.emit('route-transition', 'bounce');
        emitter.emit('show-page', 'Login');
      }, 10000);
    }
  });

  watch(pageIndex, (newVal) => {
    if (newVal === props.modelValue)
      return;

    emits('update:modelValue', newVal);

    scrollToTop();
    setTimeout(handlePageChange, 600);
  });

</script>
