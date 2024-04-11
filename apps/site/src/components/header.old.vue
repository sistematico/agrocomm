<script setup lang="ts">
import Navbar from '@/components/navbar.vue'
const appName = import.meta.env.VITE_APP_NAME
</script>
<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div class="container">
        <router-link to="/" class="d-flex align-items-center me-md-auto link-body-emphasis text-decoration-none">
          <img src="/img/navbar.svg" class="bi me-2" width="42" height="42" />
          <span class="fs-4 fw-bold">{{ appName }}</span>
        </router-link>

        <button class="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <Navbar />
        </div>
      </div>
    </nav>
  </header>
</template>