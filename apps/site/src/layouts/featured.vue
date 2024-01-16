<script setup lang="ts">
import { ref } from "vue";
import Card from "@/components/card-cotacao.vue";

const cotacao = ref('agricultura')
</script>
<template>
  <section class="body-font overflow-hidden">
    <div class="container px-5 py-24 mx-auto">
      <div class="flex flex-col text-center w-full mb-20">
        <h1 class="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
          Cotações
        </h1>
        <p class="lg:w-2/3 mx-auto leading-relaxed text-base">
          Cotações Agropecuárias
        </p>
        <div
          class="flex mx-auto border-2 border-indigo-500 rounded overflow-hidden mt-6"
        >
          <button 
            class="py-1 px-4 text-white focus:outline-none" 
            :class="{ 'bg-indigo-500': cotacao === 'agricultura' }"
            @click="cotacao = 'agricultura'"
          >
            Agricultura
          </button>
          <button 
            class="py-1 px-4 text-gray-300 focus:outline-none" 
            :class="{ 'bg-indigo-500': cotacao === 'pecuaria' }"
            @click="cotacao = 'pecuaria'"
          >
            Pecuária
          </button>
        </div>
      </div>
      <div class="flex flex-wrap -m-4" v-if="cotacao === 'agricultura'">
        AGR
        <Card />
      </div>
      <div class="flex flex-wrap -m-4" v-else>
        PEC
        <Card />
      </div>
    </div>
  </section>
</template>
