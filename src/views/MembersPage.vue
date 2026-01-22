<script setup>
import { ref } from 'vue';
import BaseModal from '../components/base/BaseModal.vue';

// Dynamic image loading for Vite
const images = import.meta.glob('../assets/*.{png,jpg,jpeg,svg}', { eager: true });

const getImageUrl = (name) => {
  const path = `../assets/${name}`;
  return images[path]?.default || name; // Return resolved path or original name if not found
};

const categories = [
  { id: 'Présidence', name: 'Présidence' },
  { id: 'Administration', name: 'Administration' },
  { id: 'Pôle communication', name: 'Pôle communication' },
  { id: 'Pôle podcasts', name: 'Pôle podcasts' },
  { id: 'Pôle interventions', name: 'Pôle interventions' }
];

const members = [
  // Présidence
  { id: 1, name: 'Ambre', role: 'Présidente', groupe: 'Présidence', photo: 'ambre.jpg', desc: 'Visionnaire et leader inspirante, Ambre supervise les activités globales tout en veillant à la bonne cohésion de l\'équipe.' },
  { id: 2, name: 'Zoé', role: 'Vice présidente', groupe: 'Présidence', photo: 'zoe.jpg', desc: 'Soutenant la présidente, Zoé se charge de superviser les initiatives stratégiques et de renforcer les collaborations internes.' },

  // Administration
  { id: 3, name: 'Maxence', role: 'Secrétaire Général', groupe: 'Administration', photo: 'maxence.jpg', desc: 'Maxence est chargé de l’organisation administrative et assure une documentation impeccable des projets.' },
  { id: 4, name: 'Mathilde', role: 'Trésorière', groupe: 'Administration', photo: 'mathilde.jpg', desc: 'Gardienne des finances, Mathilde gère le budget et assure la transparence financière de toutes les opérations.' },

  // Pôle communication
  { id: 5, name: 'Ludivine', role: 'Responsable pôle comm', groupe: 'Pôle communication', photo: 'ludivine.jpg', desc: 'Ludivine pilote la stratégie de communication avec créativité et rigueur.' },
  { id: 6, name: 'Églantine', role: 'Membre communication', groupe: 'Pôle communication', photo: 'eglantine.jpg', desc: 'Membre active du pôle communication.' },
  { id: 7, name: 'Jade', role: 'Membre communication', groupe: 'Pôle communication', photo: 'jade.jpg', desc: 'Membre active du pôle communication.' },
  { id: 8, name: 'Léa', role: 'Membre communication', groupe: 'Pôle communication', photo: 'lea_comm.jpg', desc: 'Membre active du pôle communication.' },
  { id: 9, name: 'Lou', role: 'Membre communication', groupe: 'Pôle communication', photo: 'lou.jpg', desc: 'Membre active du pôle communication.' },
  { id: 10, name: 'Nour', role: 'Membre communication', groupe: 'Pôle communication', photo: 'nour.jpg', desc: 'Membre active du pôle communication.' },
  { id: 11, name: 'Romane', role: 'Membre communication', groupe: 'Pôle communication', photo: 'romane.jpg', desc: 'Membre active du pôle communication.' },
  { id: 12, name: 'Safaa', role: 'Membre communication', groupe: 'Pôle communication', photo: 'safaa.jpg', desc: 'Membre active du pôle communication.' },
  { id: 13, name: 'Timothée', role: 'Membre communication', groupe: 'Pôle communication', photo: 'timothee.jpg', desc: 'Membre actif du pôle communication.' },

  // Pôle podcasts
  { id: 14, name: 'Nicolas', role: 'Responsable pôle podcast', groupe: 'Pôle podcasts', photo: 'nicolas.jpg', desc: 'Nicolas dirige la création et la diffusion de podcasts captivants.' },
  { id: 15, name: 'Anaëlle', role: 'Membre podcast', groupe: 'Pôle podcasts', photo: 'anaelle.jpg', desc: 'Membre active du pôle podcast.' },
  { id: 16, name: 'Clémentine', role: 'Membre podcast', groupe: 'Pôle podcasts', photo: 'clementine.jpg', desc: 'Membre active du pôle podcast.' },
  { id: 17, name: 'Juliette', role: 'Membre podcast', groupe: 'Pôle podcasts', photo: 'juliette.jpg', desc: 'Membre active du pôle podcast.' },
  { id: 18, name: 'Lorenzo', role: 'Membre podcast', groupe: 'Pôle podcasts', photo: 'lorenzo.jpg', desc: 'Membre actif du pôle podcast.' },
  { id: 19, name: 'Léa', role: 'Membre podcast', groupe: 'Pôle podcasts', photo: 'lea_pod.jpg', desc: 'Membre active du pôle podcast.' },
  { id: 20, name: 'Maïssa', role: 'Membre podcast', groupe: 'Pôle podcasts', photo: 'maissa.jpg', desc: 'Membre active du pôle podcast.' },
  { id: 21, name: 'Maxence', role: 'Membre podcast', groupe: 'Pôle podcasts', photo: 'maxence.jpg', desc: 'Membre actif du pôle podcast.' },

  // Pôle interventions
  { id: 22, name: 'Quitterie', role: 'Responsable pôle intervention', groupe: 'Pôle interventions', photo: 'quitterie.jpg', desc: 'Quitterie coordonne les initiatives terrain pour assurer un impact direct.' },
  { id: 23, name: 'Alexandre', role: 'Membre intervention', groupe: 'Pôle interventions', photo: 'alexandre.jpg', desc: 'Membre actif du pôle intervention.' },
  { id: 24, name: 'Anaëlle', role: 'Membre intervention', groupe: 'Pôle interventions', photo: 'anaelle.jpg', desc: 'Membre active du pôle intervention.' },
  { id: 25, name: 'Émilie', role: 'Membre intervention', groupe: 'Pôle interventions', photo: 'emilie.jpg', desc: 'Membre active du pôle intervention.' },
  { id: 26, name: 'Juliette', role: 'Membre intervention', groupe: 'Pôle interventions', photo: 'juliette.jpg', desc: 'Membre active du pôle intervention.' },
  { id: 27, name: 'Léa', role: 'Membre intervention', groupe: 'Pôle interventions', photo: 'lea_inter1.jpg', desc: 'Membre active du pôle intervention.' },
  { id: 28, name: 'Léa', role: 'Membre intervention', groupe: 'Pôle interventions', photo: 'lea_inter2.jpg', desc: 'Membre active du pôle intervention.' },
  { id: 29, name: 'Lorenzo', role: 'Membre intervention', groupe: 'Pôle interventions', photo: 'lorenzo.jpg', desc: 'Membre actif du pôle intervention.' },
  { id: 30, name: 'Ophélie', role: 'Membre intervention', groupe: 'Pôle interventions', photo: 'ophelie.jpg', desc: 'Membre active du pôle intervention.' },
  { id: 31, name: 'Polina', role: 'Membre intervention', groupe: 'Pôle interventions', photo: 'polina.jpg', desc: 'Membre active du pôle intervention.' },
  { id: 32, name: 'Safaa', role: 'Membre intervention', groupe: 'Pôle interventions', photo: 'safaa.jpg', desc: 'Membre active du pôle intervention.' }
];

