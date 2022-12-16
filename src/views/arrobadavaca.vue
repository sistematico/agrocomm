<script setup>
import { ref, onMounted } from 'vue'

const domain = import.meta.env.VITE_API_URL
const API_URL = `${domain}/arroba-da-vaca`
const cotacao = ref(null)
const loaded = ref(false)

onMounted(async () => {
  cotacao.value = await (await fetch(API_URL)).json()
})
</script>
<template>
  <div class="p-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-5">
      <h1 class="display-5 fw-bold">Arroba da Vaca</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Estado</th>
              <th scope="col">À vista</th>
              <th scope="col">A prazo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{ estado, avista, aprazo } in cotacao">
              <td scope="row">{{ estado }}</td>
              <td>{{ avista }}</td>
              <td>{{ aprazo }}</td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>
</template>
