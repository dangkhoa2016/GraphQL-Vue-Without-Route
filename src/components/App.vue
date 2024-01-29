<template>

  <main class="d-flex flex-column h-100">
    <AppHeader :app-name="appName" />

    <div class='my-auto py-4'>
      <DynamicComponent :component-name="componentName" :transition-name="transitionName" />
    </div>

    <AppFooter :app-name="appName" />

    <ModalUserSummary />
    <ModalToggleStatus v-if='isAdmin' />
    <Toast ref='toaster' :autoHideDelay="5000" />

    <transition name="slide-up">
      <button v-show="showScrollToTop" @click="scrollToTop"
        class="btn btn-sm btn-outline-warning scroll-to-top">
        <svg class='cat-stats'><use xlink:href="#scroll-top"></use></svg>
        To top
      </button>
    </transition>
  </main>

</template>

<script>
export default {
  name: 'App',
}
</script>

<script setup>

  import { onMounted, onBeforeUnmount, nextTick,
    defineAsyncComponent, ref, watch, inject } from 'vue';

  import { scrollToTop, getComponentPath, } from '/src/libs/helpers.mjs';
  import { init as initLikesStore } from '/src/stores/toggleLikesStore.mjs';
  import { getLocalStorageItem, setLocalStorageItem } from '/src/libs/localStorageHelpers.mjs';

  import DynamicComponent from './DynamicComponent.vue';
  import AppHeader from './AppHeader.vue'
  import AppFooter from './AppFooter.vue';
  import Toast from './Toast.vue';
  import ModalUserSummary from './ModalUserSummary.vue';


  const ModalToggleStatus = defineAsyncComponent(() =>
    import('./ModalToggleStatus.vue')
  );

  const isComponentLoaded = inject('isComponentLoaded');
  const requireAuthenticationComponents = ['CatsList'];

  const emitter = inject('emitter');
  const authStore = inject('authStore');
  const { useAuthStore } = authStore;
  const { authInfo, isAuthenticated, isAdmin, } = useAuthStore();

  const appName = 'Vue 3';
  const toaster = ref(null);

  const componentName = ref('');
  const transitionName = ref('just-fade');

  const showScrollToTop = ref(false);


  const checkScroll = () => {
    showScrollToTop.value = window.scrollY > 400;
  };

  const handleShowComponent = (component) => {
    if (component === componentName.value) {
      scrollToTop();
      return;
    }

    if (component === 'Login' && isAuthenticated.value) {
      emitter.emit('toast', { title: 'Notice', message: 'You are already logged in.' });
      return;
    }

    if (requireAuthenticationComponents.includes(component)) {
      if (!isAuthenticated.value) {
        emitter.emit('toast', { title: 'Notice', message: 'Please login to see this page.' });
        component = 'Login';
      }
    }

    if (component === 'Login' && componentName.value === component &&
        isComponentLoaded(getComponentPath(component, true))) {
      return;
    }

    componentName.value = '';

    nextTick(() => {
      let needLogin = false;
      if (!isAuthenticated.value && component === 'Login')
        needLogin = true;
      if (component !== 'Login') {
        setLocalStorageItem('returnPage', component);
        needLogin = false;
      }

      setLocalStorageItem('needLogin', needLogin);

      componentName.value = component;
    });
  };

  const showLogin = () => {
    emitter.emit('route-transition', 'just-fade');
    emitter.emit('show-page', 'Login');
  };

  const showHome = () => {
    const lastVisitPage = getLocalStorageItem('returnPage') ?? 'MainPage';
    emitter.emit('route-transition', 'just-fade');
    emitter.emit('show-page', lastVisitPage);
  };

  const checkLoginAndShow = () => {
    const needLogin = getLocalStorageItem('needLogin');
    if (needLogin)
      showLogin();
    else
      showHome();
  };


  onMounted(() => {
    initLikesStore();
    window.addEventListener('scroll', checkScroll);

    emitter.on('toast', ({ title, message, color }) => {
      if (toaster.value)
        toaster.value.pushToast(title, message, color);
    });

    emitter.on('route-transition', (transition) => {
      transitionName.value = transition;
    });

    emitter.on('show-page', handleShowComponent);

    const loading = document.getElementById('loading');
    loading.addEventListener('transitionend', () => {
      loading.style.display = 'none';

      checkLoginAndShow();
    });
    loading.classList.add('fade-out');
  });

  onBeforeUnmount(() => {
    emitter.off('toast');
    emitter.off('route-transition');
    emitter.off('show-page', handleShowComponent);
    window.removeEventListener('scroll', checkScroll);
  });

  watch(() => authInfo.value, (newVal) => {
    if (newVal) {
      if (componentName.value === 'Login') {
        setLocalStorageItem('needLogin', false);
        showHome();
      }

      return;
    }

    if (requireAuthenticationComponents.includes(componentName.value))
      showLogin();
  });

</script>
