<template>

  <div class="alert alert-danger m-5" role="alert">
    Error load component [<strong>{{ componentPath }}</strong>]
  </div>

</template>

<script>
  export default {
    name: 'ErrorLoadComponent',
  }
</script>

<script setup>

  defineProps({
    componentPath: {
      type: String,
      required: true,
      default: ''
    }
  });

</script>
