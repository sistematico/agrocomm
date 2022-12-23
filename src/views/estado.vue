<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { estados } from '@/logic/utils.js'

const estado = ref(null)
const nome = ref('')
const url = ref('')

const route = useRoute()

onMounted(() => {
  estado.value = Object.keys(estados).some(key => { 
    if (key === route.params.estado.toUpperCase()) {
      console.log({ nome: estado[key], sigla: key })
      return { nome: estado[key], sigla: key } 
    }
  })
  nome.value = estado.value.nome
  url.value = estado.value.sigla.toLowerCase()
})
</script>
<template>
  <div class="p-4 p-md-5 mb-4 bg-light rounded-3">
    <div class="container-fluid py-4 py-md-0">
      <h1 class="display-5 fw-bold">{{ nome }}</h1>
      <p class="col-md-8 fs-4">Cotações de grãos e carnes para o <span class="fs-2 fw-bold">{{ nome }}</span></p>
      <router-link class="btn btn-danger btn me-2" :to="`/arroba-do-boi/${url}`">Arroba do Boi</router-link>
      <router-link class="btn btn-warning btn me-2" :to="`/arroba-da-vaca/${url}`">Arroba da Vaca</router-link>
      <router-link class="btn btn-success btn me-2" :to="`/soja/${url}`">Soja</router-link>
      <router-link class="btn btn-info btn me-2" :to="`/soja/${url}`">Milho</router-link>
      <router-link class="btn btn-primary btn" to="/">Voltar</router-link>
    </div>
  </div>
</template>
