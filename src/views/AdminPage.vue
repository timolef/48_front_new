<script setup>
import { ref, onMounted } from 'vue';
import BaseCard from '../components/base/BaseCard.vue';
import BaseButton from '../components/base/BaseButton.vue';
import BaseModal from '../components/base/BaseModal.vue';
import BaseInput from '../components/base/BaseInput.vue';
import { api as apiClient } from '../api/client';

const users = ref([]);
const loading = ref(true);
const error = ref('');

// Modal
const showModal = ref(false);
const editingUser = ref(null);
const userForm = ref({ username: '', email: '', role: 'user' });

const fetchUsers = async () => {
  loading.value = true;
  try {
    // Mock API call or real one if backend ready
    // const res = await apiClient.get('/users');
    // users.value = res.data;
    
    // Mock data for demo if API fails or is empty
    users.value = [
      { id: 1, username: 'Admin User', email: 'admin@test.com', role: 'admin' },
      { id: 2, username: 'John Doe', email: 'john@test.com', role: 'user' },
    ];
  } catch (e) {
    error.value = "Erreur chargement utilisateurs";
  } finally {
    loading.value = false;
  }
};

onMounted(fetchUsers);

const editUser = (user) => {
  editingUser.value = user;
  userForm.value = { ...user };
  showModal.value = true;
};

const deleteUser = (id) => {
  if (!confirm("Supprimer cet utilisateur ?")) return;
  users.value = users.value.filter(u => u.id !== id);
};

const saveUser = () => {
  const idx = users.value.findIndex(u => u.id === editingUser.value.id);
  if (idx !== -1) {
    users.value[idx] = { ...editingUser.value, ...userForm.value };
  }
  showModal.value = false;
};
</script>

<template>
  <div>
    <h1 class="text-3xl font-bold text-slate-800 mb-6">Administration</h1>
    
    <BaseCard class="overflow-hidden">
      <div class="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
        <h2 class="text-lg font-semibold text-slate-700">Utilisateurs</h2>
      </div>
      
      <div v-if="loading" class="p-8 text-center text-slate-500">Chargement...</div>
      
      <div v-else class="overflow-x-auto">
        <table class="min-w-full divide-y divide-slate-200">
          <thead class="bg-slate-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Utilisateur</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Email</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rôle</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-slate-200">
            <tr v-for="user in users" :key="user.id" class="hover:bg-slate-50">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex items-center">
                  <div class="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xs mr-3">
                    {{ user.username.charAt(0).toUpperCase() }}
                  </div>
                  <div class="text-sm font-medium text-slate-900">{{ user.username }}</div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{{ user.email }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <span 
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'"
                >
                  {{ user.role }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button @click="editUser(user)" class="text-legacy-teal hover:text-teal-900 mr-3">Éditer</button>
                <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </BaseCard>

    <BaseModal v-model="showModal" title="Éditer un utilisateur">
      <form @submit.prevent="saveUser" id="userForm" class="space-y-4">
        <BaseInput id="username" v-model="userForm.username" label="Nom d'utilisateur" required />
        <BaseInput id="email" v-model="userForm.email" label="Email" type="email" required />
        <div class="mb-4">
           <label class="block text-sm font-medium text-slate-700 mb-1">Rôle</label>
           <select v-model="userForm.role" class="block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-legacy-teal focus:border-legacy-teal sm:text-sm">
             <option value="user">Utilisateur</option>
             <option value="admin">Administrateur</option>
           </select>
        </div>
      </form>
       <template #footer>
        <div class="flex justify-end space-x-3">
          <BaseButton variant="text" @click="showModal = false">Annuler</BaseButton>
          <BaseButton type="submit" form="userForm" variant="primary">Enregistrer</BaseButton>
        </div>
      </template>
    </BaseModal>
  </div>
</template>
