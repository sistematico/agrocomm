<script setup>
import BarChart from '@/components/barchart.vue'
import Carousel from '@/components/carousel.vue'

const images = [
  '/img/bg/dan-meyers-IQVFVH0ajag-unsplash.jpg',
  '/img/bg/adrian-infernus-BN6iQEVN0ZQ-unsplash.jpg',
  '/img/bg/randy-fath-dDc0vuVH_LU-unsplash.jpg'
]
</script>
<template>

  <div class="mb-4">
      <Carousel :images="images" />
  </div>

  <!-- <div class="p-5 mb-4 bg-light border rounded-3">
    <div class="container-fluid py-4 py-md-0">
      <h1 class="display-5 fw-bold">AgroComm</h1>
      <p class="col-md-8 fs-4">Commodities Agrícolas</p>
    </div>
  </div> -->

  <div class="p-4 p-md-5 mb-4 bg-light border rounded-3">
    <div class="container-fluid py-4 py-md-0">
      <h1 class="display-5 fw-bold">Arroba do Boi</h1>
      <bar-chart />
    </div>
  </div>

  <div class="row align-items-md-stretch">
    <div class="col-md-6 mb-4 mb-md-0">
      <div class="h-100 p-5 bg-light border rounded-3">
        <h2>Arroba do Boi</h2>
        <p>Preço da arroba do boi e da vaca</p>
        <router-link class="btn btn-outline-secondary" to="/arroba-do-boi">Saiba Mais</router-link>
      </div>
    </div>

    <div class="col-md-6">
      <div class="h-100 p-5 bg-light border rounded-3">
        <h2>Cotação da Soja</h2>
        <p>Cotação da saca de soja</p>
        <router-link class="btn btn-outline-secondary" to="/soja">Saiba Mais</router-link>
      </div>
    </div>
  </div>
</template>
