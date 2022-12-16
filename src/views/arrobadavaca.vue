<script setup>
import { ref, onMounted } from 'vue'

const API_URL = import.meta.env.VITE_API_URL
const url = `${API_URL}/arroba-da-vaca`
const cotacao = ref(null)

onMounted(async () => {
  cotacao.value = await (await fetch(url)).json()
})
</script>
<template>
  <div class="p-4 p-md-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-4 py-md-0">
      <h1 class="display-5 fw-bold">Arroba da Vaca</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Estado</th>
              <th scope="col">Região</th>
              <th scope="col">À vista</th>
              <th scope="col">A prazo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{ estado, regiao, avista, aprazo } in cotacao">
              <td scope="row">{{ estado }}</td>
              <td>{{ regiao }}</td>
              <td>{{ avista }}</td>
              <td>{{ aprazo }}</td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>
</template>
