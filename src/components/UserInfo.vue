<template>

  <div class="row gutters-sm">
    <div class="col-md-4 mb-3">
      <div class="card">
        <div class="card-body">
          <div class="d-flex flex-column align-items-center text-center">
            <img :src="avatarUrl" width="150" class="rounded-circle skeleton-img"
              :alt="user?.name" @load="onImageLoaded($event.target)">

            <div class="my-3">
              <h5 class="profile-name" :title="user?.name"
                :class="{ 'skeleton' : loading }">
                {{ loading ? '' : user?.name }}
              </h5>
              <p class="text-secondary profile-job mb-1 w-100" :class="{ 'skeleton' : loading }">
                {{ loading ? '' : user?.job_title }}
              </p>
            </div>

            <ToggleFollowUser v-if='showToggleFollow' :user="user" :loading="loading"
              btn-follow-class='btn-outline-primary' :is-error="!loading && !user"
              btn-unfollow-class='btn-danger' />
            <ToggleStatus v-if='isAdmin' class='mt-2' :is-error="!loading && !user"
              :status="user?.status" :loading="loading"
              :model-id="user?.id" model-type="User" />
          </div>
        </div>
      </div>
      <div class="card mt-3">
        <ul class="list-group list-group-flush">
          <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
            <h6 class="mb-0">
              <svg class="social-icon me-1"><use xlink:href="#likes"></use></svg>
              Likes
            </h6>
            <span class="text-secondary" :class="{ 'stats-count skeleton m-0': loading }">
              {{ loading ? '' : (user?.likes_count || 0) }}
            </span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
            <div class="d-flex align-items-center">
              <svg class="social-icon me-1"><use xlink:href="#followers"></use></svg>
              Followers
            </div>
            <span class="text-secondary" :class="{ 'stats-count skeleton m-0': loading }">
              {{ loading ? '' : (user?.followers_count || 0) }}
            </span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
            <div class="d-flex align-items-center">
              <img src='/src/assets/images/cat-icon.png' width="32" class="me-1" />
              Cats
            </div>
            <span class="text-secondary" :class="{ 'stats-count skeleton m-0': loading }">
              {{ loading ? '' : (user?.cats_count || 0) }}
            </span>
          </li>
          <li class="list-group-item d-flex justify-content-between align-items-center flex-wrap">
            <div class="d-flex align-items-center">
              <svg class="social-icon me-1"><use xlink:href="#photos"></use></svg>
              Photos
            </div>
            <span class="text-secondary" :class="{ 'stats-count skeleton m-0': loading }">
              {{ loading ? '' : (user?.photos_count || 0) }}
            </span>
          </li>
        </ul>
      </div>
    </div>

    <UserRightPanel class="col-md-8" :user="user" :loading="loading" />
  </div>

</template>

<script>
  export default {
    name: 'UserInfo',
  }
</script>

<script setup>

  import { computed, } from 'vue';

  import { defaultImage } from '/src/libs/userHelpers.mjs';

  import ToggleFollowUser from './ToggleFollowUser.vue';
  import UserRightPanel from './UserRightPanel.vue';
  import ToggleStatus from './ToggleStatus.vue';


  const props = defineProps({
    user: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
    showToggleFollow: {
      type: Boolean,
      default: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  });

  const avatarUrl = computed(() => {
    return props.user?.image || defaultImage;
  });


  const onImageLoaded = (img) => {
    if (img.src === defaultImage)
      return;

    img.classList.remove('skeleton-img');
  };

</script>
