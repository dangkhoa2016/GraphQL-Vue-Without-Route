<template>

  <div class="d-flex photo-stats flex-sm-column flex-lg-row justify-content-between my-2 gap-2">
    <span class="d-flex align-items-center">
      <svg class="d-inline-block cat-stats me-1">
        <use xlink:href="#likes"></use>
      </svg>
      <span class="badge bg-primary rounded-pill">{{ image.likes_count || 0 }}</span>

      <toggle-like-photo v-if='showLike' :image="image" />
    </span>
    <span class="d-flex align-items-center" title='Uploaded on'>
      <svg class="d-inline-block cat-stats me-1">
        <use xlink:href="#calendar3"></use>
      </svg>
      <span class="small">{{ formatDateTime(image.created_at) }}</span>
    </span>
  </div>

</template>

<script>
  export default {
    name: 'PhotoStats',
  }
</script>

<script setup>

  import { formatDateTime } from '/src/libs/dateTimeHelpers.mjs';

  import ToggleLikePhoto from './ToggleLikePhoto.vue';


  defineProps({
    image: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    showLike: {
      type: Boolean,
      default: true,
    },
  });

</script>
