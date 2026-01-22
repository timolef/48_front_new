<script setup>
import { ref } from 'vue';
import { useAuth } from '../composables/useAuth';
import { useRouter } from 'vue-router';

const { isAuthenticated, isAdmin, user, logout } = useAuth();
const router = useRouter();
const isMenuOpen = ref(false);
const isUserMenuOpen = ref(false);

const handleLogout = () => {
  logout();
  router.push('/login');
};

const navLinks = [
  { name: 'Accueil', path: '/' },
  { name: 'à propos', path: '/about' },
  { name: 'Ressources', path: '/ressources' },
  { name: 'Nos membres', path: '/members' },
  { name: 'Publications', path: '/news' },
  { name: 'Nous contacter', path: '/contact' },
];
</script>

<template>
  <nav class="bg-[#26AAAF] shadow-lg h-[90px] fixed w-full top-0 z-50 flex items-center">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
      <div class="flex justify-between items-center h-full">
        <!-- Logo & Brand -->
        <div class="flex items-center">
          <div class="flex-shrink-0 flex items-center justify-center mr-8 group cursor-pointer" @click="router.push('/')">
            <img class="h-[50px] w-auto transform transition-transform duration-300 group-hover:scale-110" src="../assets/logo.png" alt="Logo" onError="this.style.display='none'"/>
          </div>
          
          <!-- Desktop Nav -->
          <div class="hidden md:flex space-x-8">
            <template v-for="link in navLinks" :key="link.path">
              <router-link 
                :to="link.path"
                class="px-2 py-2 text-white/90 text-[12px] font-bold uppercase tracking-widest transition-all duration-300 hover:text-white transform hover:scale-105"
                active-class="!text-legacy-yellow scale-105"
              >
                {{ link.name }}
              </router-link>
            </template>
            <router-link 
              v-if="isAdmin" 
              to="/admin" 
              class="px-4 py-2 ml-4 text-legacy-yellow text-[12px] font-bold uppercase tracking-widest border-2 border-legacy-yellow rounded-full hover:bg-legacy-yellow hover:text-[#26AAAF] transition-all duration-300"
              active-class="bg-legacy-yellow !text-[#26AAAF]"
            >
              Admin
            </router-link>
          </div>
        </div>

        <!-- Right Side: Auth -->
        <div class="hidden md:flex items-center ml-auto">
           <!-- Legacy Icon Button Style -->
           <div class="relative ml-3">
             <button 
                @click="isUserMenuOpen = !isUserMenuOpen"
                class="p-2 rounded-full text-legacy-yellow hover:text-white hover:bg-white/10 transition-colors focus:outline-none"
             >
               <svg class="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
               </svg>
             </button>

              <!-- Dropdown -->
              <div 
                v-if="isUserMenuOpen"
                @mouseleave="isUserMenuOpen = false"
                class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 text-left" 
                role="menu" 
              >
                <template v-if="isAuthenticated">
                  <div class="px-4 py-2 text-sm text-gray-500 border-b border-gray-100">
                    {{ user?.username }}
                  </div>
                  <router-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Profil</router-link>
                  <button @click="handleLogout" class="block w-full text-left px-4 py-2 text-sm text-legacy-teal hover:bg-teal-50" role="menuitem">
                    Déconnexion
                  </button>
                </template>
                <template v-else>
                  <router-link to="/login" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Connexion</router-link>
                  <router-link to="/register" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Inscription</router-link>
                </template>
              </div>
           </div>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center md:hidden">
          <button 
            @click="isMenuOpen = !isMenuOpen"
            type="button" 
            class="text-legacy-yellow hover:text-white p-2"
            aria-controls="mobile-menu" 
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg 
              :class="{'hidden': isMenuOpen, 'block': !isMenuOpen}" 
              class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg 
              :class="{'block': isMenuOpen, 'hidden': !isMenuOpen}" 
              class="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Menu -->
    <div v-show="isMenuOpen" class="md:hidden absolute top-[90px] left-0 w-full bg-[#26AAAF] border-t border-teal-600 shadow-xl" id="mobile-menu">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
        <router-link 
          v-for="link in navLinks" 
          :key="link.path"
          :to="link.path" 
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-teal-700"
          active-class="bg-teal-800"
        >
          {{ link.name }}
        </router-link>
        <router-link 
          v-if="isAdmin" 
          to="/admin" 
          class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-teal-700"
          active-class="bg-teal-800"
        >
          Admin
        </router-link>
        
        <div class="border-t border-teal-600 pt-4 mt-4">
           <template v-if="isAuthenticated">
             <button @click="handleLogout" class="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-legacy-yellow hover:text-white">Déconnexion</button>
           </template>
           <template v-else>
             <router-link to="/login" class="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-teal-700">Connexion</router-link>
           </template>
        </div>
      </div>
    </div>
  </nav>
</template>
