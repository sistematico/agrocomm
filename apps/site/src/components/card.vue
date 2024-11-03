<script setup lang="ts">
interface Props {
  name?: string
  desc?: string
  bg?: string
}

const props = withDefaults(
  defineProps<Props>(), {
    name: '',
    desc: '',
    bg: '/images/bg/adrian-infernus-BN6iQEVN0ZQ-unsplash.jpg',
  }
)
</script>
<template>
  <router-link :to="{ name }" class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-96 mx-auto">
    <img :src="bg" :alt="name" class="absolute inset-0 h-full w-full object-cover">
    <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90"></div>
    <h3 class="z-10 mt-3 text-3xl font-bold text-white">{{ name }}</h3>
    <div class="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">{{ desc }}</div>
  </router-link>
</template>