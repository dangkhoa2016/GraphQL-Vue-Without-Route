<template>

  <div class="alert alert-info m-5" role="alert">
    <div class="d-flex align-items-center" :data-path='componentPath'>
      <span>Loading...</span>

      <div class="spinner-border ms-auto" role="status" aria-hidden="true"></div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'LoadingComponent',
  }
</script>

<script setup>

  defineProps({
    componentPath: {
      type: String,
      required: false,
      default: ''
    }
  });

</script>
