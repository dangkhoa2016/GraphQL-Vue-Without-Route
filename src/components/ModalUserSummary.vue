<template>

  <Modal ref="modalRef" class='user-summary'
    :hide-ok="true" :hide-cancel="true"
    data-bs-backdrop="static" data-bs-keyboard="false"
    modal-dialog-size="lg" :hide-header-boolean="true">

    <UserSummary :loading="loadingUser" :user="user"
      @open-detail="openDetail" :load-user-error="loadUserError" />

    <template #footer>
      <button type="button" class="btn btn-secondary" @click="modalRef.modal.hide()">Close</button>
    </template>
  </Modal>

</template>

<script>
export default {
  name: 'ModalUserSummary',
}
</script>

<script setup>

  import { ref, onMounted, onBeforeUnmount, inject, } from 'vue';

  import { useUserStore, fetchUser, setPendingLoadUserId } from '/src/stores/usersStore.mjs';

  import Modal from './Modal.vue';
  import UserSummary from './UserSummary.vue';


  const emitter = inject('emitter');
  const authStore = inject('authStore');
  const { useAuthStore } = authStore;
  const { authInfo } = useAuthStore();

  const modalRef = ref(null);
  const { user, loadingUser, loadUserError } = useUserStore();


  const openDetail = (id) => {
    modalRef.value.modal.hide();

    setPendingLoadUserId(id);

    setTimeout(() => {
      emitter.emit('route-transition', 'just-fade');

      emitter.emit('show-page', 'ViewUser');
    }, 500);
  };


  onMounted(() => {
    emitter.on('show-user-preview', (userId) => {
      modalRef.value.modal.show();
      fetchUser(userId, `
        id, name, email, image, bio, followed, followers_count,
        cats_count, status, created_at, likes_count, facebook_url,
        twitter_url, instagram_url, linkedin_url, youtube_url, github_url,
        job_title
      `, authInfo.value?.token);
    });
  });

  onBeforeUnmount(() => {
    emitter.off('show-user-preview');
  });

</script>
