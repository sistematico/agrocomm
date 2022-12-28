<script setup>
import { inject } from 'vue'
import Navbar from '@/layouts/partials/navbar.vue'
const appName = inject('appName')
</script>
<template>
  <header>
    <div class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
      <router-link to="/inicio" class="navbar-brand d-flex align-items-center text-dark text-decoration-none fs-3 fw-bold">
        <picture>
          <source type="image/webp" srcset="/img/navbar.webp">
          <source type="image/png" srcset="/img/navbar.png">
          <img src="/img/navbar.png" :alt="appName" width="60" height="40" class="d-inline-block align-text-top mb-1 me-2" />
        </picture>
        {{ appName }}
      </router-link>
      <Navbar />
    </div>
  </header>
</template>
<style scoped>
.navbar-brand { text-decoration: none !important; }
</style>
