<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { useAuth } from '../composables/useAuth';
import BaseCard from '../components/base/BaseCard.vue';
import BaseButton from '../components/base/BaseButton.vue';
import BaseModal from '../components/base/BaseModal.vue';
import BaseInput from '../components/base/BaseInput.vue';
import { api as apiClient } from '../api/client';

const { isAdmin } = useAuth();
const activeTab = ref('educative'); // educative, guides, assistance
const activeTypeFilter = ref('All'); // For educative resources: All, Article, Vidéo, Infographie

const tabs = [
  { id: 'educative', label: 'Ressources Éducatives' },
  { id: 'guides', label: 'Guides de Prévention et de Soutien' },
  { id: 'assistance', label: 'Numéros d\'Assistance' }
];

const educationTypes = ['Article', 'Vidéo', 'Infographie'];

// State
const resources = ref([]);
const loading = ref(false);
const error = ref('');

// Form State
const showModal = ref(false);
const editingId = ref(null);
const resourceForm = ref({
  title: '',
  description: '',
  link: '',
  type: 'Article', // for educative
  phone: '' // for assistance
});

// API Endpoints Mapping
const endpoints = {
  educative: '/educative-resources',
  guides: '/prevention-support-guides',
  assistance: '/assistance-organizations'
};

// Fetch Resources
const fetchResources = async () => {
  loading.value = true;
  error.value = '';
  resources.value = [];
  
  try {
    const endpoint = endpoints[activeTab.value];
    const res = await apiClient.get(endpoint);
    resources.value = Array.isArray(res) ? res : [];
  } catch (e) {
    error.value = "Impossible de charger les ressources.";
    console.error(e);
  } finally {
    loading.value = false;
  }
};

// Watch tab change to refetch
watch(activeTab, () => {
  activeTypeFilter.value = 'All'; // Reset filter
  fetchResources();
});

onMounted(fetchResources);

// Computeds
const filteredResources = computed(() => {
  let list = resources.value;
  
  // Apply Type Filter for Educative
  if (activeTab.value === 'educative' && activeTypeFilter.value !== 'All') {
    list = list.filter(r => r.type === activeTypeFilter.value);
  }
  
  return list;
});

// Actions
const openCreateModal = () => {
  editingId.value = null;
  resourceForm.value = { title: '', description: '', link: '', type: 'Article', phone: '' };
  showModal.value = true;
};

const openEditModal = (item) => {
  editingId.value = item.id;
  // Map fields based on tab because DB columns might slightly differ (e.g. name vs title for assistance)
  resourceForm.value = {
    title: item.title || item.name, // assistance uses name
    description: item.description,
    link: item.link,
    type: item.type || 'Article',
    phone: item.phone || ''
  };
  showModal.value = true;
};

const saveResource = async () => {
  try {
    const endpoint = endpoints[activeTab.value];
    
    // Prepare payload
    const payload = { ...resourceForm.value };
    if (activeTab.value === 'assistance') {
       payload.name = payload.title; // Map title back to name for assistance
    }

    if (editingId.value) {
      await apiClient.patch(`${endpoint}/${editingId.value}`, payload);
    } else {
      await apiClient.post(endpoint, payload);
    }
    
    showModal.value = false;
    fetchResources();
  } catch (e) {
    alert("Erreur lors de l'enregistrement");
    console.error(e);
  }
};

const deleteResource = async (id) => {
  if (!confirm("Voulez-vous vraiment supprimer cet élément ?")) return;
  try {
    const endpoint = endpoints[activeTab.value];
    await apiClient.delete(`${endpoint}/${id}`);
    fetchResources();
  } catch (e) {
    alert("Erreur lors de la suppression");
  }
};

const getIconForType = (type) => {
  if (type === 'Vidéo') return '🎥';
  if (type === 'Infographie') return '📊';
  return '📄';
};
</script>

