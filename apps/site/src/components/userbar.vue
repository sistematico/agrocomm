<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'

const auth = useAuthStore()

const open = ref(false)
</script>
<template>
  <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
    <div class="relative ml-3">
      <div>
        <button @click="open = !open" type="button" class="relative flex rounded-full bg-sonokai-black text-sm outline-none" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
          <span class="absolute -inset-1.5"></span>
          <span class="sr-only">Open user menu</span>
          <img class="h-8 w-8 rounded-full" src="/images/user-profile.svg" alt="Conta">
        </button>
      </div>
      <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-sonokai-bg py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" :class="{ 'hidden': !open }" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1" v-if="!auth.user">
        <router-link to="/entrar" class="block px-4 py-2 text-sm text-sonokai-fg hover:text-sonokai-fg" role="menuitem" tabindex="-1" id="user-menu-item-1" @click="open = false">Entrar</router-link>
        <router-link to="/cadastro" class="block px-4 py-2 text-sm text-sonokai-fg hover:text-sonokai-fg" role="menuitem" tabindex="-1" id="user-menu-item-2" @click="open = false">Cadastrar</router-link>
      </div>
      <div class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-sonokai-bg py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" :class="{ 'hidden': !open }" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabindex="-1" v-else>
        <router-link to="/" class="block px-4 py-2 text-sm text-sonokai-fg hover:text-sonokai-fg" role="menuitem" tabindex="-1" id="user-menu-item-0" @click="open = false">Your Profile</router-link>
        <router-link to="/" class="block px-4 py-2 text-sm text-sonokai-fg hover:text-sonokai-fg" role="menuitem" tabindex="-1" id="user-menu-item-1" @click="open = false">Settings</router-link>
        <router-link to="/" class="block px-4 py-2 text-sm text-sonokai-fg hover:text-sonokai-fg" role="menuitem" tabindex="-1" id="user-menu-item-2" @click="open = false">Sign out</router-link>
      </div>
    </div>
  </div>
</template>