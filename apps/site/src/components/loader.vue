<script setup lang="ts">
import { OrbitSpinner } from 'epic-spinners'
</script>
<template>
  <div class="flex flex-col align-middle justify-center w-full">
    <div class="flex justify-center">
      <orbit-spinner :animation-duration="1200" :size="55" color="#ff1d5e" />
    </div>
    <div class="flex justify-center">
      Carregando dados...
    </div>
  </div>
</template>
