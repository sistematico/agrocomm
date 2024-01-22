<script setup lang="ts">
import { ref, computed } from 'vue'
import { store } from '@/store'
import { estados } from '@/composables/estados'

const open = ref(false)

const selected = computed(() => {
  const stateAcronym = store.state || 'BR'
  const selectedIndex = estados.findIndex(item => item.uf === stateAcronym)
  return selectedIndex !== -1 ? estados[selectedIndex] : estados.find(e => e.uf === 'BR') || estados[0]
})

function selectState(estado: string) {
  store.setState(estado)
  const selectedIndex = estados.findIndex(item => item.uf === estado)
  if (selectedIndex !== -1) store.state = estados[selectedIndex].uf
  open.value = false
}
</script>
<template>
  <div class="relative inline-block text-left">
    <div>
      <button @click="open = !open" type="button" class="flex w-full justify-center items-center" aria-expanded="true" aria-haspopup="true">
        <img class="w-6 h-6 mr-2 rounded-full" :src="selected.icone" :alt="selected.nome" />
        {{ selected.nome }}
      </button>
    </div>

    <div :class="{ hidden: !open }" class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
      <div class="h-56 py-2 overflow-y-auto" role="none">
        <template v-for="estado in estados" :key="estado.id">
          <router-link 
            :to="`/${estado.uf.toLowerCase()}`" 
            class="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white" @click="selectState(estado.uf)">
            <img class="w-6 h-6 mr-2 rounded-full" :src="estado.icone" :alt="estado.nome" />{{ estado.nome }}
          </router-link>
        </template>
      </div>
    </div>
  </div>
</template>
