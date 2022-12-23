<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { estados } from '@/logic/utils.js'
import Table from '@/components/table.vue'

const columns = {
  estado: "Estado",
  regiao: "Região",
  avista: "À vista",
  aprazo: "À prazo"
}

const route = useRoute()
// const secao = route.path.slice(1)
const secao = route.path.split('/')[1]

const API_URL = import.meta.env.VITE_API_URL
const cotacao = ref([])
let url = `${API_URL}/arroba-do-boi`

const formatedDate = (str) => {
  const ano = str.slice(0, 4)
  const mes = str.slice(4, 6)
  const dia = str.slice(6, 8)
  return `${dia}/${mes}/${ano}`
}

onMounted(async () => {
  if (route.params.estado && estados.some(e => e.sigla.toLowerCase() === route.params.estado.toLowerCase()))
    url = `${url}/${route.params.estado.toLowerCase().trim()}`
  
  cotacao.value = await (await fetch(url)).json()
})
</script>
<template>
  <div class="p-4 p-md-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-4 py-md-0">
      <h1 class="display-5 fw-bold">Arroba do Boi</h1>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Estado</th>
            <th scope="col">Data</th>
            <th scope="col">Região</th>
            <th scope="col">À vista</th>
            <th scope="col">A prazo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="{ date, estado, regiao, avista, aprazo } in cotacao">
            <td scope="row">{{ estado }}</td>
            <td>{{ formatedDate(date) }}</td>
            <td>{{ regiao }}</td>
            <td>{{ avista }}</td>
            <td>{{ aprazo }}</td>
          </tr>
        </tbody>
      </table> 
    </div>
  </div>
</template>
