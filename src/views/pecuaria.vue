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
      <h1 class="display-5 fw-bold">{{ title }} PEC</h1>
      <table class="table" v-if="cotacao">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Estado</th>
            <th scope="col">Regiao</th>
            <th scope="col">A vista</th>
            <th scope="col">A prazo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="{ estado, regiao, avista, aprazo } in cotacao">
            <td><img :src="`/assets/img/bandeiras/${estado.toLowerCase()}.svg`" height="30" /></td>
            <td>{{ estado }}</td>
            <td>{{ regiao }}</td>
            <td>{{ preco(avista) }}</td>
            <td>{{ preco(aprazo) }}</td>
          </tr>
        </tbody>
      </table>

      <span v-if="cotacao && cotacao[0]">
        Última apuração: {{ convertDate(cotacao[0].date) }}
      </span>
    </div>
  </div>
</template>
