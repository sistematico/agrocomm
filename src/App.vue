<script setup>
import { onMounted } from 'vue'
import BaseLayout from './layouts/base.vue'

const images = [
  'dan-meyers-IQVFVH0ajag-unsplash.jpg',
  'adrian-infernus-BN6iQEVN0ZQ-unsplash.jpg',
  'randy-fath-dDc0vuVH_LU-unsplash.jpg'
]

onMounted(() => {
  const image = '/assets/img/bg/' + images[Math.floor(Math.random()*images.length)]
  document.body.style.backgroundImage = `url("${image}")`
})
</script>
<template>
  <base-layout>
    <router-view />
  </base-layout>
</template>
