<script setup>
import { ref, onMounted, watchEffect } from 'vue'
import Table from '@/components/table.vue'
import { convertDate, preco, estados } from '@/logic/utils'
import { Tooltip } from 'bootstrap'

const props = defineProps({ title: String, url: String })
const cotacao = ref(null)
cotacao.value = await (await fetch(props.url)).json()

onMounted(() => {
  new Tooltip(document.body, {
    selector: "[data-bs-toggle='tooltip']"
  })
})

// watchEffect(async () => {
//   cotacao.value = await (await fetch(props.url)).json()
// })
</script>
<template>
  <div class="p-0 p-sm-2 p-md-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-2 py-md-0">
      <h1 class="display-5 fw-bold">{{ title }}</h1>
      <Table v-if="cotacao">
        <template #header>
          <tr>
            <th scope="col"></th>
            <th scope="col">Estado</th>
            <th scope="col">Regiao</th>
            <th scope="col">A vista</th>
            <th scope="col">A prazo</th>
          </tr>
        </template>
        <tr v-for="{ estado, regiao, avista, aprazo } in cotacao">
          <td>
            <a href="#" class="d-inline-block" data-bs-toggle="tooltip" title="" :data-bs-original-title="`Preço para ${estados[estado]}(${estado})`">
              <img :src="`/img/bandeiras/${estado.toLowerCase()}.svg`" height="30" :alt="`Preço para ${estado}`" />
            </a>
          </td>
          <td>
            <span class="d-none d-sm-inline">
              {{ estados[estado] }}
            </span>
            <span class="d-inline d-sm-none">
              {{ estado }}
            </span>
          </td>
          <td>{{ regiao }}</td>
          <td>{{ preco(avista) }}</td>
          <td>{{ preco(aprazo) }}</td>
        </tr>
      </Table>
      <div class="d-flex justify-content-end fs-6" v-if="cotacao && cotacao[0]">
        <span class="badge bg-secondary">
          Atualizado {{ convertDate(cotacao[0].date) }}
        </span>
      </div>
    </div>
  </div>
</template>
