<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SideBar from '@/components/sidebar.vue'
import type { Quote } from '@/types'

const route = useRoute()
const quotes = ref([] as Quote[])
const title = ref('Cotações')
const subtitle = ref('')

function insertDecimal(num: number) {
   return (num / 100).toFixed(2)
}

const commodities: { [key: string]: string } = {
  boi: 'Arroba do Boi',
  vaca: 'Arroba da Vaca',
  milho: 'Saca de Milho',
  soja: 'Saca de Soja'
};

onMounted(async () => {
  const url = `${import.meta.env.VITE_API_URL}/quotes${route.path}`
  const commodity = commodities[route.path.replace(/\//g, '')]
  
  const data = await (await fetch(url)).json()

  console.log(data, url)

  if (data.length > 0) {
    quotes.value = data
    title.value = `Cotações da ${commodity}`
    subtitle.value = data[0].createdAt
  }
})
</script>
<template>
  <div class="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">    
    <div class="col-span-3">
      <h3>{{ title }}</h3>
      <p class="text-md font-bold">{{ subtitle }}</p>
      <div class="flex items-center justify-center">
        <div class="overflow-x-auto shadow-md sm:rounded-lg w-full">
          <table class="w-full text-left text-gray-200">
            <thead class="uppercase bg-sonokai-black text-gray-300">
              <tr>
                <th scope="col" class="py-2 px-3 md:py-3 md:px-6">Valor</th>
                <th scope="col" class="py-3 px-3 md:py-3 md:px-6">Estado</th>
                <th scope="col" class="py-3 px-3 md:py-3 md:px-6">Cidade</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b-2 bg-sonokai-bg1 border-sonokai-black" v-for="quote of quotes" :key="quote.id">
                <td class="text-sm sm:text-normal py-2 md:py-4 px-3 md:px-6">R$ {{ insertDecimal(quote.price) }}</td>
                <td class="py-2 md:py-4 px-3 md:px-6">
                  <div class="flex items-center text-sm sm:text-normal">
                    <img class="h-4 w-auto me-2" :src="`/images/flags/${quote.state.toLowerCase()}.svg`" :alt="quote.state">
                    {{ quote.state }}
                  </div>
                </td>
                <td class="py-2 md:py-4 px-3 md:px-6">{{ quote.city }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div>
      <side-bar />
    </div>
  </div>
</template>