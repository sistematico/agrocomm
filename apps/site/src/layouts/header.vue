<script setup lang="ts">
import { ref } from 'vue'
import Dropdown from '@/components/dropdown.vue'

const appName = import.meta.env.VITE_APP_NAME

const open = ref(false)
</script>
<template>
  <header class="mb-8">
    <nav class="py-2.5">
      <div class="flex flex-wrap justify-between items-center mx-auto">
        <router-link to="/" class="flex items-center">
          <img src="/img/navbar.svg" class="mr-3 h-12 sm:h-10" :alt="appName" />
          <span class="self-center text-2xl font-semibold whitespace-nowrap">{{ appName }}</span>
        </router-link>

        <button @click="open = !open" type="button" class="inline-flex items-center p-2 ml-1 text-sm rounded-lg lg:hidden focus:outline-none text-gray-400 hover:bg-gray-700">
          <span class="sr-only">Abrir menu</span>
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
          <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>

        <div class="justify-between items-center w-full lg:flex lg:w-auto lg:order-1" :class="{ hidden: !open }">
          <ul class="flex items-center flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
            <li>
              <router-link to="/" class="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Início</router-link>
            </li>
            <li>
              <router-link to="/contato" class="block py-2 pr-4 pl-3 hover:text-gray-100 lg:p-0 text-gray-400">Contato</router-link>
            </li>
            <li class="flex items-center">
              <Dropdown class="block py-2 pr-4 pl-3 hover:text-gray-100 lg:p-0 text-gray-400" />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
