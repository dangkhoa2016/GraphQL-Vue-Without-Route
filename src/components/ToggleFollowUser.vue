<template>

  <button v-if="isFollowed"
    class="btn btn-sm" title="Unfollow this user"
    @click="handleClick(false)" :class="btnClassUnfollow"
    :disabled="loading || isError || isTogglingUnfollow">
    {{ btnTextUnfollow }}
  </button>
  <button v-else
    class="btn btn-sm" title="Follow this user"
    @click="handleClick(true)" :class="btnClassFollow"
    :disabled="loading || isError || isTogglingFollow">
    {{ btnTextFollow }}
  </button>

</template>

<script>
  export default {
    name: 'ToggleFollowUser',
  }
</script>

<script setup>

  import { computed, ref, onBeforeUnmount, inject, } from 'vue';

  import { isFollowing, isUnfollowing, 
    // getUnfollowResult, getFollowResult,
    getUnfollowError, getFollowError,
    resetFollowResult, resetUnfollowResult,
    follow, unfollow, } from '/src/stores/toggleFollowsStore.mjs';


  const props = defineProps({
    user: {
      type: Object,
      default: () => ({}),
    },
    loading: Boolean,
    btnFollowClass: {
      type: String,
      default: '',
    },
    btnUnfollowClass: {
      type: String,
      default: '',
    },
    isError: Boolean,
  });

  const emitter = inject('emitter');
  const authStore = inject('authStore');
  const { useAuthStore, logout } = authStore;
  const { authInfo } = useAuthStore();

  const timeoutRedirect = ref(null);

  // const toggleFollowResult = computed(() => getFollowResult(props.user?.id));
  const isTogglingFollow = computed(() => isFollowing(props.user?.id));
  // const toggleUnfollowResult = computed(() => getUnfollowResult(props.user?.id));
  const isTogglingUnfollow = computed(() => isUnfollowing(props.user?.id));
  const unfollowError = computed(() => getUnfollowError(props.user?.id));
  const followError = computed(() => getFollowError(props.user?.id));

  const btnClass = (cls) => computed(() => {
    if (props.loading)
      return 'skeleton';
    else
      return props.user?.id ? cls : 'btn-secondary';
  });

  const btnText = (isFollow) => computed(() => {
    if (props.loading || props.isError)
      return 'Loading...';

    if (isFollow)
      return isTogglingFollow.value ? 'Following...' : 'Follow';
    else
      return isTogglingUnfollow.value ? 'Unfollowing...' : 'Unfollow';
  });

  const isFollowed = computed(() => {
    return props.user?.followed;
  });

  const btnClassFollow = btnClass(props.btnFollowClass);
  const btnClassUnfollow = btnClass(props.btnUnfollowClass);
  const btnTextFollow = btnText(true);
  const btnTextUnfollow = btnText(false);


  const clearTimeoutRedirect = () => {
    if (timeoutRedirect.value) {
      clearTimeout(timeoutRedirect.value);
      timeoutRedirect.value = null;
    }
  };

  const handleActionError = (err) => {
    if (!err)
      return;

    if (err.includes('Session was expired')) {
      emitter.emit('toast', { title: 'Session Expired', message: 'Please login again.<br>You will be redirected to login page in 10 seconds.' });
      timeoutRedirect.value = setTimeout(() => {
        resetFollowResult(props.user?.id);
        resetUnfollowResult(props.user?.id);
        logout();

        emitter.emit('route-transition', 'bounce');
        emitter.emit('show-page', 'Login');
      }, 10000);
      return;
    }

    emitter.emit('toast', { title: 'Error', message: err, color: 'text-bg-danger' });
  };

  const handleClick = async (isFollow) => {
    clearTimeoutRedirect();

    const token = authInfo.value?.token;
    if (!token) {
      emitter.emit('toast', { title: 'Notice', message: `Please login to ${isFollow ? 'follow' : 'unfollow'} user` });
      return;
    }

    try {
      if (isFollow)
        await follow(props.user?.id, token);
      else
        await unfollow(props.user?.id, token);
    } catch (err) {
      if (err.name === 'MaxFollowRequestReached' || err.name === 'MaxUnfollowRequestReached') {
        emitter.emit('toast', { title: 'Notice', message: err.message, color: 'text-bg-warning' });
        return;
      }

      // console.log('handleClick err', isFollow, err);
    }

    if (unfollowError.value)
      handleActionError(unfollowError.value);
    else if (followError.value)
      handleActionError(followError.value);
  };


  onBeforeUnmount(() => {
    clearTimeoutRedirect();
  });

</script>
