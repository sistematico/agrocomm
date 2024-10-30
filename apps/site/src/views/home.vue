<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Quote } from '@/types'

const url = `${import.meta.env.VITE_API_URL}/quotes/boi`
const quotes = ref([] as Quote[])

function insertDecimal(num: number) {
   return (num / 100).toFixed(2)
}

onMounted(async () => {
  const { quotes: data } = await (await fetch(url)).json()
  if (data.length > 0) quotes.value = data
})
</script>
<template>
  <div>
    <h3>Cotações</h3>
    <div class="flex items-center justify-center min-h-[450px]">
      <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
        <div class="overflow-x-auto relative shadow-md sm:rounded-lg">
          <table class="w-full text-left text-gray-200">
            <thead class="uppercase bg-sonokai-black text-gray-300">
              <tr>
                <th scope="col" class="py-3 px-6">Valor</th>
                <th scope="col" class="py-3 px-6">Estado</th>
                <th scope="col" class="py-3 px-6">Cidade</th>
                <th scope="col" class="py-3 px-6">Approved</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b-2 bg-sonokai-bg1 border-sonokai-black" v-for="quote of quotes" :key="quote.id">
                <td class="py-4 px-6">R$ {{ insertDecimal(quote.price) }}</td>
                <td class="py-4 px-6">
                  <div class="flex items-center">
                    <img class="h-4 w-auto me-2" :src="`/images/flags/${quote.state.toLowerCase()}.svg`" :alt="quote.state">
                    {{ quote.state }}
                  </div>
                </td>
                <td class="py-4 px-6">{{ quote.city }}</td>
                <td class="py-4 px-6"></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>