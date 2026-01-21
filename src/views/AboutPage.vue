<script setup>
import { ref } from 'vue';
import BaseCard from '../components/base/BaseCard.vue';
import BaseButton from '../components/base/BaseButton.vue'; // Optional if needed for CTA

const activeTab = ref(0);

const tabs = [
  { 
    title: '48% en bref', 
    id: 0,
    items: [
      {
        question: "Pourquoi le nom 48% ?",
        icon: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", // Info icon
        answer: "Le choix du nom n'est pas anodin. Il est le reflet d'une réalité alarmante révélée par un rapport du Sénat : **48% des personnes harcelées à l'école n'en parlent jamais**. \nCe silence est lourd de conséquences, et notre mission est de briser ce mur de silence en offrant des espaces de parole et de soutien, ainsi qu'en sensibilisant à cette problématique."
      },
      {
        question: "Le mot de la Présidente",
        icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", // Heart
        answer: "\"L'idée de créer 48% m'est venue lors d'un projet solidaire au Cambodge avec l'association *\"Toutes à l'école\"*. Pendant deux mois et demi, j'ai été témoin de l'impact positif de l'éducation et du soutien sur les jeunes filles. \nCette expérience a été si enrichissante que, de retour en France, j'ai ressenti le besoin impérieux de continuer à aider et à faire une différence, cette fois-ci en m'attaquant au fléau du harcèlement scolaire.\"\n\n**- Ambre**"
      },
      {
        question: "Quel est notre but ?",
        icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", // Check circle
        answer: "Le but principal de 48% est de **lutter activement contre le harcèlement scolaire** et les problèmes de santé mentale. Nous souhaitons sensibiliser, soutenir, et intervenir de manière holistique pour aider les élèves à comprendre, reconnaître, et agir. \nEn impliquant directement les étudiants et en collaborant avec les écoles, nous croyons fermement en notre capacité à faire une différence."
      }
    ]
  },
  { 
    title: 'Notre fonctionnement', 
    id: 1,
    items: [
      {
        question: "Notre Mission",
        icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z", // Shield
        answer: "Notre association a pour mission de lutter activement contre le harcèlement scolaire, un problème qui affecte de nombreux élèves et a des conséquences graves sur leur bien-être et leur éducation. Nous croyons qu'en impliquant des étudiants dans notre association, nous créons une proximité qui favorise une meilleure compréhension des enjeux actuels. Pour atteindre cet objectif, nous avons élaboré un plan d'action concret et innovant."
      },
      {
        question: "Création de Comptes sur les Réseaux Sociaux",
        icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z", // Chat
        answer: "À ce stade, nous avons créé nos réseaux sociaux et développé une présence en ligne notamment grâce à nos podcast particulièrement sur Instagram, et plus récemment notre Tiktok. Je suis aussi allée a l'Assemblé Nationale en mai 2024 au nom de l'association afin de discuter de ces sujets. Nous avons réussi à obtenir une subvention de 1500 euros afin d'acheter du matériel etc... et avons été interviewé par un média afin de parler de notre projet."
      },
      {
        question: "Interventions de Sensibilisation",
        icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", // Book
        answer: "L'association prévoit d'organiser des interventions dans les collèges pour sensibiliser les élèves au problème du harcèlement scolaire. Ces interventions seront interactives et axées sur la prévention, visant à encourager les élèves à reconnaître les signes de harcèlement et à prendre des mesures pour le prévenir. Par exemple, des mises en scène et des discussions interactives permettront de comprendre les conséquences du harcèlement sur les victimes et d'encourager les harceleurs à réfléchir à leurs actions."
      },
      {
        question: "Groupes de Parole et de Soutien dans les Collèges",
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z", // Group
        answer: "L'association prévoit de se rendre dans les collèges pour créer des groupes de parole et de soutien. Ces groupes offriront un espace sûr où les élèves pourront s'exprimer librement sur leurs expériences de harcèlement, leurs peurs et leurs préoccupations. Notre objectif est d'établir des services de consultation psychologique dans les collèges, accessibles aux élèves pendant la journée d'intervention."
      },
      {
        question: "Quels sont les différents pôles de l'association 48% ?",
        icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10", // Roles
        answer: "Notre association est structurée autour de plusieurs pôles, chacun ayant un rôle crucial dans la réalisation de notre mission.\n\n- **Pôle Intervention** : Ce pôle est au cœur de notre action sur le terrain. Il compte organiser et mettre en œuvre les interventions dans les établissements scolaires, sensibiliser les élèves au harcèlement et animer les groupes de parole et de soutien.\n- **Pôle Communication** : Essentiel pour diffuser notre message, ce pôle gère nos comptes sur les réseaux sociaux, crée du contenu engageant et bienveillant, et s'assure que notre mission atteint un large public.\n- **Pôle Site Web** : Ce pôle développe et maintient notre présence en ligne. Le site web est une vitrine de notre action et une ressource précieuse pour ceux qui cherchent à comprendre le harcèlement scolaire et à trouver de l'aide.\n- **Pôle Partenariat** : Ce pôle établit des relations stratégiques avec d'autres organisations, écoles et professionnels de la santé mentale pour élargir notre impact et renforcer notre réseau de soutien.\n- **Pôle Trésorerie** : Indispensable à la bonne gestion de l'association, ce pôle assure la santé financière de 48%, gérant les fonds avec transparence et en cherchant des financements pour soutenir nos activités.\n- **Pôle Podcast** : Enfin, le pôle podcast, qui est une extension de notre mission éducative et de sensibilisation. À travers ce média, nous partageons des histoires, des expériences et des discussions approfondies, offrant une autre plateforme pour éduquer et inspirer au changement."
      }
    ]
  }
];
</script>

