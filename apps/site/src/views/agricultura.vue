<script setup lang="ts">
import { ref, onMounted } from "vue";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc)


const API_URL = `http://localhost:4000/boi`
const cotacao = ref([])

function formatCurrency(value: string) {
  return "R$ " + [value.slice(0, -2), ",", value.slice(-2)].join("");
}

onMounted(async () => {
  const { cotacoes } = await (await fetch(API_URL)).json()
  cotacao.value = cotacoes
})
</script>
<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
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
              <tr class="border-b" v-for="{ data, preco, estado, cidade } in cotacao">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ dayjs.utc(data).format('DD/MM/YYYY') }}</td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ formatCurrency(String(preco)) }}</td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ estado }}</td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">{{ cidade }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
