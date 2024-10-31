<script setup lang="ts">
import Card from '@/components/card.vue'
</script>
<template>
  <div>
    <h3>Cotações</h3>
    <!-- <p class="text-md font-bold">...</p> -->
    <div class="flex justify-center items-center">
      <Card 
        url="/cotacoes"
        label="Milho"
        bg="/images/bg/juliana-e-mariana-amorim-PidIm_k0Un8-unsplash.jpg" 
      />
      <Card 
        url="/cotacoes"
        label="Vaca"
        bg="/images/bg/luca-basili-0vVQWN_D26c-unsplash.jpg" 
      />
      <Card 
        url="/cotacoes"
        label="Cotações"
        bg="/images/bg/dan-meyers-IQVFVH0ajag-unsplash.jpg" 
      />
      <Card 
        url="/cotacoes"
        label="Cotações"
        bg="/images/bg/adrian-infernus-BN6iQEVN0ZQ-unsplash.jpg" 
      />
    </div>
  </div>
</template>