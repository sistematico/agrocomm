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
    </div>
  </div>
</template>