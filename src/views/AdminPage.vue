<script setup>
import { ref, onMounted } from 'vue';
import { useAuth } from '../composables/useAuth';
import BaseCard from '../components/base/BaseCard.vue';
import BaseButton from '../components/base/BaseButton.vue';
import BaseModal from '../components/base/BaseModal.vue';
import BaseInput from '../components/base/BaseInput.vue';
import { api as apiClient } from '../api/client';

const { user } = useAuth();
const users = ref([]);
const loading = ref(true);
const error = ref('');

// Modal
const showModal = ref(false);
const editingUser = ref(null);
// Form matches DB fields
const userForm = ref({ 
  pseudo: '', 
  email: '', 
  firstname: '',
  name: '',
  isAdmin: 0 
});

const fetchUsers = async () => {
  loading.value = true;
  error.value = '';
  try {
    // The backend oddity: POST /users with email to get all users
    const res = await apiClient.post('/users', { email: user.value?.email });
    users.value = res.users || [];
  } catch (e) {
    console.error(e);
    error.value = "Erreur chargement utilisateurs. Vérifiez que vous êtes admin.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  if (user.value) {
    fetchUsers();
  }
});

const editUser = (u) => {
  editingUser.value = u;
  userForm.value = { 
    pseudo: u.pseudo, 
    email: u.email, 
    firstname: u.firstname, 
    name: u.name, 
    isAdmin: u.isAdmin 
  };
  showModal.value = true;
};

const deleteUser = async (id) => {
  if (!confirm("Supprimer cet utilisateur définitivement ?")) return;
  try {
    await apiClient.delete(`/users/${id}`);
    // Refresh list
    users.value = users.value.filter(u => u.id !== id);
  } catch (e) {
    console.error(e);
    alert("Erreur lors de la suppression");
  }
};

const saveUser = async () => {
  if (!editingUser.value) return;
  
  try {
    await apiClient.put(`/users/${editingUser.value.id}`, {
      ...userForm.value
    });
    
    // Update local list
    const idx = users.value.findIndex(u => u.id === editingUser.value.id);
    if (idx !== -1) {
      users.value[idx] = { ...users.value[idx], ...userForm.value };
    }
    showModal.value = false;
  } catch (e) {
    console.error(e);
    alert("Erreur lors de la modification");
  }
};
</script>

<template>
  <div class="space-y-8">
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-slate-800">Administration</h1>
      <BaseButton is="a" href="/news" variant="secondary" size="sm">Retour au site</BaseButton>
    </div>
    
    <BaseCard class="overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <h2 class="text-lg font-semibold text-slate-700">Gestion des Utilisateurs</h2>
        <button @click="fetchUsers" class="text-sm text-legacy-teal hover:underline">Rafraîchir</button>
      </div>
      
      <div v-if="loading" class="p-8 text-center text-slate-500">Chargement des utilisateurs...</div>
      <div v-else-if="error" class="p-8 text-center text-red-500">{{ error }}</div>
      
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200">
          <thead class="bg-slate-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Pseudo / Nom</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rôle</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-slate-200">
            <tr v-for="u in users" :key="u.id" class="hover:bg-slate-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-gradient-to-br from-teal-100 to-teal-200 flex items-center justify-center text-teal-700 font-bold text-xs mr-3 border border-teal-100 shadow-sm">
                    {{ u.pseudo ? u.pseudo.charAt(0).toUpperCase() : '?' }}
                  </div>
                  <div>
                    <div class="text-sm font-medium text-slate-900">{{ u.pseudo }}</div>
                    <div class="text-xs text-slate-500">{{ u.firstname }} {{ u.name }}</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ u.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full border"
                  :class="u.isAdmin ? 'bg-purple-100 text-purple-800 border-purple-200' : 'bg-slate-100 text-slate-600 border-slate-200'"
                >
                  {{ u.isAdmin ? 'Administrateur' : 'Membre' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="editUser(u)" class="text-blue-600 hover:text-blue-900 mr-4 font-medium transition-colors">Modifier</button>
                <button @click="deleteUser(u.id)" class="text-red-500 hover:text-red-700 font-medium transition-colors">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>

    <BaseModal v-model="showModal" title="Modifier l'utilisateur">
      <form @submit.prevent="saveUser" id="userForm" class="space-y-4">
        <BaseInput id="pseudo" v-model="userForm.pseudo" label="Pseudo" required />
        <div class="grid grid-cols-2 gap-4">
           <BaseInput id="firstname" v-model="userForm.firstname" label="Prénom" required />
           <BaseInput id="name" v-model="userForm.name" label="Nom" required />
        </div>
        <BaseInput id="email" v-model="userForm.email" label="Email" type="email" required />
        
        <div class="pt-2">
           <label class="flex items-center space-x-3 cursor-pointer">
             <input type="checkbox" v-model="userForm.isAdmin" :true-value="1" :false-value="0" class="h-5 w-5 text-legacy-teal rounded border-slate-300 focus:ring-legacy-teal transition duration-150 ease-in-out" />
             <span class="text-slate-700 font-medium">Accès Administrateur</span>
           </label>
           <p class="text-xs text-slate-500 mt-1 ml-8">Cochez cette case pour donner les droits de gestion complète.</p>
        </div>
      </form>
       <template #footer>
        <div class="flex justify-end space-x-3">
          <BaseButton variant="secondary" @click="showModal = false">Annuler</BaseButton>
          <BaseButton type="submit" form="userForm" variant="primary">Enregistrer</BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>
