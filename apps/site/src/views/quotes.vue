<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import Table from '@/components/table.vue'
import { type Quote } from '@/types'

const apiUrl = import.meta.env.VITE_API_URL
const quotes = ref<Quote[]>([])

watchEffect(async () => {
  const url = `${apiUrl}/quotes/boi`
  quotes.value = await (await fetch(url)).json() // quotes.value = data.map(({id, commodity, ...keepAttrs}) => keepAttrs)
})
</script>
<template>
  <div>
    <h1 class="mt-3">Arroba da Vaca</h1>
    <p class="lead">Cotação da arroba da vaca</p>
    <Table :data="quotes" />
  </div>
</template>