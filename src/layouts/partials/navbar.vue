<script setup>
import { inject } from 'vue'
import NavbarDropdown from '@/components/navbar-dropdown.vue'

const agricultura = inject('agricultura')
const pecuaria = inject('pecuaria')
</script>
<template>
  <nav class="d-inline-flex mt-2 mt-md-0 ms-md-auto">
    <router-link class="me-3 py-2 text-dark text-decoration-none" to="/">Início</router-link>
    <navbar-dropdown label="Agricultura" :items="agricultura" class="me-3 text-dark text-decoration-none" />
    <navbar-dropdown label="Pecuaria" :items="pecuaria" class="text-dark text-decoration-none" />
  </nav>
</template>