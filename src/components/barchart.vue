<script setup>
import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const API_URL = import.meta.env.VITE_API_URL
let url = `${API_URL}/arquivo`

const anos = ref([])
const meses = ref([])
const dias = ref([])

const loaded = ref(false)

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
  // const assignDepth = (obj, depth = 0, index = 0) => {
  //   const length = Object.keys(obj).length
  //   const keys = Object.entries(obj)

  //   for (const k in obj) {
  //     console.log(k)
  //   }

  //   if (index < length) {
  //     console.log('OK')

  //     obj[index].depth = depth
      

  //     if (obj[index].children.length) {
  //       return assignDepth(obj[index].children, depth + 1, 0)
  //     }
  //     return assignDepth(obj, depth, index + 1)
  //   }
  //   return
  // }

  loaded.value = false

  try {
    const data = await (await fetch(url)).json()

    // const anos = Object.keys(data)

    // const dataFiltered = data.filter(item => parseInt(item.avista) > 50)

    // const estados = dataFiltered.map(elem => elem.estado)
    // const precos = dataFiltered.map(elem => elem.avista)

    // chartData.labels = estados
    // chartData.datasets[0].data = precos

    for (const ano in data) {
      // const a = data[item]
      // anos.value.push({ ano: item })

      for (const mes in data[ano]) {
        // const m = a[mes]
        // meses.value.push({ mes })

        for (const dia in data[ano][mes]) {
          // const d = m[dia]
          dias.value.push({ dia, mes, ano })
        }
      }
    }

    // Object.assign({}, { depth: 0 }, data)

    // const newData = assignDepth(data)
    assignDepth(data)
    console.log(JSON.stringify(data, undefined, 4))

    // traverse_it(data)

    // Object.keys(data).forEach((item, index) => {
    //   const key = dados[index]

    //   dados.push({ ano: item, mes: data[index] })
    //   console.log(dados)

    // })

    // const meses = Object.assign({}, data, { a: 1, b: 2 })

    // chartData.labels = estados
    // chartData.datasets[0].data = precos

    // console.log(dados)

    loaded.value = true
  } catch (e) {
    console.error(e)
  }
})
</script>
<template>
  <ul>
    <li v-for="dd in dias">{{ dd.dia }}</li>
  </ul>
  <!-- <Bar v-if="loaded" :options="chartOptions" :data="chartData" /> -->
</template>
