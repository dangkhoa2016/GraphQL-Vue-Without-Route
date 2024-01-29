<template>

  <div class="alert text-center alert-dark" role="alert">
    <h4>
      <svg class="bi feature-icon flex-shrink-0 me-2"
        role="img" aria-label="Error:">
        <use xlink:href="#error-load"/>
      </svg>
      Error while loading {{ loadDetails ? 'details' : 'users' }}
    </h4>
    <div class="mw-75 mb-3 mw-md-50 mx-auto">
      <img :src="imageFile" class="mw-50">
    </div>
    <p>
      <slot>
        {{ message }}
      </slot>
    </p>
    <div v-if="showReloadButton">
      <button class="btn btn-warning btn-sm" @click="emits('reload')"
        title="Click to reload again">
        <svg class="bi cat-stats" role="img" aria-label="Reload">
          <use xlink:href="#reload"/>
        </svg>
        Reload
      </button>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'ErrorLoadUsers',
  }
</script>

<script setup>

  import { ref, onMounted } from 'vue';

  const errorUser1 = '/src/assets/images/error-users1.png';
  const errorUser2 = '/src/assets/images/error-users2.png';


  defineProps({
    message: {
      type: String,
      required: true,
      default: 'Something went wrong!',
    },
    showReloadButton: {
      type: Boolean,
      default: false,
    },
    loadDetails: { // or load list
      type: Boolean,
      default: false,
    },
  });

  const emits = defineEmits(['reload']);

  const imageFiles = [errorUser1, errorUser2];
  const imageFile = ref(null);


  onMounted(() => {
    imageFile.value = imageFiles[Math.floor(Math.random() * imageFiles.length)];
  });

</script>
