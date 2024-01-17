<script setup lang="ts">
import Icon from "@/components/icon.vue"

export interface Props {
  name?: string
  value?: string
  diff?: 'alta' | 'baixa' | 'igual'
}

const props = withDefaults(defineProps<Props>(), {
  name: 'Cotação',
  value: '32',
  diff: 'igual'
})
</script>
<template>
  <div class="flex p-1 xl:w-1/4 md:w-1/2 w-full">

  <div class="flex items-center p-4 border-2 border-gray-700 rounded w-full">
    <div 
      class="flex flex-shrink-0 items-center justify-center bg-green-200 h-16 w-16 rounded" 
      :class="{ 'bg-green-200': props.diff === 'alta', 'bg-red-200': props.diff === 'baixa', 'bg-yellow-200': props.diff === 'igual', }"
    >
      <!-- w-6 h-6 fill-current text-green-700 -->
      <Icon name="arrow-up" class="w-6 h-6 fill-current text-green-700" v-if="props.diff === 'alta'" />
      <Icon name="arrow-down" class="w-6 h-6 fill-current text-red-700" v-if="props.diff === 'baixa'" />
      <Icon name="equal" class="w-6 h-6 fill-current text-yellow-700" v-if="props.diff === 'igual'" />
    </div>
    <div class="flex-grow flex flex-col ml-4">
      <span class="text-xl font-bold">R$ {{ props.value }}</span>
      <div class="flex items-center justify-between">
        <span class="text-gray-500">{{ props.name }}</span>
        <span class="text-green-500 text-sm font-semibold ml-2">{{ props.diff }}%</span>
      </div>
    </div>
  </div>
  </div>
</template>
