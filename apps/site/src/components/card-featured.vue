<script setup lang="ts">
export interface Props {
  title?: string
  subtitle?: string | null
  image?: string | null
}

withDefaults(defineProps<Props>(), {
  title: '',
  tubtitle: '',
  image: null
})
</script>
<template>
  <div class="card text-bg-dark">
    <img 
      :src="image" 
      class="card-img img-fluid" 
      :alt="title" 
      style="width: auto; max-height: 300px;"
      v-if="image"
    >
    <div class="card-img-overlay">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">{{ subtitle }}</p>
      <!-- <p class="card-text"><small>Last updated 3 mins ago</small></p> -->
    </div>
  </div>
</template>
<style scoped>
.card-img-overlay {
  background-color: rgba(0, 0, 0, 0.45);
}
</style>