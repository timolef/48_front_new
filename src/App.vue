<script setup>
import TheNavbar from './components/TheNavbar.vue';
</script>

<template>
  <div class="min-h-screen bg-legacy-blue flex flex-col font-sans text-legacy-text">
    <TheNavbar />
    <main class="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-[90px]"> <!-- Added margin-top to account for fixed navbar if needed, or just visual spacing -->
      <RouterView />
    </main>
    <footer class="bg-white/50 border-t border-white/20 mt-auto">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-legacy-text text-sm">
          &copy; {{ new Date().getFullYear() }} Association 48 pour 100.
        </p>
      </div>
    </footer>
  </div>
</template>
