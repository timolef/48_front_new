<script setup>
import { computed } from 'vue';

const props = defineProps({
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary', 'danger', 'text'].includes(value)
  },
  type: {
    type: String,
    default: 'button'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  block: {
    type: Boolean,
    default: false
  }
});

const classes = computed(() => {
  const base = 'inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-[#26AAAF] text-white hover:bg-[#1d8c91] focus:ring-[#26AAAF] border border-transparent',
    secondary: 'bg-[#FEF598] text-slate-800 hover:bg-[#fcf27c] focus:ring-[#FEF598] border border-transparent',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    text: 'bg-transparent text-slate-600 hover:bg-slate-100 focus:ring-slate-300'
  };

  const width = props.block ? 'w-full' : '';

  return `${base} ${variants[props.variant]} ${width}`;
});
</script>

<template>
  <button
    :type="type"
    :class="classes"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>
