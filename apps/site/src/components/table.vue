<script setup lang="ts">
import { ref, defineProps, PropType } from 'vue'

interface Field {
  [key: string]: string | number | Date
}

defineProps({
  headers: { type: Array as PropType<string[]>, required: true },
  fields: { type: Array as PropType<Field[]>, required: true }
})

const colunasVisiveis = ref(['date', 'price', 'state', 'city']);

const headerTranslations: { [key: string]: string } = {
  id: 'ID',
  date: 'Data',
  price: 'Preço',
  commodityId: 'ID do Produto',
  stateId: 'ID do Estado',
  cityId: 'ID da Cidade',
  commodity: 'Produto',
  state: 'Estado',
  city: 'Cidade'
}

const formatPrice = (price: number): string => {
  return (price / 100).toFixed(2).replace('.', ',')
}

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr)
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()
  return `${day}/${month}/${year}`
}

const formatField = (field: any, header: string) => {
  if (header === 'price' && typeof field === 'number') {
    return formatPrice(field)
    // } else if (header === 'date' && (field instanceof Date || typeof field === 'string')) {
  } else if (header === 'date' && typeof field === 'string') {
    return formatDate(field)
  } else if (header === 'state') {
    return field.acronym
  } else if (header === 'city') {
    return field.name
  }

  return field
}
</script>
<template>
  <div class="overflow-x-auto relative sm:rounded-lg">
    <table class="hidden md:table w-full text-sm text-left text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <template v-for="header in headers" :key="header">
            <th scope="col" class="py-3 px-6" v-if="colunasVisiveis.includes(header)">
              {{ headerTranslations[header] || header }}
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in fields" :key="JSON.stringify(row)" class="bg-gray-700" :class="{ 'bg-gray-800': index % 2 === 0 }">
          <template v-for="header in headers" :key="header" class="py-4 px-6">
            <td v-if="colunasVisiveis.includes(header)" class="py-4 px-6">{{ formatField(row[header], header) }}</td>
          </template>
        </tr>
      </tbody>
    </table>

    <!-- Mobile view -->
    <div class="md:hidden">
      <div v-for="(row, index) in fields" :key="index" class="mb-4 bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <template v-for="header in headers" :key="header">
          <div v-if="colunasVisiveis.includes(header)" class="mb-2">
            <span class="text-gray-700 dark:text-gray-300 font-semibold">{{ headerTranslations[header] || header }}:</span>
            <span class="ml-2 text-gray-500 dark:text-gray-400">{{ formatField(row[header], header) }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
