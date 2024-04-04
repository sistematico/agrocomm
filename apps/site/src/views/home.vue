<script setup lang="ts">
import Sidebar from '@/components/sidebar.vue'
import json from '@/data/sidebar.json'
</script>
<template>
  <div class="row">
    <div class="col-md-10">
      <!-- <h1 class="mt-3">Início</h1> -->
      <video id="background-video" autoplay loop muted poster="/img/poster.jpg">
        <source src="/video/2758322-uhd_3840_2160_30fps.mp4" type="video/mp4">
      </video>
    </div>
    <div class="col-md-2">
      <Sidebar :json="json" />
    </div>
  </div>
</template>
<style scoped>
video {
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}
</style>