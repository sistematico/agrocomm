<script setup>
import { ref, watchEffect } from 'vue'
import { convertDate, preco } from '@/logic/utils.js'

const cotacao = ref(null)
const props = defineProps({ title: String, url: String })

watchEffect(async () => {
  console.log(props.url)
  cotacao.value = await (await fetch(props.url)).json()
})
</script>
<template>
  <div class="p-4 p-md-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-4 py-md-0">
      <h1 class="display-5 fw-bold">{{ title }} AGR</h1>
      <table class="table" v-if="cotacao">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Estado</th>
            <th scope="col">Cidade</th>
            <th scope="col">Compra</th>
            <th scope="col">Venda</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="{ estado, cidade, compra, venda } in cotacao">
            <td><img :src="`/assets/img/bandeiras/${estado.toLowerCase()}.svg`" height="30" /></td>
            <td scope="row">{{ estado }}</td>
            <td>{{ cidade }}</td>
            <td>{{ preco(compra) }}</td>
            <td>{{ preco(venda) }}</td>
          </tr>
        </tbody>
      </table>

      <span v-if="cotacao && cotacao[0]">
        Última apuração: {{ convertDate(cotacao[0].date) }}
      </span>
    </div>
  </div>
</template>
