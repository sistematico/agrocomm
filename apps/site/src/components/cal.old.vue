<script setup lang="ts">
import { ref, Ref, computed, onMounted } from 'vue'
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'

interface Dia {
  dia: string
  dataISO: string
  temCotacao?: boolean
}

const hoje = new Date()
const mesAtual = ref(hoje.getMonth())
const anoAtual = ref(hoje.getFullYear())

const mesAtualNome = computed(() => {
  return format(new Date(anoAtual.value, mesAtual.value), 'MMMM')
})

// const diasDoMes = ref([])
const diasDoMes: Ref<Dia[]> = ref([])

const gerarDiasDoMes = () => {
  const inicioMes = startOfMonth(new Date(anoAtual.value, mesAtual.value))
  const fimMes = endOfMonth(new Date(anoAtual.value, mesAtual.value))
  diasDoMes.value = eachDayOfInterval({ start: inicioMes, end: fimMes }).map(dia => ({
    dia: format(dia, 'd'),
    dataISO: format(dia, 'yyyy-MM-dd'), // Adicionando a data ISO
    temCotacao: false
  }))
}

const retrocederMes = () => {
  if (mesAtual.value === 0) {
    anoAtual.value--
    mesAtual.value = 11
  } else {
    mesAtual.value--
  }
  gerarDiasDoMes()
}

const avançarMes = () => {
  if (mesAtual.value === 11) {
    anoAtual.value++
    mesAtual.value = 0
  } else {
    mesAtual.value++
  }
  gerarDiasDoMes()
}

const selecionarDia = (dia: Dia) => {
  console.log('Dia selecionado:', dia)
}

onMounted(async () => {
  gerarDiasDoMes()

  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/boi/datas-disponiveis/${anoAtual.value}/${mesAtual.value + 1}`);
    if (!response.ok) throw new Error('Falha na resposta do servidor');
    const datasDisponiveis = await response.json()

    for (let dia of diasDoMes.value) {
      if (datasDisponiveis.includes(dia.dataISO)) {
        dia.temCotacao = true
      }
    }
  } catch (error) {
    console.error('Erro ao buscar datas de cotação:', error);
  }
})
</script>
<template>
  <div class="sidebar w-64 border-r border-gray-200">
    <!-- Cabeçalho do Calendário -->
    <div class="flex justify-between items-center p-4 border-b border-gray-200">
      <button @click="retrocederMes" class="p-2">«</button>
      <span>{{ mesAtualNome }} {{ anoAtual }}</span>
      <button @click="avançarMes" class="p-2">»</button>
    </div>

    <!-- Dias do Calendário -->
    <div class="grid grid-cols-7 gap-1 p-4">
      <div class="day" v-for="dia in diasDoMes" :key="dia.dataISO">
        <button class="p-2 rounded-full" :class="{ 'bg-blue-200': dia.temCotacao }" @click="selecionarDia(dia)">
          {{ dia.dia }}
        </button>
      </div>
    </div>
  </div>
</template>
