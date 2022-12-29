<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useEstadoStore } from '@/stores/estado'
import Agricultura from '@/views/agricultura.vue'
import Pecuaria from '@/views/pecuaria.vue'

const { estado } = storeToRefs(useEstadoStore())
const route = useRoute()
const title = ref(route.meta.title)
const componenteAtual = ref('Agricultura')
const componentes = { Agricultura, Pecuaria }
const apiBaseUrl = import.meta.env.VITE_API_URL
const url = ref(`${apiBaseUrl}${route.meta.apiurl}`)

watchEffect(async () => {
  // title.value = route.meta.title
  if (estado) {
    url.value = `${apiBaseUrl}/${estado.value}${route.meta.apiurl}`
  } else {
    url.value = `${apiBaseUrl}${route.meta.apiurl}`
  }

  componenteAtual.value = route.meta.tipo
})
</script>
<template>
  <Suspense timeout="0">
    <component :is="componentes[componenteAtual]" :title="title" :url="url" :key="route.name" />
    <template #fallback>
      <p class="placeholder-glow">
        <span class="placeholder col-12 placeholder-lg"></span>
      </p>
    </template>
  </Suspense>
</template>
