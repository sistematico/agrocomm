<script setup lang="ts">
import Sidebar from '@/components/sidebar.vue'
import json from '@/data/sidebar.json'
</script>
<template>
  <div class="row">
    <div class="col-md-10">
      <h1 class="mt-3">Início</h1>
    </div>
    <div class="col-md-2">

      <Sidebar :json="json" />

      <!-- <li class="list-group-item" v-for="link in links"></li> -->

      <!-- <Sidebar>
        <template #header>Pecuária</template>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">
            <router-link to="/boi">Arroba do Boi</router-link>
          </li>
        </ul>
      </Sidebar> -->
    </div>
  </div>
</template>