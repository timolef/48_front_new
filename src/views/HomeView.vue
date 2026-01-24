<script setup>
import BaseCard from '../components/base/BaseCard.vue';
import BaseButton from '../components/base/BaseButton.vue';
</script>

<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <div class="text-center py-12 md:py-20 bg-gradient-to-b from-teal-50 to-transparent rounded-3xl">
      <h1 class="text-4xl md:text-6xl font-extrabold text-legacy-teal mb-6 tracking-tight">
        ASSOCIATION 48 POUR 100
      </h1>
      <p class="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light italic">
        "Mettre des mots sur les maux !"
      </p>
      <p class="text-base md:text-lg text-slate-500 max-w-xl mx-auto mb-10 font-medium italic">
        "48% des personnes harcelées à l'école n'en parlent jamais, libérons la parole"
      </p>
      <div class="flex flex-col sm:flex-row justify-center gap-4">
        <a href="https://www.helloasso.com/associations/association-48-pour-100/formulaires/1" target="_blank" rel="noopener noreferrer">
          <BaseButton variant="primary" class="w-full sm:w-auto px-8 py-4 text-lg font-bold shadow-xl hover:shadow-2xl hover:-translate-y-1">
            Faire un don
          </BaseButton>
        </a>
        <a href="https://form.dragnsurvey.com/survey/r/0d2527c9" target="_blank" rel="noopener noreferrer">
          <BaseButton variant="secondary" class="w-full sm:w-auto px-8 py-4 text-lg font-bold shadow-md hover:shadow-xl hover:-translate-y-1">
            Rejoignez-nous
          </BaseButton>
        </a>
      </div>
    </div>

    <!-- Features Grid -->
    <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <BaseCard title="Dernières actualités" :hoverable="true" class="h-full">
        <p class="mb-4 text-slate-600">
          Suivez les dernières nouvelles et annonces de l'association en temps réel.
        </p>
        <template #footer>
          <router-link to="/news" class="text-legacy-teal font-medium hover:text-teal-700 flex items-center">
            Lire les news &rarr;
          </router-link>
        </template>
      </BaseCard>

      <BaseCard title="Événements à venir" :hoverable="true" class="h-full">
        <p class="mb-4 text-slate-600">
          Restez informés sur nos prochaines actions, ateliers et rencontres.
        </p>
        <template #footer>
          <!-- Linking to news for now as events usually live there, or could be a filter -->
          <router-link to="/news" class="text-legacy-teal font-medium hover:text-teal-700 flex items-center">
            Voir le calendrier &rarr;
          </router-link>
        </template>
      </BaseCard>
    </div>
  </div>
</template>
