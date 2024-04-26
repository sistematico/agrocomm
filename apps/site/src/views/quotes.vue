<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { useDay, useCurrency } from '@/composables'
import Table from '@/components/table.vue'
import { type Quote } from '@/types'

const route = useRoute()
const section = route.path.substring(route.path.lastIndexOf('/') + 1)
const apiUrl = import.meta.env.VITE_API_URL
const quotes = ref<Quote[]>([])
const { title, subtitle } = route.meta


watchEffect(async () => {
  const url = `${apiUrl}/quotes/${section}`
  quotes.value = await (await fetch(url)).json()
})
</script>
<template>
  <div>
    <h1 class="mt-3">{{ title }}</h1>
    <p class="lead">{{ subtitle }}</p>
    <Table v-if="quotes.length > 0">
      <template #header>
        <th scope="col">Data</th>
        <th scope="col">Valor</th>
        <th scope="col">Cidade/Região</th>
        <th scope="col">Estado</th>
      </template>
      <tr v-for="quote in quotes">
        <th scope="row">{{ useDay(quote.createdAt) }}</th>
        <td>{{ useCurrency(quote.price) }}</td>
        <td>{{ quote.city }}</td>
        <td>
          <img width="20" height="20" class="img-fluid" :src="`https://cdn.agrocomm.com.br/images/bandeiras/square-rounded/${quote.state.toLowerCase()}.svg`" :alt="quote.state" /> 
          {{ quote.state }}
        </td>
      </tr>
    </Table>
    <p v-else>
      Sem dados.
    </p>
  </div>
</template>