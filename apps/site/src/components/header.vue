<script setup lang="ts">
import { ref } from 'vue'
import UserBar from '@/components/userbar.vue'
import EstadosDropdown from '@/components/estados.vue'

const appName = import.meta.env.VITE_APP_NAME!
const open = ref(false)
</script>
<template>
  <header class="fixed w-full top-0 z-10 bg-sonokai-bg_dim border-0 border-b-2 border-sonokai-border">
    <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
      <div class="relative flex h-16 items-center justify-between">
        <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
          <button @click="open = !open" type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white outline-none" aria-controls="mobile-menu" aria-expanded="false">
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            <svg class="h-6 w-6" :class="{ 'block': !open, 'hidden': open }" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            <svg class="h-6 w-6" :class="{ 'block': open, 'hidden': !open }" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
          <router-link to="/" class="flex flex-shrink-0 items-center logo">
            <img class="h-10 w-auto md:me-2" src="/images/navbar.svg" :alt="appName">
            <span class="hidden md:block font-extrabold text-2xl text-sonokai-fg hover:text-sonokai-fg bg-transparent">{{ appName }}</span>
          </router-link>
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex items-center space-x-4">
              <router-link to="/" class="rounded-md bg-sonokai-black px-3 py-2 font-bold text-sonokai-fg hover:text-sonokai-fg">
                <font-awesome-icon icon="fa-solid fa-house" />
                Início
              </router-link>
              <!-- <router-link to="/" class="rounded-md px-3 py-2 font-bold text-gray-300 hover:bg-gray-700 hover:text-white">Team</router-link> -->
              <estados-dropdown />
            </div>
          </div>
        </div>
        <user-bar />
      </div>
    </div>

    <!-- Mobile menu, show/hide based on menu state. -->
    <div class="sm:hidden" :class="{ 'block': open, 'hidden': !open }" id="mobile-menu">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <router-link to="/" class="block rounded-md bg-sonokai-black px-3 py-2 text-base font-medium text-white">Início</router-link>
        <!-- <router-link to="/" class="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Team</router-link> -->
      </div>
    </div>
  </header>
</template>
<style scoped lang="scss">
.active {
  @apply transition ease-in-out bg-sonokai-black duration-300 hover:text-sonokai-fg;
}

.logo.active {
  @apply transition ease-in-out bg-transparent duration-300 hover:text-sonokai-fg;
}
</style>