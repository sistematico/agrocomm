<script setup>
import { onMounted } from 'vue'
import BaseLayout from '@/layouts/base.vue'
import { useStorage } from '@/composables/localstorage'

const apiBaseUrl = import.meta.env.VITE_API_URL
const url = `${apiBaseUrl}/geo`
let estado = useStorage('estado', null)

async function fetchGeo() {
  let { geo: { region } } = await (await fetch(url)).json()
  return region.toLowerCase()
}

onMounted(async () => {
  if (estado.value === 'br' || estado.value === null) {
    estado.value = await fetchGeo()
  }
})
</script>
<template>
  <base-layout>
    <router-view />
  </base-layout>
</template>
