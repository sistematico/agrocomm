<script setup lang="ts">
import { ref, watchEffect } from 'vue'
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
  quotes.value = await (await fetch(url)).json()
})
</script>
<template>
  <div>
    <h1 class="mt-3">Arroba do Boi</h1>
    <p class="lead">Cotação da arroba do boi</p>
    <table class="table table-hover">
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
    </table>
  </div>
</template>