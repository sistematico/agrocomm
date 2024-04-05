<script setup lang="ts">
import Icon from '@/components/icon.vue'
</script>
<template>
  <ul class="navbar-nav ms-auto mb-2 mb-md-0">
    <li class="d-flex align-items-center nav-item">
      <Icon name="home" /><router-link class="ms-2 ms-md-0 nav-link" to="/">Início</router-link>
    </li>
    <li class="d-flex align-items-center nav-item">
      <Icon name="mail" /><router-link class="ms-2 ms-md-0 nav-link" to="/contato">Contato</router-link>
    </li>
  </ul>
</template>