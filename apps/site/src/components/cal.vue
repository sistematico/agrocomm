<script setup lang="ts">
import { ref, Ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const router = useRouter()

interface Dia {
  dia: string
  dataISO: string
  temCotacao?: boolean
}

const hoje = new Date()
const mesAtual = ref(hoje.getMonth())
const anoAtual = ref(hoje.getFullYear())

const mesAtualNome = computed(() => {
  const nomeMes = format(new Date(anoAtual.value, mesAtual.value), 'MMMM', { locale: ptBR })
  return nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1) // Primeira letra em maiúscula
})

const formatarDia = (diaString: string): string => {
  const dia = parseInt(diaString, 10)
  return dia < 10 ? '0' + diaString : diaString
}

const diasDoMes: Ref<Dia[]> = ref([])

const buscarCotacoesParaOMes = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/boi/datas-disponiveis/${anoAtual.value}/${mesAtual.value + 1}`)
    if (!response.ok) throw new Error('Falha na resposta do servidor')
    const datasDisponiveis = await response.json()

    diasDoMes.value = diasDoMes.value.map(dia => ({ ...dia, temCotacao: datasDisponiveis.includes(dia.dataISO) }))
  } catch (error) {
    console.error('Erro ao buscar datas de cotação:', error)
  }
}

const gerarDiasDoMes = async () => {
  const inicioMes = startOfMonth(new Date(anoAtual.value, mesAtual.value))
  const fimMes = endOfMonth(new Date(anoAtual.value, mesAtual.value))
  diasDoMes.value = eachDayOfInterval({ start: inicioMes, end: fimMes }).map(dia => ({
    dia: formatarDia(format(dia, 'd')),
    dataISO: format(dia, 'yyyy-MM-dd'),
    temCotacao: false // Inicialmente marcado como falso
  }))

  // Após gerar os dias do mês, busca as cotações
  await buscarCotacoesParaOMes()
}

const retrocederMes = async () => {
  if (mesAtual.value === 0) {
    anoAtual.value--
    mesAtual.value = 11
  } else {
    mesAtual.value--
  }
  await gerarDiasDoMes()
}

const avançarMes = async () => {
  if (mesAtual.value === 11) {
    anoAtual.value++
    mesAtual.value = 0
  } else {
    mesAtual.value++
  }
  await gerarDiasDoMes()
}

const selecionarDia = (dia: Dia) => {
  // Construir a string de query com a data formatada
  // const dataQuery = `?data=${dia.dataISO}`

  // Usar o router para navegar para a nova URL com a query string
  // router.push({ path: '/nomedoendpoint', query: { data: dia.dataISO } })
  router.push({ query: { data: dia.dataISO } })
}

onMounted(gerarDiasDoMes)
</script>
<template>
  <!-- <div class="sidebar w-64 border-r border-gray-200"> -->
  <div>
    <div class="flex justify-between items-center p-4 border-b border-gray-200">
      <button @click="retrocederMes" class="p-2">«</button>
      <span>{{ mesAtualNome }} {{ anoAtual }}</span>
      <button @click="avançarMes" class="p-2">»</button>
    </div>
    <div class="grid grid-cols-7 gap-1 p-4">
      <div class="day" v-for="dia in diasDoMes" :key="dia.dataISO">
        <button class="p-1 rounded" :class="{ 'bg-blue-200': dia.temCotacao }" @click="dia.temCotacao ? selecionarDia(dia) : null">
          {{ dia.dia }}
        </button>
      </div>
    </div>
  </div>
</template>
