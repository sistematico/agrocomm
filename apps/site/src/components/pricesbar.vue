<script setup lang="ts">
import { ref } from 'vue'

const open = ref(false)
</script>
<template>
  <div>
    <div class="relative">
      <ul class="absolute z-10 flex-col md:flex-row flex md:space-x-8">
        <li>
          <button @click="open = !open" id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar" class="relative w-full rounded-md bg-sonokai-black py-2 pl-3 pr-10 text-left text-white shadow-sm outline-none">
            Cotações
            <svg class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
            </svg>
          </button>
          <div id="dropdownNavbar" class="bg-white text-base z-10 list-none divide-y divide-gray-100 rounded shadow my-4 w-44" :class="{ 'hidden': !open }">
            <ul class="py-1" aria-labelledby="dropdownLargeButton">
              <li>
                <a href="#" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Dashboard</a>
              </li>
              <li>
                <a href="#" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Settings</a>
              </li>
              <li>
                <a href="#" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Earnings</a>
              </li>
            </ul>
            <div class="py-1">
              <a href="#" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">Sign out</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>