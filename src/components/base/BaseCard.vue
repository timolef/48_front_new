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
    class="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden transition-all duration-300 ease-in-out"
    :class="{ 'hover:shadow-xl hover:-translate-y-1 hover:border-slate-200': hoverable }"
  >
    <!-- Header -->
    <div v-if="title || $slots.header" class="px-8 py-6 border-b border-slate-50 bg-gradient-to-r from-slate-50 to-white">
      <h3 v-if="title" class="text-xl font-bold text-slate-800 tracking-tight">
        {{ title }}
      </h3>
      <slot name="header" v-else></slot>
    </div>

    <!-- Body -->
    <div class="px-8 py-6 text-slate-600 leading-relaxed">
      <slot></slot>
    </div>

    <!-- Footer -->
    <div v-if="$slots.footer" class="px-8 py-4 bg-slate-50/50 border-t border-slate-50">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
