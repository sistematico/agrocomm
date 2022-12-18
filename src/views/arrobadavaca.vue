<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { estados } from '@/logic/utils.js'

const route = useRoute()

const API_URL = import.meta.env.VITE_API_URL
let url = `${API_URL}/arroba-da-vaca`
const cotacao = ref(null)

const preco = (valor) => {
  return 'R$ ' + valor.replace(/\./g, ',')
}

function copyURL(event) {
  // const el = event.target.parentElement.previousSibling.innerHTML
  const el = event.target.parentElement.previousSibling.previousSibling
  navigator.clipboard.writeText(el.innerHTML)
  alert("Copied the text: " + el.innerHTML)
}

function logme(event) {
  let valor = event.target.parentElement.previousSibling.innerHTML
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
      <h1 class="display-5 fw-bold">Arroba da Vaca</h1>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Estado</th>
              <th scope="col">Região</th>
              <th scope="col">À vista</th>
              <th scope="col">A prazo</th>
              <th scope="col">Copiar</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{ estado, regiao, avista, aprazo } in cotacao">
              <td scope="row">{{ estado }}</td>
              <td>{{ regiao }}</td>
              <td>{{ preco(avista) }}</td>
              <td>{{ preco(aprazo) }}</td>
              <td>
                <button @click="copyURL($event)">Copiar</button>
              </td>
            </tr>
          </tbody>
        </table>
    </div>
  </div>
</template>
