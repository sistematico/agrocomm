<script setup lang="ts">
import { ref, onMounted } from "vue"
import Card from "@/components/card-cotacao.vue";
// import { useRoute } from "vue-router"

const secao = ref("agricultura");

interface Data {
  [key: string]: string | number | Date
}

const data = ref<Data[]>([])
const headers = ref<string[]>([])
// const route = useRoute()

onMounted(async () => {
  // const commodity = route.path.split('/')[1]
  // const estado = route.params.estado

  // if (estado) alert(estado)

  try {
    // const response = await fetch(`${import.meta.env.VITE_API_URL}/${commodity}/${estado}`)
    const response = await fetch(`${import.meta.env.VITE_API_URL}/cotacoes`)
    if (!response.ok) throw new Error('Network response was not ok ' + response.statusText)

    console.log(response)

    const { cotacoes } = await response.json()
    if (cotacoes) {
      data.value = cotacoes
      headers.value = Object.keys(cotacoes[0] || {}) // Atualiza os cabeçalhos com base nos dados recebidos
      
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error)
  }
})
</script>
<template>
  <section class="body-font overflow-hidden">
    <div class="container px-5 py-12 mx-auto">
      <div class="flex flex-col text-center w-full mb-20">
        <h1 class="text-4xl font-large title-font mb-2 text-white">Cotações</h1>
        <div
          class="flex mx-auto border-2 border-indigo-500 rounded overflow-hidden mt-6"
        >
          <button
            class="py-1 px-4 text-white focus:outline-none"
            :class="{ 'bg-indigo-500': secao === 'agricultura' }"
            @click="secao = 'agricultura'"
          >
            Agricultura
          </button>
          <button
            class="py-1 px-4 text-gray-300 focus:outline-none"
            :class="{ 'bg-indigo-500': secao === 'pecuaria' }"
            @click="secao = 'pecuaria'"
          >
            Pecuária
          </button>
        </div>
      </div>
      <div class="flex flex-wrap -m-4">
        <!-- <div class="flex p-4 xl:w-1/4 md:w-1/2 w-full border-2 border-red-600" v-if="secao === 'agricultura'"> -->
        <template v-if="secao === 'agricultura'">
          <Card name="Saca de Soja" />
          <Card name="Saca de Milho" />
          <Card name="Saca de Milho" />
          <Card name="Saca de Milho" />
        </template>
        <template v-else>
          <Card name="Arroba do Boi" />
          <Card name="Arroba da Vaca" />
          <Card name="Arroba da Vaca" />
          <Card name="Arroba da Vaca" />
        </template>
      </div>
    </div>
  </section>
</template>
