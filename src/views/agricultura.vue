<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import { Tooltip } from 'bootstrap'
import { convertDate, preco, estados } from '@/logic/utils'
import Table from '@/components/table.vue'


const props = defineProps({ title: String, url: String })
const cotacao = ref(null)
cotacao.value = await (await fetch(props.url)).json()

onMounted(async () => {
  new Tooltip(document.body, {
    selector: "[data-bs-toggle='tooltip']"
  })
})
</script>
<template>
  <div class="p-4 p-md-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-4 py-md-0">
      <h1 class="display-5 fw-bold">{{ title }}</h1>
      <Table v-if="cotacao">
        <template #header>
          <tr>
            <th scope="col"></th>
            <th scope="col">Estado</th>
            <th scope="col">Cidade</th>
            <th scope="col">Compra</th>
            <th scope="col">Venda</th>
          </tr>
        </template>
        <tr v-for="{ estado, cidade, compra, venda } in cotacao">
          <td>
            <a href="#" class="d-inline-block" data-bs-toggle="tooltip" title="" :data-bs-original-title="`Preço para ${estados[estado]}(${estado})`">
              <img :src="`/img/bandeiras/${estado.toLowerCase()}.svg`" height="30" :alt="`Preço para ${estado}`" />
            </a>
          </td>
          <td>{{ estados[estado] }}</td>
          <td>{{ cidade }}</td>
          <td>{{ preco(compra) }}</td>
          <td>{{ preco(venda) }}</td>
        </tr>
      </Table>
      <div class="d-flex justify-content-end fs-6" v-if="cotacao && cotacao[0]">
        <span class="badge bg-secondary"> Atualizado {{ convertDate(cotacao[0].date) }} </span>
      </div>
    </div>
  </div>
</template>
