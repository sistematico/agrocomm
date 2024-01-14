<script setup lang="ts">
defineProps<{
  name: string
  icon: string
  link: string
}>()
</script>
<template>
  <router-link :to="link" class="bg-white hover:bg-gray-100 shadow-lg rounded-lg overflow-hidden w-64 h-64 flex justify-center items-center transition duration-300 ease-in-out">
    <div class="flex flex-col items-center">
      <div class="relative w-full max-w-xs" style="padding-top: 100%">
        <img :src="icon" alt="AgroComm" class="absolute top-0 left-0 w-full h-full object-cover" />
      </div>
      <p class="text-gray-800 text-lg font-semibold">{{ name }}</p>
    </div>
  </router-link>
</template>
