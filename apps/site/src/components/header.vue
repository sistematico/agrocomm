<script setup lang="ts">
import Navbar from '@/components/navbar.vue'
const appName = import.meta.env.VITE_APP_NAME
</script>
<template>
  <!-- <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark"> -->
  <div class="container sticky-top">
    <header class="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2 border-bottom bg-dark">
      <div class="col-md-3 mb-2 mb-md-0">
        <router-link to="/" class="d-flex align-items-center link-body-emphasis text-decoration-none">
          <img src="/img/navbar.svg" class="bi me-2" width="42" height="42" />
          <span class="fs-4 fw-bold">{{ appName }}</span>
        </router-link>
      </div>
      <Navbar />
      <div class="col-md-3 text-end">
        <router-link to="/auth/signin" class="btn btn-outline-primary me-2">Entrar</router-link>
        <router-link to="/auth/signup" class="btn btn-primary">Cadastrar</router-link>
      </div>
    </header>
  </div>
</template>