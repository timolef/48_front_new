<script setup>
import { ref } from 'vue';
import BaseCard from '../components/base/BaseCard.vue';
import BaseInput from '../components/base/BaseInput.vue';
import BaseButton from '../components/base/BaseButton.vue';
import TikTokIcon from '../components/icons/TikTokIcon.vue';

const form = ref({
  name: '',
  email: '',
  message: ''
});

const isSending = ref(false);
const success = ref(false);

const sendMessage = async () => {
  isSending.value = true;
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1500));
  success.value = true;
  isSending.value = false;
  form.value = { name: '', email: '', message: '' };
};
</script>

<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <div class="text-center py-12 md:py-20 bg-gradient-to-b from-teal-50 to-transparent rounded-3xl">
      <h1 class="text-4xl md:text-5xl font-extrabold text-legacy-teal mb-6 tracking-tight">
        CONTACTEZ <span class="text-legacy-yellow drop-shadow-sm">NOUS</span>
      </h1>
      <p class="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
        Une question, un partenariat ou simplement envie d'échanger ? Nous sommes à votre écoute.
      </p>
    </div>
    
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid lg:grid-cols-2 gap-12">
    <!-- Contact Form -->
    <div>
      <h1 class="text-3xl font-bold text-slate-800 mb-6">Contactez-nous</h1>
      <BaseCard class="shadow-lg">
        <form v-if="!success" @submit.prevent="sendMessage" class="space-y-6">
          <BaseInput
            id="name"
            v-model="form.name"
            label="Votre Nom"
            required
            placeholder="Jean Dupont"
          />
          <BaseInput
            id="email"
            v-model="form.email"
            label="Votre Email"
            type="email"
            required
            placeholder="jean@example.com"
          />
          <div class="mb-4">
            <label class="block text-sm font-medium text-slate-700 mb-1">Message <span class="text-red-500">*</span></label>
            <textarea 
              v-model="form.message" 
              rows="5"
              class="block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-legacy-teal focus:border-legacy-teal sm:text-sm transition duration-150 ease-in-out"
              required
              placeholder="Comment pouvons-nous vous aider ?"
            ></textarea>
          </div>
          <BaseButton type="submit" variant="primary" block :disabled="isSending">
            {{ isSending ? 'Envoi en cours...' : 'Envoyer le message' }}
          </BaseButton>
        </form>

        <div v-else class="text-center py-12">
          <div class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg class="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="text-lg font-medium text-gray-900">Message envoyé !</h3>
          <p class="mt-2 text-sm text-gray-500">Nous vous répondrons dans les plus brefs délais.</p>
          <div class="mt-6">
            <BaseButton variant="text" @click="success = false">Envoyer un autre message</BaseButton>
          </div>
        </div>
      </BaseCard>
    </div>

    <!-- Info & Socials -->
    <div class="space-y-8">
      <div>
        <h2 class="text-2xl font-bold text-slate-800 mb-4">Informations & Réseaux</h2>
        <div class="bg-white rounded-lg shadow-sm p-6 border border-slate-200 space-y-4">
          
          <!-- Email -->
          <div class="flex items-center p-3 rounded-lg hover:bg-slate-50 transition-colors">
             <svg class="h-6 w-6 text-legacy-teal mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <div>
              <p class="font-medium text-slate-900">Email</p>
              <a href="mailto:association48pour100@gmail.com" class="text-legacy-teal hover:underline font-medium">association48pour100@gmail.com</a>
            </div>
          </div>

          <!-- Adhésion -->
          <a href="https://form.dragnsurvey.com/survey/r/0d2527c9" target="_blank" class="flex items-center p-3 rounded-lg hover:bg-slate-50 transition-colors group">
             <svg class="h-6 w-6 text-legacy-teal mr-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
             </svg>
             <span class="font-medium text-slate-700 group-hover:text-legacy-teal">Vous souhaitez adhérer ? Alors cliquez !</span>
          </a>

          <!-- Podcast -->
          <a href="https://www.deezer.com/fr/show/1000853991" target="_blank" class="flex items-center p-3 rounded-lg hover:bg-slate-50 transition-colors group">
             <svg class="h-6 w-6 text-legacy-teal mr-4 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
             </svg>
             <span class="font-medium text-slate-700 group-hover:text-legacy-teal">Notre podcast Allô 48%</span>
          </a>

        </div>
      </div>

      <div>
        <h2 class="text-2xl font-bold text-slate-800 mb-4">Suivez-nous</h2>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4">
          
          <a href="https://www.facebook.com/association48pour100" target="_blank" class="flex items-center p-4 bg-white rounded-lg shadow-sm border border-slate-200 hover:border-blue-600 transition-colors group">
            <svg class="h-8 w-8 text-blue-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.04c-5.5 0-10 4.49-10 10.02c0 5 3.66 9.15 8.44 9.9v-7H7.9v-2.9h2.54V9.85c0-2.51 1.49-3.89 3.78-3.89c1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.9h-2.33v7a10 10 0 0 0 8.44-9.9c0-5.53-4.5-10.02-10-10.02Z"/>
            </svg>
            <span class="ml-3 font-medium text-slate-700">Facebook</span>
          </a>

          <a href="https://www.instagram.com/association48pour100?igsh=MWVicGJsZnM5OHRodQ==" target="_blank" class="flex items-center p-4 bg-white rounded-lg shadow-sm border border-slate-200 hover:border-pink-600 transition-colors group">
            <svg class="h-8 w-8 text-pink-600 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3Z"/>
            </svg>
            <span class="ml-3 font-medium text-slate-700">Instagram</span>
          </a>

          <a href="https://www.tiktok.com/@association48pour?_t=8hk1kncggkd&_r=1" target="_blank" class="flex items-center p-4 bg-white rounded-lg shadow-sm border border-slate-200 hover:border-[#00f2ea] transition-colors group">
            <TikTokIcon class="h-8 w-8 text-slate-800 group-hover:text-[#00f2ea] transition-colors group-hover:scale-110 transform" />
            <span class="ml-3 font-medium text-slate-700">TikTok</span>
          </a>

        </div>
      </div>
    </div>
    </div>
    </div>
  </div>
</template>
