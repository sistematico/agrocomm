<script setup lang="ts">
import { ref, onMounted } from "vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

dayjs.extend(utc);

const API_URL = `${import.meta.env.VITE_API_URL}/boi`;
const cotacao = ref([]);

function formatCurrency(value: string) {
  return "R$ " + [value.slice(0, -2), ",", value.slice(-2)].join("");
}

onMounted(async () => {
  const { cotacoes } = await (await fetch(API_URL)).json();
  console.log(cotacoes);
  cotacao.value = cotacoes
})
</script>
<template>
  <section class="body-font overflow-hidden">
    <div class="container px-5 py-12 mx-auto">
      <div class="flex flex-col text-center w-full mb-20">
        <h1 class="text-4xl font-large title-font mb-1 text-white">Pecuária</h1>
      </div>
      <div class="flex flex-col">
        <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">

            <h3 class="text-2xl font-medium title-font mb-2 text-white">Arroba do Boi</h3>

            <div class="overflow-hidden">
              <table class="min-w-full">
                <thead class="border-b bg-white">
                  <tr>
                    <th scope="col" class="text-sm font-bold text-gray-800 px-6 py-4 text-left">Data</th>
                    <th scope="col" class="text-sm font-bold text-gray-800 px-6 py-4 text-left">Preço</th>
                    <th scope="col" class="text-sm font-bold text-gray-800 px-6 py-4 text-left">Estado</th>
                    <th scope="col" class="text-sm font-bold text-gray-800 px-6 py-4 text-left">Cidade</th>
                  </tr>
                </thead>
                <tbody class="border-b bg-white">
                  <tr class="border-b" v-for="{ data, preco, estado, cidades: { nome: cidade } } in cotacao">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ dayjs.utc(data).format('DD/MM/YYYY') }}</td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ formatCurrency(String(preco)) }}</td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      <img :src="`/img/bandeiras/square-rounded/${String(estado).toLowerCase()}.svg`" class="w-4 h-4 inline-block mr-2" /> 
                      {{ estado }}
                    </td>
                    <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ cidade }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
