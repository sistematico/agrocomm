<script setup>
import { ref, inject, watch, watchEffect } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const apiUrl = inject('apiUrl')
const cotacoes = ['Arroba do Boi', 'Arroba da Vaca', 'Milho', 'Soja']
const cotacao = ref(cotacoes[0])
const urlCotacao = ref('')

function formatUrl(str) {
  return str.replace(/\s+/g, '-').toLowerCase();
}

const chartData = ref({
  labels: ['January', 'February', 'March'],
  datasets: [{ 
    label: 'Preço da Arroba',
    backgroundColor: '#f87979',
    data: [40, 20, 12] 
  }]
})

const chartOptions = { responsive: true }

watchEffect(async _ => {
      urlCotacao.value = formatUrl(cotacao.value)
      const { avista } = await (await fetch(`${apiUrl}/${urlCotacao.value}`)).json()
      chartData.value.datasets.data = avista
      // cotacao.value = avista
})
</script>
<template>
  <template v-for="cot in cotacoes">
    <input type="radio"
      :id="cot"
      :value="cot"
      name="cot"
      v-model="cotacao"
    >
    <label :for="cot">{{ cot }}</label>
  </template>


  <Bar :options="chartOptions" :data="chartData" v-model="chartData" />
</template>
