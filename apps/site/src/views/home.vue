<script setup lang="ts">
import Tractor from '@/assets/lottie/tractor.json'
</script>
<template>
<Vue3Lottie :animationData="Tractor" :scale=".75" :no-margin="true" />
</template>
<style scoped>
.lottie-animation-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
}
</style>