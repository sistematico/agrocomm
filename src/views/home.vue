<script setup>
import BarChart from '@/components/bar-chart.vue'
import Dropdown from '@/components/dropdown.vue'
import { estados } from '@/logic/utils.js'
</script>
<template>
  <div class="p-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-4 py-md-0">
      <h1 class="display-5 fw-bold">AgroComm</h1>
      <p class="col-md-8 fs-4">Commodities Agrícolas</p>
      <Dropdown label="Estado" :items="estados" />
    </div>
  </div>

  <div class="p-4 p-md-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-4 py-md-0">
      <h1 class="display-5 fw-bold">Arroba do Boi</h1>
      <p>
        <bar-chart />
      </p>
      <router-link class="btn btn-primary btn-lg" to="/sobre">Mais Gráficos</router-link>
    </div>
  </div>

  <div class="row align-items-md-stretch">
    <div class="col-md-6">
      <div class="h-100 p-5 text-bg-dark rounded-3">
        <h2>Arroba do Boi</h2>
        <p>Preço da arroba do boi e da vaca</p>
        <router-link class="btn btn-outline-light" to="/arroba-do-boi">Saiba Mais</router-link>
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
