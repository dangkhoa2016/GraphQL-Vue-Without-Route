<template>

  <div class="container">
    <div class="row">
      <div class="col-lg-4">
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4 col-lg-12 text-lg-center text-center text-md-start">
              <img :src="avatarUrl"
                @load="onImageLoaded($event.target)"
                class="skeleton-img img-fluid card-img-md-bottom-left card-img-md-top-left card-img-lg-bottom-left-0 card-img-lg-top-left card-img-lg-top-right card-img-top-left card-img-top-right card-img-md-top-right-0"
                :alt="loadingCat ? 'Loading...' : cat?.name" />
            </div>
            <div class="col-md-8 col-lg-12">
              <div class="p-3 border-bottom">
                <h5 class="mb-0" :class="{ 'skeleton profile-name m-0' : loadingCat }">
                  {{ loadingCat ? '' : cat?.name }}
                </h5>
              </div>

              <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex align-items-center">
                  <span class="badge bg-warning">Age:</span>
                  <span class="ms-2 d-inline-block" :class="{ 'profile-short skeleton' : loadingCat }">
                    {{ loadingCat ? '' : calculateAge(cat) }}
                  </span>
                </li>
                <li class="list-group-item d-flex align-items-center">
                  <span class="badge bg-info">Breed:</span>
                  <span class="ms-2 d-inline-block" :class="{ 'profile-short skeleton' : loadingCat }">
                    {{ loadingCat ? '' : cat?.breed }}
                  </span>
                </li>
              </ul>

              <div class="card-footer d-flex justify-content-between align-items-center">
                <div>
                  <ToggleLikeCat v-if='!isOwner' :cat="cat" :loading="loadingCat" :is-error='!!loadCatError' />
                  <ToggleStatus v-if="isAdmin" class='ms-1' :status="cat?.status" :loading="loadingCat"
                    :model-id="cat?.id" model-type="Cat" :is-error='!!loadCatError' />
                </div>
                <span class="d-flex align-items-center">
                  <svg class="d-inline-block cat-stats me-1"><use xlink:href="#likes"></use></svg>
                  <span :class="loadingCat ? 'd-inline-block skeleton stats-count' : 'badge bg-primary rounded-pill'">
                    {{ loadingCat ? '' : cat?.likes_count }}
                  </span>
                </span>
              </div>

              <div class="card-footer py-3 d-flex align-items-center">
                Owner: <small class="ms-2" :class="{ 'd-inline-block skeleton profile-name' : loadingCat }">
                  <a href="#" @click.prevent="openOwnerDetail"
                    class="text-body-secondary">{{ cat?.owner?.name }}</a>
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-8">
        <ErrorLoadCats v-if="loadCatError" :message="loadCatError"
          :show-reload-button="true" @reload="loadCat" :load-details='true' />

        <simple-accordion @toggle='handleTransition' :content="catTabs" :disabled="loadingCat || !!loadCatError">
          <template #about>
            <p class="p-3" :class="loadingCat ? 'skeleton profile-bio' : 'bg-body-secondary'">
              {{ loadingCat ? '' : (cat?.description || 'No description') }}
            </p>
            <transition name="fade-slide-up" appear :duration="600">
              <CatInfoLong v-if='showCatInfoLong' :cat="cat" :loading="loadingCat" />
            </transition>
          </template>
          <template #photos>
            <PhotosByCat :cat-id="cat?.id"
              v-model='photosPageIndex' />
          </template>
        </simple-accordion>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'CatDetail',
  }
</script>

<script setup>

  import { watch, ref, onMounted, computed, onBeforeUnmount, inject } from 'vue';

  import { setResults as setPhotosResults } from '/src/stores/photosStore.mjs';
  import { calculateAge, defaultImage } from '/src/libs/catHelpers.mjs';
  import { useCatStore, fetchCat, getPendingLoadCatId, setLoadCatError } from '/src/stores/catsStore.mjs';
  import { setPendingLoadUserId } from '/src/stores/usersStore.mjs';

  import PhotosByCat from '/src/components/PhotosByCat.vue';
  import SimpleAccordion from '/src/components/SimpleAccordion.vue';
  import CatInfoLong from '/src/components/CatInfoLong.vue';
  import ErrorLoadCats from '/src/components/ErrorLoadCats.vue';
  import ToggleLikeCat from '/src/components/ToggleLikeCat.vue';
  import ToggleStatus from '/src/components/ToggleStatus.vue';


  const emitter = inject('emitter');
  const authStore = inject('authStore');
  const { useAuthStore, logout, } = authStore;
  const { isAuthenticated, authInfo, isAdmin } = useAuthStore();

  const catTabs = ref([
    {
      id: 'about',
      active: true,
      title: 'About',
    },
    {
      id: 'photos',
      active: false,
      title: 'Photos',
    },
  ]);

  const photosPageIndex = ref(1);
  const { cat, loadingCat, loadCatError } = useCatStore();
  const timeoutRedirect = ref(null);

	const isOwner = computed(() => {
		return (cat.value?.user_id?.toString() === authInfo.value?.user?.id?.toString());
	});

  const avatarUrl = computed(() => {
    return cat.value?.image || defaultImage;
  });

  const showCatInfoLong = ref(false);


  const clearTimeoutRedirect = () => {
    if (timeoutRedirect.value) {
      clearTimeout(timeoutRedirect.value);
      timeoutRedirect.value = null;
    }
  };

  const loadCat = () => {
    clearTimeoutRedirect();

    const pendingLoadCatId = getPendingLoadCatId();
    if (!pendingLoadCatId)
      return;

    fetchCat(pendingLoadCatId, `
      id, name, image, description, coat_color, eye_color, breed, origin, weight, height, user_id,
      status, gender, updated_at, created_at, birthday, owner { name }, likes_count, photos_count
      `, authInfo.value.token);
  };

  const openOwnerDetail = () => {
    setPendingLoadUserId(cat.value?.user_id);

    emitter.emit('route-transition', 'just-fade');

    emitter.emit('show-page', 'ViewUser');
  };

  const onImageLoaded = (img) => {
    if (img.src === defaultImage)
      return;

    img.classList.remove('skeleton-img');
  };

  const handleTransition = ({ id, status }) => {
    if (id !== 'about')
      return;

    showCatInfoLong.value = status;
  };


  onMounted(() => {
    if (!isAuthenticated.value) {
      emitter.emit('toast', { title: 'Notice', message: 'Please login to see cat details.' });
      return;
    }

    setPhotosResults([], 0, 0);
    loadCat();

    setTimeout(() => {
      showCatInfoLong.value = true;
    }, 600);
  });

  onBeforeUnmount(() => {
    clearTimeoutRedirect();
  });

  watch(() => loadCatError.value, (newVal/*, oldVal*/) => {
    if (newVal && (newVal.includes('Session was expired') || newVal.includes('Session was not found'))) {
      emitter.emit('toast', { title: 'Session Expired', message: 'Please login again.<br>You will be redirected to login page in 10 seconds.' });
      timeoutRedirect.value = setTimeout(() => {
        setLoadCatError(null);
        logout();

        emitter.emit('route-transition', 'bounce');
        emitter.emit('show-page', 'Login');
      }, 10000);
    }
  });

</script>
