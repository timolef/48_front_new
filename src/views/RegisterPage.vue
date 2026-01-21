<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '../composables/useAuth';
import BaseInput from '../components/base/BaseInput.vue';
import BaseSelect from '../components/base/BaseSelect.vue';
import BaseButton from '../components/base/BaseButton.vue';
import BaseCard from '../components/base/BaseCard.vue';

const router = useRouter();
const { register } = useAuth();

const form = ref({
  firstname: '',
  lastname: '', // will be sent as 'name'
  username: '', // will be sent as 'pseudo'
  email: '',
  password: '',
  confirmPassword: '',
  birthdate: '',
  gender: ''
});

const error = ref('');
const successMessage = ref('');
const isLoading = ref(false);

const genderOptions = [
  { value: 'Homme', label: 'Homme' },
  { value: 'Femme', label: 'Femme' },
  { value: 'Autre', label: 'Autre' }
];

const isFormIncomplete = computed(() => {
  return !form.value.firstname || 
         !form.value.lastname || 
         !form.value.username || 
         !form.value.email || 
         !form.value.password || 
         !form.value.confirmPassword || 
         !form.value.birthdate || 
         !form.value.gender;
});

const handleSubmit = async () => {
  error.value = '';
  successMessage.value = '';
  isLoading.value = true;

  // Legacy payload mapping
  const payload = {
    name: form.value.lastname,
    firstname: form.value.firstname,
    pseudo: form.value.username,
    email: form.value.email,
    password: form.value.password,
    confirmPassword: form.value.confirmPassword,
    birthdate: form.value.birthdate,
    gender: form.value.gender
  };

  try {
    const success = await register(payload);
    if (success) {
      successMessage.value = 'Inscription confirmée !';
      // Optional: Redirect after short delay or let user click 'Se connecter'
      // router.push('/login'); 
    } else {
      error.value = "Erreur lors de l'inscription";
    }
  } catch (e) {
    error.value = "Erreur lors de l'inscription. Veuillez réessayer.";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex justify-center items-center py-8">
    <div class="w-full max-w-2xl">
      <BaseCard title="Inscription" class="shadow-xl bg-legacy-yellow mt-10">
        <form @submit.prevent="handleSubmit" class="space-y-4">
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput
              id="firstname"
              v-model="form.firstname"
              label="Prénom"
              placeholder="John"
              required
            />
            <BaseInput
              id="lastname"
              v-model="form.lastname"
              label="Nom"
              placeholder="Doe"
              required
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-1 gap-4">
             <BaseInput
              id="username"
              v-model="form.username"
              label="Pseudo"
              placeholder="johndoe123"
              required
            />
            <BaseInput
              id="email"
              v-model="form.email"
              label="Email"
              type="email"
              placeholder="john@example.com"
              required
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput
              id="password"
              v-model="form.password"
              label="Mot de passe"
              type="password"
              placeholder="••••••••"
              required
            />
            <BaseInput
              id="confirmPassword"
              v-model="form.confirmPassword"
              label="Confirmez le mot de passe"
              type="password"
              placeholder="••••••••"
              required
            />
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
             <BaseInput
              id="birthdate"
              v-model="form.birthdate"
              label="Date de naissance"
              type="date"
              required
            />
             <BaseSelect
              id="gender"
              v-model="form.gender"
              label="Genre"
              :options="genderOptions"
              required
            />
          </div>

          <div v-if="error" class="text-red-500 text-sm text-center bg-red-50 p-2 rounded">
            {{ error }}
          </div>
          <div v-if="successMessage" class="text-green-600 text-sm text-center bg-green-50 p-2 rounded">
            {{ successMessage }}
          </div>

          <div class="pt-4 flex justify-between items-center">
             <router-link to="/login" class="text-legacy-teal font-medium hover:underline text-sm uppercase">
               Se connecter ?
             </router-link>
             
             <BaseButton 
              type="submit" 
              variant="primary" 
              :disabled="isLoading || isFormIncomplete"
              class="px-8"
            >
              {{ isLoading ? '...' : "Inscription" }}
            </BaseButton>
          </div>
        </form>
      </BaseCard>
    </div>
  </div>
</template>
