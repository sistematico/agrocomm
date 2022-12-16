<script setup>
import { inject } from 'vue'
import Navbar from '@/layouts/partials/navbar.vue'
const appName = inject('appName')
</script>
<template>
  <header>
    <div class="d-flex flex-column flex-md-row align-items-center pb-3 mb-4 border-bottom">
      <router-link to="/" class="navbar-brand d-flex align-items-center text-dark text-decoration-none fs-4 fw-bold">
        <img src="/assets/img/navbar.png" :alt="appName" height="40" class="d-inline-block align-text-top me-2" />
        {{ appName }}
      </router-link>
      <Navbar />
    </div>
  </header>
</template>
