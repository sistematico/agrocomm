<script setup>
import { useStorage } from '@/composables/localstorage'

let food = useStorage('food', 'br')
</script>
<template>
  <div class="p-4 p-md-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-4 py-md-0">

      <input type="text" v-model="food">
      <button @click="food = 'RANGO'">
        OK
      </button>

    </div>
  </div>
</template>