const selectedMember = ref(null);
const showModal = ref(false);

const openMemberDetails = (member) => {
  selectedMember.value = member;
  showModal.value = true;
};
</script>

<template>
  <div class="px-4">
  <div class="space-y-12">
    <!-- Hero Section -->
    <div class="text-center py-12 md:py-20 bg-gradient-to-b from-teal-50 to-transparent rounded-3xl">
      <h1 class="text-4xl md:text-5xl font-extrabold text-legacy-teal mb-6 tracking-tight">
        L'ÉQUIPE <span class="text-legacy-yellow drop-shadow-sm">48%</span>
      </h1>
      <p class="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
        Découvrez les personnes passionnées qui font vivre l'association au quotidien.
      </p>
    </div>

    <div v-for="category in categories" :key="category.id" class="mb-16">
       <!-- Gradient Title -->
      <div class="flex justify-center mb-10">
        <h2 class="text-2xl font-light text-white uppercase tracking-wide px-8 py-3 rounded-2xl shadow-md bg-gradient-to-r from-legacy-teal-light to-legacy-teal-dark relative after:content-[''] after:block after:w-[60px] after:h-[4px] after:bg-white after:mx-auto after:mt-2 after:rounded-sm transform hover:scale-105 transition-transform duration-300">
          {{ category.name }}
        </h2>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
        <div 
          v-for="member in members.filter(m => m.groupe === category.id)" 
          :key="member.id"
          class="bg-white rounded-2xl pt-4 h-[250px] w-[270px] text-center flex flex-col items-center shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden group border border-slate-100"
          @click="openMemberDetails(member)"
        >
          <!-- Image Container with Grayscale Effect that removes on Hover -->
          <div class="h-[120px] w-[120px] rounded-full shadow-md mt-4 mx-auto overflow-hidden transition-all duration-300 group-hover:scale-105 ring-4 ring-slate-50 group-hover:ring-legacy-yellow">
             <img 
               :src="getImageUrl(member.photo)" 
               :alt="member.name"
               class="h-full w-full object-cover filter grayscale transition-all duration-300 group-hover:grayscale-0"
             />
          </div>
          
          <h3 class="text-xl font-bold text-slate-800 mt-4 mb-1 group-hover:text-legacy-teal transition-colors">{{ member.name }}</h3>
          <p class="text-sm font-medium text-slate-500 mb-4">{{ member.role }}</p>
        </div>
      </div>
    </div>

    <!-- Enhanced Modal -->
    <BaseModal v-model="showModal" :title="selectedMember?.name || ''" width="sm:max-w-2xl">
      <div v-if="selectedMember" class="text-center px-4 py-2">
         <div class="h-[200px] w-[200px] mx-auto rounded-[15%] shadow-xl bg-gray-200 overflow-hidden mb-8 transform hover:rotate-2 transition-transform duration-500">
            <img 
               :src="getImageUrl(selectedMember.photo)" 
               :alt="selectedMember.name"
               class="h-full w-full object-cover"
             />
         </div>
        
        <h3 class="text-2xl font-bold text-legacy-teal mt-4 mb-2">{{ selectedMember.name }}</h3>
        <div class="flex justify-center items-center space-x-2 mb-6">
           <span class="bg-legacy-yellow/30 text-slate-800 px-3 py-1 rounded-full text-sm font-medium border border-legacy-yellow">
             {{ selectedMember.role }}
           </span>
           <span class="bg-legacy-teal/10 text-legacy-teal px-3 py-1 rounded-full text-sm font-medium border border-legacy-teal/20">
             {{ selectedMember.groupe }}
           </span>
        </div>
        
        <div class="prose max-w-none text-slate-600 leading-relaxed bg-slate-50 p-6 rounded-xl text-left border-l-4 border-legacy-teal">
          {{ selectedMember.desc }}
        </div>
      </div>
    </BaseModal>
  </div>
  </div>
</template>
