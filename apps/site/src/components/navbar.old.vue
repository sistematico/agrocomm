<script setup lang="ts">
import Icon from '@/components/icon.vue'
</script>
<template>
  <ul class="navbar-nav mx-auto ms-md-auto py-2 py-md-0 mb-md-0">
    <li class="d-flex align-items-center nav-item">
      <router-link to="/" class="btn btn-primary me-0 me-md-2">
        <Icon name="home" />
        Início
      </router-link>
    </li>
    <li class="d-flex align-items-center nav-item">
      <router-link to="/contato" class="btn btn-primary me-0 me-md-2">
        <Icon name="mail" />
        Contato
      </router-link>
    </li>
  </ul>
</template>