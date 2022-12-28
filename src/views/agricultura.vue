<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import Table from '@/components/table.vue'
import { convertDate, preco, estados } from '@/logic/utils.js'
import { Tooltip } from 'bootstrap'

const cotacao = ref(null)
const props = defineProps({ title: String, url: String })

onMounted(() => {
  new Tooltip(document.body, {
    selector: "[data-bs-toggle='tooltip']"
  })
})

watchEffect(async () => {
  console.log(props.url)
  cotacao.value = await (await fetch(props.url)).json()
})
</script>
<template>
  <div class="p-4 p-md-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-4 py-md-0">
      <h1 class="display-5 fw-bold">{{ title }}</h1>
      <Table v-if="cotacao">
        <template #header>
          <tr>
            <th scope="col">#</th>
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

      <p class="text-end" v-if="cotacao && cotacao[0]">
        <small class="fw-light text-end">
          Última apuração: {{ convertDate(cotacao[0].date) }}
        </small>
      </p>

    </div>
  </div>
</template>