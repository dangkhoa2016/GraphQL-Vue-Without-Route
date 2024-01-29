<template>

  <div class='w-50 mx-auto text-center'>
    <p>Loading...</p>
    <object type='image/svg+xml' :data='catLoading'>
      <img :src='catLoading' />
    </object>
    <!-- <img class='mw-100' src='/src/assets/images/cats-loading.gif' /> -->
  </div>

</template>

<script>
  export default {
    name: 'CatLoader',
  };
</script>

<script setup>
  const catLoading = '/src/assets/images/cats-loading.svg';
</script>
