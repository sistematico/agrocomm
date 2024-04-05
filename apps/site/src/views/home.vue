<script setup lang="ts">
import Sidebar from '@/components/sidebar.vue'
import json from '@/data/sidebar.json'
</script>
<template>
  <div class="row">
    <div class="col-md-10">
      <video id="background-video" autoplay loop muted poster="https://cdn.agrocomm.com.br/images/poster.jpg">
        <source src="https://cdn.agrocomm.com.br/video/2758322-uhd_3840_2160_30fps.mp4" type="video/mp4">
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
  /* box-shadow: 0 0 20px rgba(0, 0, 0, 0.5); */
  /* box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075); */
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);
  /* box-shadow: 0 1rem 3rem rgba(0, 0, 0, .175); */
}
</style>