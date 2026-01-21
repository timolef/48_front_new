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

onMounted(fetchPosts);

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
      
      <!-- Admin Create Button in Hero -->
       <button 
        v-if="isAdmin" 
        @click="openCreateModal"
        class="bg-[#26AAAF] text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-[#1d8c91] transition-all transform hover:-translate-y-1 font-bold uppercase tracking-wide text-sm"
      >
        + Créer une publication
      </button>
    </div>

    <!-- Content -->
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="loading" class="text-center py-12 text-slate-500">
        Chargement...
      </div>

      <div v-else-if="error" class="bg-red-50 text-red-600 p-4 rounded-lg text-center">
        {{ error }}
      </div>

    <div v-else class="space-y-4">
      <!-- Using grid layout but cards full width to match legacy list style potentially, or keeping grid if better. 
           Legacy used v-row/v-col, implying vertical list often or grid. Let's stick onto legacy card style. -->
      <div v-for="post in posts" :key="post.id" class="w-full">
         <BaseCard :title="post.title" hoverable>
            <div class="text-slate-600 whitespace-pre-line mb-4">
               {{ shortenText(post.content) }}
            </div>
            
            <template #footer>
              <div class="flex items-center justify-end text-sm text-gray-500">
                 <!-- Actions -->
                 <div class="flex items-center space-x-2 mr-auto">
                   <button class="p-2 text-gray-400 hover:bg-gray-100 rounded-full cursor-default">
                     <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                   </button>
                   
                   <template v-if="isAdmin">
                      <button @click="openEditModal(post)" class="p-2 text-blue-500 hover:bg-blue-50 rounded-full transition-colors">
                         <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/></svg>
                      </button>
                      <button @click="deletePost(post.id)" class="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
                         <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"/></svg>
                      </button>
                   </template>
                 </div>
                 
                 <span>{{ formatDate(post.created_at || new Date()) }}</span>
              </div>
            </template>
         </BaseCard>
      </div>
    </div>
    
    <div v-if="!loading && posts.length === 0" class="text-center">
       <div class="bg-white rounded shadow p-4 text-gray-500">
         Il n'y a pas de posts d'actualités
       </div>
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
