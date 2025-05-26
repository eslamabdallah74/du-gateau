<template>
  <span class="mdi-icon" :class="iconClasses" :style="iconStyle"></span>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 24
  },
  color: {
    type: String,
    default: ''
  },
  filled: {
    type: Boolean,
    default: false
  }
});

const iconClasses = computed(() => {
  return {
    [`mdi-${props.name}`]: true,
    'filled': props.filled
  };
});

const iconStyle = computed(() => {
  const styles: Record<string, string> = {};
  
  if (props.size) {
    styles.fontSize = `${props.size}px`;
  }
  
  if (props.color) {
    styles.color = props.color;
  }
  
  return styles;
});
</script>

<style scoped>
.mdi-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
</style>
