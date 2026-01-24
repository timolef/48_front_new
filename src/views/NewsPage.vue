<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from '../composables/useAuth';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import BaseCard from '../components/base/BaseCard.vue';
import BaseButton from '../components/base/BaseButton.vue';
import BaseModal from '../components/base/BaseModal.vue';
import BaseInput from '../components/base/BaseInput.vue';
import { api as apiClient } from '../api/client';

const { isAdmin, user } = useAuth();
const posts = ref([]);
const loading = ref(true);
const error = ref('');

// Modal & Form State
const showModal = ref(false);
const editingId = ref(null);
const postForm = ref({ title: '', content: '' });

const fetchPosts = async () => {
  loading.value = true;
  try {
    const res = await apiClient.get('/posts');
    posts.value = Array.isArray(res) ? res : [];
  } catch (e) {
    error.value = "Impossible de charger les actualités.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchPosts();
  // Load Elfsight Platform
  const scriptId = 'elfsight-platform-script';
  if (!document.getElementById(scriptId)) {
    const script = document.createElement('script');
    script.src = 'https://elfsightcdn.com/platform.js';
    script.async = true;
    script.id = scriptId;
    document.body.appendChild(script);
  }
});

const openCreateModal = () => {
  editingId.value = null;
  postForm.value = { title: '', content: '' };
  showModal.value = true;
};

const openEditModal = (post) => {
  editingId.value = post.id;
  postForm.value = { title: post.title, content: post.content };
  showModal.value = true;
};

const savePost = async () => {
  try {
    const payload = { ...postForm.value, authorId: user.value?.id };
    if (editingId.value) {
      await apiClient.patch(`/posts/${editingId.value}`, payload);
    } else {
      await apiClient.post('/posts', payload);
    }
    showModal.value = false;
    fetchPosts();
  } catch (e) {
    alert("Erreur lors de l'enregistrement");
  }
};

const deletePost = async (id) => {
  if (!confirm("Supprimer cet article ?")) return;
  try {
    await apiClient.delete(`/posts/${id}`);
    fetchPosts();
  } catch (e) {
    alert("Erreur lors de la suppression");
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  return format(new Date(dateString), 'dd/MM/yyyy', { locale: fr }); // Legacy format dd/MM/yyyy
};

// Legacy text shortener logic
const shortenText = (text) => {
  const maxLength = 200;
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};
</script>

<template>
  <div class="space-y-12">
    <!-- Hero Section -->
    <div class="text-center py-12 md:py-20 bg-gradient-to-b from-teal-50 to-transparent rounded-3xl">
      <h1 class="text-4xl md:text-5xl font-extrabold text-legacy-teal mb-6 tracking-tight">
        ACTUALITÉS & <span class="text-legacy-yellow drop-shadow-sm">NEWS</span>
      </h1>
      <p class="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
        Suivez les dernières actions, événements et annonces officielles de l'association.
      </p>
      
      <div class="flex justify-center">
        <BaseButton 
          v-if="isAdmin" 
          @click="openCreateModal"
          variant="primary"
          class="shadow-lg hover:shadow-xl hover:-translate-y-1 font-bold uppercase tracking-wide text-sm px-8 py-3"
        >
          + Créer une publication
        </BaseButton>
      </div>
    </div>

    <!-- Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="loading" class="text-center py-20">
         <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-legacy-teal"></div>
         <p class="mt-4 text-slate-500 font-medium">Chargement des actualités...</p>
      </div>

      <div v-else-if="error" class="max-w-2xl mx-auto bg-red-50 text-red-600 p-6 rounded-2xl text-center border border-red-100">
        {{ error }}
      </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="post in posts" :key="post.id" class="flex">
         <BaseCard :title="post.title" hoverable class="w-full flex flex-col h-full">
            <div class="text-slate-600 whitespace-pre-line mb-6 flex-grow leading-relaxed">
               {{ shortenText(post.content) }}
            </div>
            
            <template #footer>
              <div class="flex items-center justify-between pt-2 border-t border-slate-50">
                 <!-- Actions -->
                 <div class="flex items-center space-x-2">
                   <button class="p-2 text-slate-400 hover:bg-slate-50 rounded-full transition-colors" title="J'aime">
                     <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
                   </button>
                   
                   <template v-if="isAdmin">
                      <button @click="openEditModal(post)" class="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors" title="Modifier">
                         <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
                      </button>
                      <button @click="deletePost(post.id)" class="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors" title="Supprimer">
                         <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                      </button>
                   </template>
                 </div>
                 
                 <span class="text-xs font-medium text-slate-400 uppercase tracking-wider">{{ formatDate(post.created_at || new Date()) }}</span>
              </div>
            </template>
         </BaseCard>
      </div>
    </div>
    
    <div v-if="!loading && posts.length === 0" class="text-center py-20">
       <div class="bg-slate-50 rounded-2xl p-8 max-w-md mx-auto border border-slate-100">
         <svg class="mx-auto h-12 w-12 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
         </svg>
         <h3 class="mt-2 text-sm font-medium text-slate-900">Aucune actualité</h3>
         <p class="mt-1 text-sm text-slate-500">Soyez le premier à poster quelque chose !</p>
         <div class="mt-6" v-if="isAdmin">
           <BaseButton variant="primary" size="sm" @click="openCreateModal">+ Nouvelle actu</BaseButton>
         </div>
       </div>
    </div>

    </div>

    <!-- Instagram Feed Section -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-extrabold text-slate-800 mb-4">
          SUIVEZ-NOUS SUR <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">INSTAGRAM</span>
        </h2>
        <p class="text-lg text-slate-600">
          Retrouvez nos dernières stories et publications en direct.
        </p>
      </div>

      <!-- Widget Container -->
      <div class="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden relative min-h-[400px] flex items-center justify-center">
        
        <!-- Placeholder / Fallback Content -->
        <!-- Replace this comment block with your Widget Code from SnapWidget or Elfsight -->
        <!-- Example: <script src="..."></script> <iframe ...></iframe> -->
        
        <div class="elfsight-app-b529be7b-8605-4e39-9425-29517ff4de54" data-elfsight-app-lazy></div>

      </div>
    </div>



    <!-- Edit/Create Modal -->
    <BaseModal 
      v-model="showModal" 
      :title="editingId ? 'Mettre à jour la publication' : 'Ajouter une nouvelle publication'"
    >
      <form @submit.prevent="savePost" id="postForm" class="space-y-4">
        <BaseInput 
          id="postTitle"
          v-model="postForm.title" 
          label="Titre de la publication" 
          required 
        />
        <div class="mb-4">
          <label class="block text-sm font-medium text-slate-700 mb-1">Contenu de la publication</label>
          <textarea 
            v-model="postForm.content" 
            rows="6"
            class="block w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-legacy-teal focus:border-legacy-teal sm:text-sm transition duration-150 ease-in-out"
            required
          ></textarea>
        </div>
      </form>
      <template #footer>
        <div class="flex justify-end space-x-3">
          <BaseButton type="button" variant="secondary" @click="showModal = false">
            Annuler
          </BaseButton>
          <BaseButton type="submit" form="postForm" variant="primary">
            {{ editingId ? 'Mettre à jour' : 'Ajouter' }}
          </BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>
