<template>

  <div class="accordion-item">
    <h2 class="accordion-header">
      <button type="button" @click="toggle"
        class="accordion-button fw-bold" :disabled="disabled"
        :class="{ 'collapsed bg-info-subtle': !item.active }"
        :aria-expanded="item.active"
        :aria-controls="`accordion-${groupId}-${item.id}`">
        {{ item.title }}
      </button>
    </h2>

    <transition
      name="accordion-item"
      @enter="startTransition"
      @after-enter="endTransition"
      @before-leave="startTransition"
      @after-leave="endTransition">
      <div v-if="item.active"
        :id="`accordion-${groupId}-${item.id}`"
        class="accordion-collapse overflow-hidden">
        <div class="accordion-body p-0">
          <slot>
            {{ item.title }}
          </slot>
        </div>
      </div>
    </transition>
  </div>

</template>

<script>
  export default {
    name: 'AccordionItem',
  }
</script>

<script setup>

  const props = defineProps({
    item: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    groupId: {
      type: String,
      required: true,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  })

  const emits = defineEmits(['toggle']);


  const startTransition = (el) => {
    el.style.height = `${el.scrollHeight}px`;
  };

  const endTransition = (el) => {
    el.style.height = '';
  };

  const toggle = () => {
    emits('toggle', props.item?.id);
  };

</script>
