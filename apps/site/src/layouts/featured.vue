<script setup lang="ts">
import Card from "@/components/card-cotacao.vue";
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
          <button class="py-1 px-4 bg-indigo-500 text-white focus:outline-none">
            Monthly
          </button>
          <button class="py-1 px-4 text-gray-300 focus:outline-none">
            Annually
          </button>
        </div>
      </div>
      <div class="flex flex-wrap -m-4">
        <Card />
      </div>
    </div>
  </section>
</template>
