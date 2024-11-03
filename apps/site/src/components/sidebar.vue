<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>
<template>
  <div class="border-4 border-sonokai-black rounded-lg">
    <div class="flex items-center bg-sonokai-bg1 rounded-t-lg h-12 border-b-4 border-sonokai-black">
      <h3 class="text-lg font-bold ml-4">Cotações</h3>
    </div>
    <div class="m-4">
      <ul class="space-y-2">
        <li>
          <router-link :to="{ name: 'Boi' }" :key="route.fullPath">Arroba do Boi</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Vaca' }" :key="route.fullPath">Arroba da Vaca</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Soja' }" :key="route.fullPath">Saca de Soja</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Milho' }" :key="route.fullPath">Saca de Milho</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>