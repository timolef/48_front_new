<script setup>
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';
import BaseCard from '../components/base/BaseCard.vue';
import BaseButton from '../components/base/BaseButton.vue';

const { user, logout } = useAuth();
const router = useRouter();

const handleLogout = () => {
  logout();
  router.push('/login');
};
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <BaseCard title="Mon Profil" class="shadow-lg">
      <div v-if="user" class="space-y-6">
        <div class="flex items-center space-x-4 mb-6">
          <div class="h-20 w-20 rounded-full bg-legacy-teal flex items-center justify-center text-white text-3xl font-bold shadow-md">
            {{ user.username?.charAt(0).toUpperCase() }}
          </div>
          <div>
            <h2 class="text-2xl font-bold text-slate-800">{{ user.username }}</h2>
            <p class="text-slate-500">{{ user.email }}</p>
            <span 
              v-if="user.role === 'admin'"
              class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-2"
            >
              Administrateur
            </span>
          </div>
        </div>

        <div class="border-t border-slate-100 pt-6 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="bg-slate-50 p-4 rounded-lg">
              <span class="block text-sm text-slate-500">Division</span>
              <span class="font-medium text-slate-900">{{ user.division || 'Non renseignée' }}</span>
            </div>
            <div class="bg-slate-50 p-4 rounded-lg">
              <span class="block text-sm text-slate-500">Ville</span>
              <span class="font-medium text-slate-900">{{ user.city || 'Non renseignée' }}</span>
            </div>
            <div class="bg-slate-50 p-4 rounded-lg">
              <span class="block text-sm text-slate-500">Téléphone</span>
              <span class="font-medium text-slate-900">{{ user.phone || 'Non renseigné' }}</span>
            </div>
          </div>
        </div>

        <div class="pt-6 mt-6 border-t border-slate-100">
           <BaseButton variant="danger" @click="handleLogout" class="w-full sm:w-auto">
             Se déconnecter
           </BaseButton>
        </div>
      </div>
      
      <div v-else class="text-center py-8">
        <p class="text-slate-500 mb-4">Vous n'êtes pas connecté.</p>
        <router-link to="/login">
          <BaseButton>Se connecter</BaseButton>
        </router-link>
      </div>
    </BaseCard>
  </div>
</template>
