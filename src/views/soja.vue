<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { estados } from '@/logic/utils.js'

const route = useRoute()
const API_URL = import.meta.env.VITE_API_URL
const cotacao = ref([])
let url = `${API_URL}/soja`

onMounted(async () => {
  if (route.params.estado && estados.some(e => e.sigla.toLowerCase() === route.params.estado.toLowerCase())) {
    url = `${url}/${route.params.estado.toLowerCase().trim()}`
  }
  
  cotacao.value = await (await fetch(url)).json()
})
</script>
<template>
  <div class="p-4 p-md-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-4 py-md-0">
      <h1 class="display-5 fw-bold">Saca de Soja</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Estado</th>
              <th scope="col">Cidade</th>
              <th scope="col">Compra</th>
              <th scope="col">Venda</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{ estado, cidade, compra, venda } in cotacao">
              <td scope="row">{{ estado }}</td>
              <td>{{ cidade }}</td>
              <td>{{ compra }}</td>
              <td>{{ venda }}</td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>
</template>
