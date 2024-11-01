<script setup lang="ts">
import Card from '@/components/card.vue'
</script>
<template>
  <div>
    <h3>Cotações</h3>
    <!-- <p class="text-md font-bold">...</p> -->
    <!-- <div class="flex justify-center items-center"> -->
    <div class="flex flex-wrap justify-between mt-5 gap-5">
      <Card 
        href="/soja"
        label="Soja"
        desc="saca de soja"
        bg="/images/bg/dan-meyers-IQVFVH0ajag-unsplash.jpg" 
      />
      <Card 
        href="/milho"
        label="Milho"
        desc="saca de milho"
        bg="/images/bg/adrian-infernus-BN6iQEVN0ZQ-unsplash.jpg" 
      />
      <Card 
        href="/boi"
        label="Boi"
        desc="arroba do boi"
        bg="/images/bg/juliana-e-mariana-amorim-PidIm_k0Un8-unsplash.jpg" 
      />
      <Card 
        href="/vaca"
        label="Vaca"
        desc="arroba da vaca"
        bg="/images/bg/luca-basili-0vVQWN_D26c-unsplash.jpg" 
      />
    </div>
  </div>
</template>