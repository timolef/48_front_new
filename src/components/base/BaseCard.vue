<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  hoverable: {
    type: Boolean,
    default: false
  }
});
</script>

<template>
  <div 
    class="bg-white rounded-lg shadow-md border border-slate-200 overflow-hidden transition-shadow duration-200"
    :class="{ 'hover:shadow-lg transition-transform hover:-translate-y-1': hoverable }"
  >
    <!-- Header -->
    <div v-if="title || $slots.header" class="px-6 py-4 border-b border-slate-100 bg-slate-50">
      <h3 v-if="title" class="text-lg font-semibold text-slate-800">
        {{ title }}
      </h3>
      <slot name="header" v-else></slot>
    </div>

    <!-- Body -->
    <div class="px-6 py-4 text-slate-600">
      <slot></slot>
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" class="px-6 py-4 bg-slate-50 border-t border-slate-100">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
