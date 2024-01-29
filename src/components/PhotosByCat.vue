<template>

  <div class="p-3 text-center" :id='`photos-by-cat-${catId}`'>
    <transition name='just-fade' mode="out-in">
      <div v-if="loadingPhotos">
        <p>Loading...</p>

        <PhotosLoading />
      </div>
      <div v-else-if="loadPhotosError">
        <ErrorLoadPhotos :message="loadPhotosError"
          :show-reload-button='true' @reload="handlePageChange" />
      </div>
      <div v-else class="">
        <PhotosBlock :gallery-id='`cat-${catId}`' :data="photos" :is-admin="isAdmin"
          :current-user-id='authInfo.user?.id'
          main-class='row-cols-1 row-cols-xl-3 row-cols-sm-2 row-cols-md-3 row-cols-lg-2 g-xl-3 g-lg-2 g-md-3 g-3' />
        <Pagination v-if='totalItems' v-model="pageIndex"
          :total-items="totalItems"
          :items-per-page="itemsPerPage" />
      </div>
    </transition>
  </div>

</template>

<script>
  export default {
    name: 'PhotosByCat',
  };
</script>

<script setup>

  import { ref, onMounted, watch, computed, onBeforeUnmount, inject } from 'vue';

  import { usePhotoStore, fetchPhotosByCat, setLoadPhotosError } from '/src/stores/photosStore.mjs';

  import PhotosBlock from './PhotosBlock.vue';
  import Pagination from './Pagination.vue';
  import PhotosLoading from './PhotosLoading.vue';
  import ErrorLoadPhotos from './ErrorLoadPhotos.vue';


  const props = defineProps({
    catId: {
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

  const itemsPerPage = 9;
  const pageIndex = ref(1);
  const { photos, totalItems = 0, /*totalPages = 0, */ loadingPhotos, loadPhotosError } = usePhotoStore();

  const timeoutRedirect = ref(null);

  const fetchOptions = computed(() => {
    return {
      mainField: 'photosByCatId',
      pageIndex: pageIndex.value,
      itemsPerPage,
    };
  });


  const scrollToTop = () => {
    const el = document.getElementById(`photos-by-cat-${props.catId}`);
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

    fetchPhotosByCat(props.catId,
      'id title description likes_count url cat_id status updated_at created_at owner { id, name }',
      authInfo.value.token, fetchOptions.value);
  };


  onMounted(() => {
    if (!isAuthenticated.value) {
      emitter.emit('toast', { title: 'Notice', message: 'Please login to see cat photos.' });
      return;
    }

    if (!props.catId)
      return;

    pageIndex.value = props.modelValue ?? 1;
    if (!photos.value || photos.value.length === 0)
      handlePageChange();
  });

  onBeforeUnmount(() => {
    clearTimeoutRedirect();
  });

  watch(pageIndex, (newVal) => {
    if (newVal === props.modelValue)
      return;

    emits('update:modelValue', newVal);

    scrollToTop();
    setTimeout(handlePageChange, 600);
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

</script>
