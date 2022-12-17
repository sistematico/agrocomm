<script setup>
import { ref, onMounted } from 'vue'

const selectedValue = ref('')
const fruits = ref([])

onMounted(() => {
  fruits.value.push({ Id: '', Name: 'Select Fruit' })
  fruits.value.push({ Id: '1', Name: 'Apple' })
  fruits.value.push({ Id: '2', Name: 'Banana' })
  fruits.value.push({ Id: '3', Name: 'Mango' })
  fruits.value.push({ Id: '4', Name: 'Orange' })
  fruits.value.push({ Id: '5', Name: 'Watermelon' })
  selectedValue.value = '3'
})

defineProps({
  label: String,
  items: Array
})
</script>
<template>
  <!-- <div class="dropdown">
    <select v-model="selectedValue">
      <option v-for="fruit in fruits" :key="fruit.Id" :value="fruit.Id">{{ fruit.Name }}</option>
    </select>
  </div> -->

  <div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    Dropdown button
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Action</a></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li><a class="dropdown-item" href="#">Something else here</a></li>
  </ul>
</div>
</template>