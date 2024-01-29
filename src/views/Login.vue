<template>

  <div class="row main-content d-flex rounded-5 border-success border mx-auto">
    <div class="col-md-4 rounded-5 rounded-end-0 text-center company__info d-none d-md-flex">
      <span class="company__logo">
        <Logo class='w-90-percent' />
      </span>
      <h4 class="company_title">{{ appName }}</h4>
    </div>
    <div class="col-md-8 col-xs-12 col-sm-12 text-center login_form">
      <form v-if='!isAuthenticated' class="m-3" @submit.prevent="handleSubmit">
        <Logo class='w-small d-inline-block d-md-none' />
        <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
        <div class="form-floating">
          <input type="email" class="form-control" v-model="username"
            :disabled="isProcessing" id="floatingInput" placeholder="name@example.com" />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating mt-3">
          <input type="password" class="form-control" v-model="password"
            :disabled="isProcessing" id="floatingPassword" placeholder="Password" />
          <label for="floatingPassword">Password</label>
        </div>
        <div v-if='errorLogin' class="form-floating mt-3">
          <div class="alert alert-danger" role="alert">
            {{ errorLogin }}
          </div>
        </div>
        <div class="form-check text-start my-3">
          <input class="form-check-input" type="checkbox" id="flexCheckDefault" value="remember-me" />
          <label class="form-check-label" for="flexCheckDefault"> Remember me </label>
        </div>
        <button class="btn btn-primary w-100" :disabled="isProcessing" type="submit">Sign in</button>
      </form>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Login',
  }
</script>

<script setup>

  import { ref, onMounted, watch, inject, } from 'vue';

  import { getLocalStorageItem, } from '/src/libs/localStorageHelpers.mjs';

  import Logo from '/src/components/Logo.vue';


  defineProps({
    appName: {
      type: String,
      required: false,
      default: ''
    }
  });

  const emitter = inject('emitter');
  const authStore = inject('authStore');
  const { login, useAuthStore } = authStore;
  const { isAuthenticated, isProcessing, errorLogin } = useAuthStore();

  const username = ref('');
  const password = ref('');


  const handleSubmit = () => {
    login(username.value, password.value);
  };


  const handleSignedIn = () => {
    const redirect = getLocalStorageItem('returnPage') ?? 'MainPage';
    emitter.emit('show-page', redirect);
  };


  onMounted(() => {
    if (isAuthenticated.value) {
      emitter.emit('toast', { title: 'Notice', message: 'You are already logged in.' });
      setTimeout(handleSignedIn, 2000);
      return;
    }

    document.getElementById('floatingInput').focus();
  });

  watch(isAuthenticated, (newVal) => {
    if (newVal)
      handleSignedIn();
  });
</script>
