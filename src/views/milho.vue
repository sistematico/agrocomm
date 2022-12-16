<script setup>
import { ref, onMounted } from 'vue'

const API_URL = import.meta.env.VITE_API_URL
const url = `${API_URL}/milho`
const cotacao = ref(null)

onMounted(async () => {
  cotacao.value = await (await fetch(url)).json()
})
</script>
<template>
  <div class="p-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-5">
      <h1 class="display-5 fw-bold">Saca de Milho</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Estado</th>
              <th scope="col">Compra</th>
              <th scope="col">Venda</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{ estado, compra, venda } in cotacao">
              <td scope="row">{{ estado }}</td>
              <td>{{ compra }}</td>
              <td>{{ venda }}</td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>
</template>
