<script setup>
import { useStorage } from '@/composables/localstorage'
let estado = useStorage('estado', 'br')
defineProps({ items: Object })
</script>
<template>
  <ul class="navbar-nav">
    <li class="nav-item dropdown">
      <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" v-if="estado">
        <img class="align-middle" :src="`/img/bandeiras/${estado}.svg`" height="26" :alt="estado" />
        {{ estado }}
      </a>
      <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false" v-else>
        <img class="align-middle" src="/img/bandeiras/br.svg" height="26" alt="Brasil" />
      </a>
      <ul class="dropdown-menu dropdown-menu-md-end">
        <li v-for="(value, key) in items">
          <button class="d-flex align-items-center dropdown-item" @click="estado = key.toLowerCase().trim()">
            <img class="me-2" :src="`/img/bandeiras/${key.toLowerCase()}.svg`" height="26" :alt="value" />
            {{ value }}
          </button>
        </li>
      </ul>
    </li>
  </ul>
</template>
