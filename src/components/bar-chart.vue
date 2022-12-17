<script setup>
import { ref, inject, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const url = inject('apiUrl')
const loaded = ref(false)
// const estados = ref([])
// const precos = ref([])

const chartData = {
  labels: [],
  datasets: [{
    label: 'Preço da Arroba',
    backgroundColor: '#f87979',
    data: []
  }]
}

const chartOptions = { responsive: true }

onMounted(async () => {
  loaded.value = false

  try {
    const data = await (await fetch(`${url}/arroba-do-boi`)).json()
    const dataFiltered = data.filter(item => parseInt(item.avista) > 50)
    
    const estados = dataFiltered.map(elem => elem.estado)
    const precos = dataFiltered.map(elem => elem.avista)
    
    chartData.labels = estados
    chartData.datasets[0].data = precos
    
    loaded.value = true
  } catch (e) {
    console.error(e)
  }
})
</script>
<template>  
  <Bar v-if="loaded" :options="chartOptions" :data="chartData" />
</template>
