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
  const url = `${apiUrl}/quotes/milho`
  quotes.value = await (await fetch(url)).json()
})
</script>
<template>
  <div>
    <h1 class="mt-3">Saca de Milho</h1>
    <p class="lead">Cotação da saca de milho</p>
    <div class="table-responsive">
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
            <td class="d-flex align-items-center">
              <a href="javascript:void(0)" id="first">
                <img width="20" height="20" class="img-fluid me-2" :src="`https://cdn.agrocomm.com.br/images/bandeiras/square-rounded/${quote.state.toLowerCase()}.svg`" :alt="quote.state" /> 
              </a>
              <a href="javascript:void(0)" id="second">
                {{ quote.state }}
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<style scoped>
#first{
  opacity: 1;
  transition: opacity 1s;
}

#first:visited{
  opacity: 0;
}

#first:focus{
  opacity: 0;
}

#second:focus{
  outline:none
}

#second{
  opacity: 0;
  transition: opacity 1s;
}

#first:focus + #second{
  opacity: 1;
}

#first:visited ~ #second{
  opacity: 1;
}  
</style>