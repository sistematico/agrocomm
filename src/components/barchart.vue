<script setup>
import { ref, onMounted } from 'vue'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'
import { Line } from 'vue-chartjs'
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const apiUrl = import.meta.env.VITE_API_URL
const url = `${apiUrl}/ultimas`
const loaded = ref(false)

const chartData = {
  labels: [],
  datasets: [
    {
      label: 'Preço da Arroba',
      backgroundColor: '#f87979',
      borderColor: '#f87979',
      pointBorderWidth: 5,
      data: []
    }
  ]
}

const chartOptions = { responsive: true }

onMounted(async () => {
  let cotacoes = []
  const [ { meses: [ { dias } ] } ] = await (await fetch(url)).json()
  
  for (const dia in dias) {
    chartData.labels.push(dias[dia].name)
    const [ cot ] = dias[dia].children[0].data
    cotacoes.push(cot)
  }

  chartData.datasets[0].data = cotacoes.map(item => item.avista)

  loaded.value = true
})
</script>
<template>
  <Line v-if="loaded" :options="chartOptions" :data="chartData" />
</template>
