<template>

  <div class="mt-4">
    <div class="d-flex flex-md-row flex-column align-items-center justify-content-center">
      <a href='#' class='d-inline-block position-relative'
        @click.prevent="emits('open-detail', user?.id)" :title="`View ${user?.name}'s profile`">
        <div v-if="isProUser(user)" class="check position-absolute">
          <svg class=""><use xlink:href="#check2"></use></svg>
        </div>
        <img :src="avatarUrl" width="150" class="d-flex thumbnail mx-auto mb-2 rounded-circle"
          :class='{ "skeleton-img" : loading }'
          :alt="user?.name" @load="onImageLoaded($event.target)">
      </a>
      <div class="ms-md-3 mt-3 text-center mt-md-0 ms-0 mw-75 mw-md-50 text-md-start">
        <h5 class="mt-2 mb-0 profile-name text-info" :title="user?.name"
          :class="{ 'skeleton' : loading }">{{ loading ? '' : user?.name }}</h5>
        <span class="d-block mt-2 profile-job" :class="{ 'skeleton' : loading }">{{ loading ? '' : user?.job_title }}</span>
        <div class="d-flex mt-4 flex-column gap-2 justify-content-between align-items-center">
          <div v-if="loading" class="skeleton profile-job"></div>
          <div v-else-if='!loadUserError'>
            Joined: <span class="rounded bg-info px-2 d-inline-block">{{ loading ? '' : formatDateTime(user?.created_at) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-2">
      <p v-if='loadUserError' class='text-danger text-center'>
        Failed to load user. Please try again later.
      </p>
      <p v-else class="profile-bio" :class="{ 'skeleton' : loading }">
        {{ loading ? '' : user?.bio }}
      </p>

      <ul class="gap-2 list-unstyled justify-content-center d-flex">
        <li v-for="social in socials" :key="social">
          <i v-if="loading" class="social-icon skeleton d-block"></i>
          <a v-else :href="getSocialLink(social)" :target="getSocialTarget(social)" class="social-icon d-block">
            <svg class="w-100 h-100"><use :xlink:href="`#${social}`"></use></svg>
          </a>
        </li>
      </ul>

      <div class="text-center">
        <ToggleFollowUser :user="user" :loading="loading || !!loadUserError"
          btn-follow-class='btn-outline-primary'
          btn-unfollow-class='btn-danger' />
        <button class="btn btn-success px-4 ms-3 btn-sm"
          @click="emits('open-detail', user.id)" :title="`View ${user?.name}'s profile`"
          :class="{ 'skeleton' : loading }" :disabled="loading || !!loadUserError">
          {{ (loading || !!loadUserError) ? 'Loading...' : 'View' }}
        </button>
      </div>

      <UserSummaryStats :user="user" :loading="loading" />
    </div>
  </div>

</template>

<script>
  export default {
    name: 'UserSummary',
  }
</script>

<script setup>

  import { computed, } from 'vue';

  import { formatDateTime } from '/src/libs/dateTimeHelpers.mjs';
  import { isProUser, defaultImage, } from '/src/libs/userHelpers.mjs';

  import UserSummaryStats from './UserSummaryStats.vue';
  import ToggleFollowUser from './ToggleFollowUser.vue';


  const props = defineProps({
    user: {
      type: Object,
      default: () => ({}),
    },
    loading: {
      type: Boolean,
      default: false,
    },
    loadUserError: {
      type: String,
      default: '',
    },
  });

  const emits = defineEmits(['open-detail']);

  const socials = ['facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'github'];

  const avatarUrl = computed(() => {
    return props.user?.image || defaultImage;
  });


  const getSocialLink = (social) => {
    if (props.user?.[`${social}_url`]) {
      return props.user?.[`${social}_url`];
    }

    return '#';
  };

  const getSocialTarget = (social) => {
    if (props.user?.[`${social}_url`]) {
      return '_blank';
    }

    return '_self';
  };

  const onImageLoaded = (img) => {
    if (img.src === defaultImage)
      return;

    img.classList.remove('skeleton-img');
  };

</script>
