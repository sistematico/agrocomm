<script setup>
import NavbarDropdown from '@/components/ndropdown.vue'
import EstadosDropdown from '@/components/edropdown.vue'
import { estados } from '@/logic/utils.js'

const agricultura = [
  { label: 'Soja', link: '/soja' },
  { label: 'Milho', link: '/milho' }
]

const pecuaria = [
  { label: 'Arroba do Boi', link: '/arroba-do-boi' },
  { label: 'Arroba da Vaca', link: '/arroba-da-vaca' }
]
</script>
<template>
  <nav class="d-inline-flex align-items-center mt-2 mt-md-0 ms-md-auto">
    <router-link class="me-3 py-2 text-dark text-decoration-none" to="/">Início</router-link>
    <navbar-dropdown label="Agricultura" :items="agricultura" class="me-3 text-dark text-decoration-none" />
    <navbar-dropdown label="Pecuaria" :items="pecuaria" class="me-3 text-dark text-decoration-none" />
    <estados-dropdown label="Estados" :items="estados" class="text-dark text-decoration-none" />
  </nav>
</template>