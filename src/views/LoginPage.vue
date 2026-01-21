<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import BaseInput from '../components/base/BaseInput.vue';
import BaseButton from '../components/base/BaseButton.vue';
import BaseCard from '../components/base/BaseCard.vue';

const router = useRouter();
const { login } = useAuth();

const form = ref({
  email: '',
  password: ''
});

const error = ref('');
const isLoading = ref(false);

const handleSubmit = async () => {
  error.value = '';
  isLoading.value = true;
  
  if (!form.value.email || !form.value.password) {
    error.value = 'Veuillez remplir tous les champs';
    isLoading.value = false;
    return;
  }

  try {
    const success = await login(form.value.email, form.value.password);
    if (success) {
      router.push('/');
    } else {
      error.value = 'Email ou mot de passe incorrect';
    }
  } catch (e) {
    error.value = 'Une erreur est survenue lors de la connexion';
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex justify-center items-center min-h-[calc(100vh-200px)]">
    <div class="w-full max-w-md">
      <!-- Legacy Style: Yellow Card -->
      <BaseCard title="48% - Connexion" class="shadow-xl bg-legacy-yellow mt-10">
        <template #header>
           <h3 class="text-2xl font-normal text-legacy-teal text-center uppercase tracking-wide">48% - Connexion</h3>
        </template>
        
        <form @submit.prevent="handleSubmit" class="space-y-6">
          <BaseInput
            id="email"
            v-model="form.email"
            label="Email"
            type="email"
            placeholder=""
            required
            class="bg-white/50"
          />
          
          <BaseInput
            id="password"
            v-model="form.password"
            label="Password"
            type="password"
            placeholder=""
            required
            class="bg-white/50"
          />

          <div v-if="error" class="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
            {{ error }}
          </div>

          <div class="pt-2 flex justify-between items-center px-2">
            <router-link to="/register" class="text-legacy-teal hover:underline font-medium text-sm uppercase">
              S'inscrire ?
            </router-link>

            <BaseButton 
              type="submit" 
              variant="primary" 
              :disabled="isLoading"
              class="px-8"
            >
              {{ isLoading ? '...' : 'Connexion' }}
            </BaseButton>
          </div>
        </form>
      </BaseCard>
    </div>
  </div>
</template>
