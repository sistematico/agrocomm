<script setup lang="ts">
import { ref, watchEffect } from 'vue'

const apiUrl = import.meta.env.VITE_API_URL
const quotes = ref(null)

watchEffect(async () => {
  const url = `${apiUrl}/boi`
  quotes.value = await (await fetch(url)).json()
})
</script>
<template>
  <h1 class="mt-3">Arroba do Boi</h1>
  <ul>
    <li v-for="quote in quotes">
      {{ quote }}
    </li>
  </ul>
</template>