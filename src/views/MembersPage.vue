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
  { id: 'Pôle partenariats', name: 'Pôle partenariats' },
  { id: 'Pôle interventions', name: 'Pôle interventions' },
  { id: 'Pôle podcasts', name: 'Pôle podcasts' },
  { id: 'Pôle site web', name: 'Pôle site web' }
];

const members = [
  { id: 1, name: 'Ambre', role: 'Présidente', groupe: 'Présidence', photo: 'ambre.jpg', desc: 'Visionnaire et leader inspirante, Ambre supervise les activités globales tout en veillant à la bonne cohésion de l\'équipe.' },
  { id: 2, name: 'Zoe', role: 'Vice-présidente', groupe: 'Présidence', photo: 'zoe.jpg', desc: 'Soutenant la présidente, Zoe se charge de superviser les initiatives stratégiques et de renforcer les collaborations internes.' },
  { id: 3, name: 'Maxence', role: 'Secrétaire général', groupe: 'Administration', photo: 'maxence.jpg', desc: 'Maxence est chargé de l’organisation administrative et assure une documentation impeccable des projets.' },
  { id: 4, name: 'Valentine', role: 'Co-secrétaire général', groupe: 'Administration', photo: 'valentine.jpg', desc: 'Valentine soutient les tâches administratives en coordonnant les efforts avec rigueur et professionnalisme.' },
  { id: 5, name: 'Mathilde', role: 'Trésorière', groupe: 'Administration', photo: 'mathilde.jpg', desc: 'Gardienne des finances, Mathilde gère le budget et assure la transparence financière de toutes les opérations.' },
  { id: 6, name: 'Eglantine', role: 'Responsable communication', groupe: 'Pôle communication', photo: 'eglantine.jpg', desc: 'Églantine supervise les stratégies de communication pour donner de la visibilité aux projets de l’organisation.' },
  { id: 7, name: 'Romane', role: 'Responsable communication', groupe: 'Pôle communication', photo: 'romane.jpg', desc: 'Romane travaille sur des campagnes percutantes, garantissant une image cohérente et dynamique.' },
  { id: 8, name: 'Timothée F.', role: 'Responsable partenariat', groupe: 'Pôle partenariats', photo: 'timotheef.jpg', desc: 'Spécialiste des relations externes, Timothée F. établit et entretient des collaborations avec des partenaires clés.' },
  { id: 9, name: 'Quitterie', role: 'Responsable interventions', groupe: 'Pôle interventions', photo: 'quitterie.jpg', desc: 'Quitterie coordonne les initiatives terrain pour assurer un impact direct et mesurable.' },
  { id: 10, name: 'Nicolas', role: 'Responsable podcast', groupe: 'Pôle podcasts', photo: 'nicolas.jpg', desc: 'Nicolas dirige la création et la diffusion de podcasts captivants qui amplifient la voix de l’organisation.' },
  { id: 11, name: 'Maxence', role: 'Membre podcast', groupe: 'Pôle podcasts', photo: 'maxence.jpg', desc: 'Maxence contribue à la production des podcasts en apportant créativité et expertise technique.' },
  { id: 12, name: 'Maissa', role: 'Membre podcast', groupe: 'Pôle podcasts', photo: 'maissa.jpg', desc: 'Maïssa participe à la préparation des contenus audio, offrant des perspectives originales et enrichissantes.' },
  { id: 13, name: 'Timothée L.', role: 'Responsable site web', groupe: 'Pôle site web', photo: 'timotheel.jpg', desc: 'En charge du site, Timothée L. optimise la plateforme pour une navigation fluide et une mise en valeur des projets.' }
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
          class="bg-white rounded-[15px] pt-4 h-[250px] w-[270px] text-center flex flex-col items-center shadow-[0_6px_14px_rgba(0,0,0,0.2)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:-translate-y-3 transition-all duration-300 cursor-pointer overflow-hidden group border border-slate-100"
          @click="openMemberDetails(member)"
        >
          <!-- Image Container with Grayscale Effect that removes on Hover -->
          <div class="h-[120px] w-[120px] rounded-full shadow-lg mt-4 mx-auto overflow-hidden transition-all duration-300 group-hover:scale-110 ring-4 ring-transparent group-hover:ring-legacy-yellow">
             <img 
               :src="getImageUrl(member.photo)" 
               :alt="member.name"
               class="h-full w-full object-cover filter grayscale transition-all duration-300 group-hover:grayscale-0"
             />
          </div>
          
          <h3 class="text-[1.4em] font-bold text-[#333] mt-4 mb-0 group-hover:text-legacy-teal transition-colors">{{ member.name }}</h3>
          <p class="text-[1.1em] text-[#666] mb-4">{{ member.role }}</p>
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
