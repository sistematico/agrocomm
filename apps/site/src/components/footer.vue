<script setup lang="ts">
const appName = import.meta.env.VITE_APP_NAME
</script>
<template>
  <footer class="footer mt-auto py-3 bg-body-tertiary">
    <div class="container">
      <span class="text-body-secondary">&copy; {{ new Date().getFullYear() }} - {{ appName }}</span>
    </div>
  </footer>
</template>