<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <div class="text-center py-12 md:py-20 bg-gradient-to-b from-teal-50 to-transparent rounded-3xl">
      <h1 class="text-4xl md:text-5xl font-extrabold text-legacy-teal mb-6 tracking-tight">
        À PROPOS DE <span class="text-legacy-yellow drop-shadow-sm">48%</span>
      </h1>
      <p class="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
        Découvrez notre histoire, notre mission et comment nous agissons au quotidien pour lutter contre le harcèlement scolaire.
      </p>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Tabs Navigation -->
      <div class="flex justify-center mb-12">
        <div class="inline-flex bg-white rounded-full p-1 shadow-sm border border-slate-200">
          <button 
            v-for="tab in tabs" 
            :key="tab.id"
            @click="activeTab = tab.id"
            class="px-8 py-3 rounded-full text-base font-semibold focus:outline-none transition-all duration-300"
            :class="activeTab === tab.id 
              ? 'bg-[#26AAAF] text-white shadow-md' 
              : 'text-slate-500 hover:text-[#26AAAF] hover:bg-slate-50'"
          >
            {{ tab.title }}
          </button>
        </div>
      </div>

      <!-- Tab Content -->
      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-200 ease-in absolute w-full"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
        mode="out-in"
      >
        <div :key="activeTab" class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <template v-for="(item, index) in tabs[activeTab].items" :key="index">
              <BaseCard class="h-full border-t-4 border-t-[#26AAAF] flex flex-col hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                <div class="flex items-start mb-4">
                  <div class="p-3 bg-teal-50 rounded-lg mr-4 text-[#26AAAF]">
                    <svg class="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="item.icon" />
                    </svg>
                  </div>
                  <h3 class="text-xl font-bold text-slate-800 pt-1 leading-snug">{{ item.question }}</h3>
                </div>
                
                <div class="text-slate-600 leading-relaxed whitespace-pre-line flex-grow text-[15px]">
                  <span v-html="item.answer.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')"></span>
                </div>
              </BaseCard>
            </template>
        </div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
/* Smooth transitions custom utils if needed, mostly handled by Tailwind */
</style>
