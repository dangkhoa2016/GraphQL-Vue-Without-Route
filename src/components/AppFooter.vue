<template>

  <footer id='footer' class="footer py-3 bg-body-tertiary w-100">
    <ul class="nav justify-content-center border-bottom pb-3 mb-3">
      <li v-for="(link, index) in navLinks" :key="index" class="nav-item">
        <a :href="link.href" @click.prevent="handleLinkClick(link.event)"
           class="text-body-secondary nav-link px-2"
           :class="{ 'disabled': link.disabled, 'active': (activeLink === link.event) }">
          {{ link.text }}
        </a>
      </li>
    </ul>

    <p class="text-center text-body-secondary">© {{ currentYear }} {{ appName }}, Inc</p>
  </footer>

</template>

<script>
  export default {
    name: 'AppFooter',
  }
</script>

<script setup>

  import { ref, onMounted, computed, onBeforeUnmount, inject } from 'vue';


  defineProps({
    appName: {
      type: String,
      required: false,
      default: ''
    }
  });

  const emitter = inject('emitter');
  const authStore = inject('authStore');
  const { useAuthStore } = authStore;
  const { isAuthenticated } = useAuthStore();

  const activeLink = ref('MainPage');

  const navLinks = computed(() => {
    const arr = [
      { text: 'Home', event: 'MainPage', href: '#' },
      { text: 'Features', event: 'Features', href: '#' },
      { text: 'Pricing', event: 'Pricing', href: '#' },
      { text: 'Cats', event: 'CatsList', href: '#' },
      { text: 'About', event: 'About', href: '#' },
    ];

    if (!isAuthenticated.value)
      arr.push({ text: 'Login', event: 'Login', href: '#' });

    return arr;
  });

  const footer = ref(null);
  const currentYear = ref(new Date().getFullYear());


  const setTransition = () => {
    emitter.emit('route-transition', 'just-fade');
  };

  const emitEvent = (page) => {
    setTransition();
    emitter.emit('show-page', page);
  };

  const handleLinkClick = (page) => {
    emitEvent(page);
    activeLink.value = page;
  };

  const staticPosition = () => {
    setTimeout(() => {
      footer.value.classList.remove('slide-from-bottom');
      footer.value.removeAttribute('style');
    }, 500);
  };

  const handleShowComponent = (component) => {
    if (component === 'CatDetail')
      component = 'CatsList';
    activeLink.value = component;
  };


  onMounted(() => {
    footer.value = document.getElementById('footer');
    footer.value.style.position = 'relative';
    footer.value.style.bottom = '-145px';

    emitter.on('show-page', handleShowComponent);

    setTimeout(() => {
      footer.value.classList.add('slide-from-bottom');

      staticPosition();
    }, 500);
  });

  onBeforeUnmount(() => {
    emitter.off('show-page');
  });

</script>
