<script setup>
import { ref, watchEffect } from 'vue'

const API_URL = import.meta.env.VITE_API_URL
const branches = ['Arroba do Boi', 'Arroba da Vaca']

const currentBranch = ref(branches[0])
const cotacao = ref(null)
const loaded = ref(false)

watchEffect(async () => {
  loaded.value = false

  const cbranch = formatUrl(currentBranch.value)
  const url = `${API_URL}/${cbranch}`
  
  cotacao.value = await (await fetch(url)).json()
  loaded.value = true
})

function formatUrl(str) {
  return str.replace(/\s+/g, '-').toLowerCase();
}
</script>
<template>
  <div class="p-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-5">
      <h1 class="display-5 fw-bold">{{ currentBranch }}</h1>

        <template v-for="branch in branches">
          <input type="radio"
            :id="branch"
            :value="branch"
            name="branch"
            v-model="currentBranch">
          <label :for="branch">{{ branch }}</label>
        </template>

        <!-- <img v-if="data === null" src="./img/loading.gif" alt="Loading" /> -->
        <!-- <div v-else> -->
        <!-- <div>Here's the data!</div> -->
        <!-- <pre>{{ data.toString() }}</pre> -->
        <!-- </div> -->

        <table class="table" v-if="loaded">
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
        <div v-else>
          Carregando...
        </div>
      <!-- <button class="btn btn-primary btn-lg" type="button">Example button</button> -->
    </div>
  </div>
</template>
