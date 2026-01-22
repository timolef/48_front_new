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
  const base = 'inline-flex items-center justify-center px-6 py-3 text-sm font-bold rounded-full focus:outline-none focus:ring-4 focus:ring-opacity-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md';
  
  const variants = {
    primary: 'bg-[#26AAAF] text-white hover:bg-[#219599] focus:ring-teal-200 border border-transparent',
    secondary: 'bg-[#FEF598] text-slate-800 hover:bg-[#fcf27c] focus:ring-yellow-100 border border-transparent',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-200',
    text: 'bg-transparent text-slate-600 hover:bg-slate-50 focus:ring-slate-200 shadow-none hover:shadow-none'
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
    class="active:scale-95 transform transition-transform"
  >
    <slot></slot>
  </button>
</template>
