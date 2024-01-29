<template>

  <div class="toast-container position-fixed top-0 end-0 p-3">
    <div v-for="(toast, index) in toasts" :key="toast.id">
      <div v-if="toast.show" :id='toast.id' class="toast mb-2"
        data-bs-autohide="false" :class="toast.color || color"
        role="alert" aria-live="assertive" aria-atomic="true">
        <div class="toast-header">
          <strong class="me-auto">{{ toast.title }}</strong>
          <button @click="closeToast(index)" type="button" class="btn-close"
            data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="toast-body" v-html='toast.message'></div>
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'Toast',
  }
</script>

<script setup>

  import { ref, nextTick } from 'vue';
  import { Toast } from 'bootstrap';


  // Define props
  const props = defineProps({
    autoHideDelay: {
      type: Number,
      default: 5000, // 5 seconds
    },
    color: {
      type: String,
      default: '',
    },
  });

  // Reactive state for managing toasts
  const toasts = ref([]);


  // Method to close a toast
  const closeToast = (index) => {
    toasts.value[index].show = false;
  };

  // Utility function to generate unique IDs for each toast
  const generateId = function () {
    const timestamp = new Date().getTime();
    const randomComponent = Math.floor(Math.random() * 1000); // Adjust the range as needed
    return `toast_${timestamp}_${randomComponent}`;
  };

  // Method to add a new toast
  const pushToast = (title, message, color, autoHideDelay = 0) => {
    const newToast = {
      title,
      message,
      color: color || props.color,
      show: true,
      id: generateId(),
    };

    toasts.value.push(newToast);

    const hideDelay = autoHideDelay || props.autoHideDelay;
    if (hideDelay > 0) {
      setTimeout(() => {
        closeToast(toasts.value.indexOf(newToast));
      }, hideDelay);
    }

    nextTick(() => {
      const toastEl = document.getElementById(newToast.id);
      toastEl.addEventListener('hidden.bs.toast', () => {
        closeToast(toasts.value.indexOf(newToast));
      });
      const toast = new Toast(toastEl);
      toast.show();
    });
  };

  defineExpose({
    pushToast,
  });

</script>
