<script setup>
import { ref, onMounted } from 'vue'

const campos = ref([])
const props = defineProps({
  columns: { type: Object, required: true },
  items: { type: Array, required: true }
})

onMounted(() => {
  for (const key in props.columns) {
    if (Object.prototype.hasOwnProperty.call(props.columns, key)) {
      campos.value.push({ key })
    }
  }
})
</script>
<template>
  <table class="table">
    <thead>
      <tr>
        <th v-for="column in props.columns">
          {{ column }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item of props.items">
        <td v-for="td of campos">
          {{ item[td.key] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
