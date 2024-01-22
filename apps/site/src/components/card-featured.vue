<script setup lang="ts">
defineProps<{
  section: string,
  link: string,
  image: string
}>()
</script>
<template>
  <router-link :to="`/${link}`">
    <div class="relative overflow-hidden rounded-lg shadow transition hover:shadow-lg min-w-[220px] md:min-w-[300px]">
      <img
        :alt="section"
        :src="`/img/res/${image}.webp`"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div
        class="relative bg-gradient-to-t from-gray-900/50 to-gray-900/25 pt-32 sm:pt-48 lg:pt-64"
      >
        <div class="p-4 sm:p-6">
          <h2 class="mt-0.5 font-bold text-lg text-white">{{ section }}</h2>
        </div>
      </div>
    </div>
  </router-link>
</template>
