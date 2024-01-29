<template>

  <div class="accordion" role="presentation">
    <AccordionItem
      v-for="item in content"
      :item="item" @toggle="toggle"
      :groupId="groupId" :disabled="disabled"
      :key="item.id">
      <slot :name="item.id" :item="item"></slot>
    </AccordionItem>
  </div>

</template>

<script>
  export default {
    name: 'SimpleAccordion',
  };
</script>

<script setup>

  import AccordionItem from './AccordionItem.vue';


  const props = defineProps({
    content: {
      type: Array,
      required: true,
      default: () => [],
    },
    multiple: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const emits = defineEmits(['toggle']);

  const groupId = Math.random().toString(36).substring(2, 15);


  const toggle = (id) => {
    props.content.forEach((item) => {
      if (item.id === id) {
        item.active = !item.active;
      } else if (!props.multiple) {
        item.active = false;
      }

      emits('toggle', { id: item.id, status: item.active });
    });
  };

</script>
