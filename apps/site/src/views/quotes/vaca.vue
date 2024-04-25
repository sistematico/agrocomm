<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import Table from '@/components/table.vue'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import 'dayjs/locale/pt-br'

dayjs.extend(utc)
dayjs().format()
dayjs.locale('pt-br')

interface Quote {
  id: number
  price: string | number
  createdAt: string
  commodity: string
  city: string
  state: string
}

const apiUrl = import.meta.env.VITE_API_URL
const quotes = ref<Quote[]>([])

function formatCurrency(numero: string | number): string {
  const numeroStr = String(numero)
  return 'R$' + numeroStr.slice(0, -2) + ',' + numeroStr.slice(-2)
}

watchEffect(async () => {
  const url = `${apiUrl}/quotes/boi`
  const data = await (await fetch(url)).json()
  // quotes.value = data.map(({id, commodity, ...keepAttrs}) => keepAttrs)
  quotes.value = data.map(({ 
    id, 
    commodity, 
    createdAt: Data, 
    price: Preco, 
    city: Cidade, 
    state: Estado
  }) => { 
    if (Preco < 1000) Preco = Preco * 15
    return { Data, Preco: formatCurrency(Preco), Cidade, Estado }
  })
})
</script>
<template>
  <div>
    <h1 class="mt-3">Arroba da Vaca</h1>
    <p class="lead">Cotação da arroba da vaca</p>
    <!-- <table class="table table-hover">
      <thead>
        <tr>
          <th scope="col">Data</th>
          <th scope="col">Valor</th>
          <th scope="col">Cidade/Região</th>
          <th scope="col">Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="quote in quotes">
          <th scope="row">{{ dayjs(quote.createdAt).utc().format('DD-MM-YYYY') }}</th>
          <td>{{ formatCurrency(quote.price) }}</td>
          <td>{{ quote.city }}</td>
          <td><img width="20" height="20" class="img-fluid" :src="`https://cdn.agrocomm.com.br/images/bandeiras/square-rounded/${quote.state.toLowerCase()}.svg`" :alt="quote.state" /> {{ quote.state }}</td>
        </tr>
      </tbody>
    </table> -->

    <Table :data="quotes" />
  </div>
</template>