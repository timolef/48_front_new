<script setup>
defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  width: {
    type: String,
    default: 'max-w-md'
  }
});

defineEmits(['update:modelValue']);
</script>

<template>
    <div 
      v-if="modelValue" 
      class="fixed inset-0 z-[100] overflow-y-auto"
      aria-labelledby="modal-title" 
      role="dialog" 
      aria-modal="true"
    >
      <!-- Overlay -->
      <div 
        class="fixed inset-0 transition-opacity"
      ></div>

      <!-- Panel -->
      <div 
         class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0"
         @click.self="$emit('update:modelValue', false)"
      >
        <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div 
          class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle w-full relative z-10"
          :class="width"
        >
          <!-- Header -->
          <div class="bg-[#26AAAF] px-4 py-3 sm:px-6">
            <h3 class="text-lg leading-6 font-medium text-white" id="modal-title">
              {{ title }}
            </h3>
          </div>

          <!-- Body -->
          <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4 max-h-[70vh] overflow-y-auto">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse border-t border-gray-100">
            <slot name="footer">
              <button 
                type="button" 
                class="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#26AAAF] sm:ml-3 sm:w-auto sm:text-sm"
                @click="$emit('update:modelValue', false)"
              >
                Fermer
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
</template>
