<script setup>
import { inject } from 'vue'

const appName = inject('appName')
</script>
<template>
  <footer class="pt-3 mt-4 text-sm text-muted border-top">&copy; 2022 {{ appName }}</footer>
</template>
