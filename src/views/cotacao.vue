<script setup>
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import Agricultura from '@/views/agricultura.vue'
import Pecuaria from '@/views/pecuaria.vue'

const route = useRoute()
const title = ref(route.meta.title)
const componenteAtual = ref('Agricultura')
const componentes = { Agricultura, Pecuaria }
const apiBaseUrl = import.meta.env.VITE_API_URL
const url = ref(`${apiBaseUrl}${route.meta.apiurl}`)

watchEffect(async () => {
  title.value = route.meta.title
  url.value = `${apiBaseUrl}${route.meta.apiurl}`
  componenteAtual.value = route.meta.tipo
})
</script>
<template>
	<!-- <component :is="componentes[componenteAtual]" :title="route.meta.title" :url="`${apiBaseUrl}${route.meta.apiurl}`" :key="route" /> -->
	<!-- <component :is="componentes[componenteAtual]" /> -->
	<component :is="componentes[componenteAtual]" :title="title" :url="url" :key="route.name" />
</template>
