<script setup>
import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

// let data = []
const dados = ref({})

let anosArray = []
let mesesArray = []
let diasArray = []
let dateObj = {}

const apiUrl = import.meta.env.VITE_API_URL
const url = `${apiUrl}/arquivo`

const chartData = {
  labels: [],
  datasets: [
    {
      label: 'Preço da Arroba',
      backgroundColor: '#f87979',
      data: []
    }
  ]
}

const chartOptions = { responsive: true }

onMounted(async () => {
  dados.value = await (await fetch(url)).json()

  for (const anos in dados.value) {

    console.log(dados.value[anos])

    dateObj = { ano: anos } 

    for (const meses in anos) {
      dateObj['ano'] = { 'mes': meses }

      for (const dias in meses) {
        dateObj.ano.mes = { 'dia': dias }

        diasArray.push(dateObj)

        // console.log(dateObj)

      }
    }
  }
  
  // chartData.labels = estados
  // chartData.datasets[0].data = precos
})
</script>
<template>
  <!-- <ul>
    <li v-for="(ano, anokey) in dados" :key="anokey">
      {{ anokey }}
      <ul v-for="(mes, meskey) in ano" :key="meskey">
        <li>
          {{ meskey }}
          <ul>
            <li v-for="(dia, diakey) in mes" :key="diakey">
              {{ diakey }}
            </li>
          </ul>
        </li>
      </ul>
    </li>    
  </ul> -->

  <span v-for="{ano} in diasArray" :key="k"> 
    - {{ JSON.stringify(ano) }} <br />
  
    <span v-for="(mes, idx) in ano" :key="idx">
      -- {{ idx }} <br />
    
      <span v-for="(dia, id) in mes" :key="id">
        --- {{ id }} <br /><br />
      </span>
    </span>
  </span>

  <!-- <Bar v-if="loaded" :options="chartOptions" :data="chartData" /> -->
</template>