<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <div class="text-center py-12 md:py-20 bg-gradient-to-b from-teal-50 to-transparent rounded-3xl">
      <h1 class="text-4xl md:text-5xl font-extrabold text-legacy-teal mb-6 tracking-tight">
        BIBLIOTHÈQUE DE <span class="text-legacy-yellow drop-shadow-sm">RESSOURCES</span>
      </h1>
      <p class="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
        Guides, outils et liens utiles pour vous accompagner et vous informer.
      </p>
    </div>

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      <!-- Main Tabs -->
      <div class="flex flex-col md:flex-row justify-center mb-10 space-y-4 md:space-y-0 md:space-x-4">
        <button 
          v-for="tab in tabs" 
          :key="tab.id"
          @click="activeTab = tab.id"
          class="px-6 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all shadow-sm border"
          :class="activeTab === tab.id 
            ? 'bg-legacy-teal text-white border-legacy-teal shadow-md transform scale-105' 
            : 'bg-white text-slate-500 border-slate-200 hover:border-legacy-teal hover:text-legacy-teal'"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- Sub-Filters for Educative -->
      <div v-if="activeTab === 'educative'" class="flex justify-center mb-8 space-x-2">
        <button 
          v-for="filter in ['All', ...educationTypes]" 
          :key="filter"
          @click="activeTypeFilter = filter"
          class="px-4 py-1.5 rounded-full text-xs font-medium border transition-colors"
          :class="activeTypeFilter === filter 
            ? 'bg-slate-800 text-white border-slate-800' 
            : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'"
        >
          {{ filter === 'All' ? 'Tout' : filter }}
        </button>
      </div>

      <!-- Admin Add Button -->
      <div v-if="isAdmin" class="flex justify-end mb-6">
        <BaseButton variant="primary" @click="openCreateModal">
          + Ajouter {{ activeTab === 'educative' ? 'une ressource' : (activeTab === 'guides' ? 'un guide' : 'un numéro') }}
        </BaseButton>
      </div>

      <!-- Loading/Error -->
      <div v-if="loading" class="text-center py-20 text-slate-400">Chargement...</div>
      <div v-else-if="error" class="text-center py-10 text-red-500">{{ error }}</div>

      <!-- Content Grid -->
      <div v-else class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <BaseCard 
          v-for="item in filteredResources" 
          :key="item.id"
          :title="item.title || item.name"
          hoverable
          class="h-full flex flex-col"
        >
          <!-- Special Header for Assistance -->
          <div v-if="activeTab === 'assistance'" class="mb-4">
            <div class="text-2xl font-bold text-legacy-teal flex items-center">
              <span class="mr-2">📞</span> {{ item.phone }}
            </div>
          </div>
          
           <!-- Special Header for Educative -->
          <div v-else-if="activeTab === 'educative' && item.type" class="mb-2">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
               {{ getIconForType(item.type) }} {{ item.type }}
            </span>
          </div>

          <div class="flex-grow text-slate-600 whitespace-pre-line mb-4 text-sm leading-relaxed">
            {{ item.description }}
          </div>
          
          <template #footer>
            <div class="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
              <a v-if="item.link" :href="item.link" target="_blank" class="text-legacy-teal font-semibold hover:underline text-sm flex items-center">
                 Voir le lien <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
              </a>
              <span v-else></span>
              
              <div v-if="isAdmin" class="flex space-x-2">
                  <button @click="openEditModal(item)" class="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Modifier">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                  </button>
                  <button @click="deleteResource(item.id)" class="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Supprimer">
                    <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
              </div>
            </div>
          </template>
        </BaseCard>
      </div>
      
      <!-- Empty State -->
      <div v-if="!loading && filteredResources.length === 0" class="text-center py-16 bg-slate-50 rounded-xl border border-dashed border-slate-300">
        <div class="text-4xl mb-4">📭</div>
        <h3 class="text-lg font-medium text-slate-700">Aucun élément trouvé</h3>
        <p class="text-slate-500">Il n'y a pas encore de ressources dans cette catégorie.</p>
      </div>

    </div>

    <!-- Modal Form -->
    <BaseModal v-model="showModal" :title="editingId ? 'Modifier l\'élément' : 'Ajouter un élément'">
      <form @submit.prevent="saveResource" id="resourceForm" class="space-y-4">
        
        <!-- Title / Name -->
        <BaseInput 
          id="title" 
          v-model="resourceForm.title" 
          :label="activeTab === 'assistance' ? 'Nom de l\'organisme' : 'Titre'" 
          required 
        />

        <!-- Type Select (Educative Only) -->
        <div v-if="activeTab === 'educative'" class="mb-4">
           <label class="block text-sm font-medium text-slate-700 mb-1">Type de ressource</label>
           <select v-model="resourceForm.type" class="block w-full px-3 py-2 bg-white text-slate-900 border border-slate-400 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-legacy-teal focus:border-legacy-teal sm:text-sm">
             <option v-for="t in educationTypes" :key="t" :value="t">{{ t }}</option>
           </select>
        </div>

        <!-- Phone (Assistance Only) -->
        <BaseInput 
          v-if="activeTab === 'assistance'"
          id="phone" 
          v-model="resourceForm.phone" 
          label="Numéro de téléphone" 
          placeholder="ex: 3020"
          required 
        />

        <!-- Description -->
        <div class="mb-4">
           <label class="block text-sm font-medium text-slate-700 mb-1">Description</label>
           <textarea 
             v-model="resourceForm.description" 
             rows="4" 
             class="block w-full px-3 py-2 bg-white text-slate-900 border border-slate-400 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-legacy-teal focus:border-legacy-teal sm:text-sm"
             required
           ></textarea>
        </div>

        <!-- Link -->
        <BaseInput 
          id="link" 
          v-model="resourceForm.link" 
          label="Lien (URL)" 
          placeholder="https://..."
        />

      </form>
      <template #footer>
        <div class="flex justify-end space-x-3">
          <BaseButton variant="secondary" @click="showModal = false">Annuler</BaseButton>
          <BaseButton type="submit" form="resourceForm" variant="primary">Enregistrer</BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>
