<script setup lang="ts">
// import Featured from '@/layouts/featured.vue'
import Agricultura from "@/components/card-agricultura.vue";
import Pecuaria from "@/components/card-pecuaria.vue";
</script>
<template>
  <div class="flex flex-col sm:flex-row items-center justify-center gap-0 md:gap-8">
    <Agricultura />
    <Pecuaria />
  </div>
</template>
