<script setup lang="ts">
import { ref } from "vue";
import Card from "@/components/card-cotacao.vue";

const cotacao = ref("agricultura");
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
      <div class="flex flex-wrap -m-4">
        <!-- <div class="flex p-4 xl:w-1/4 md:w-1/2 w-full border-2 border-red-600" v-if="cotacao === 'agricultura'"> -->
        <template v-if="cotacao === 'agricultura'">
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
