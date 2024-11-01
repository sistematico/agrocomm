<script setup lang="ts">
interface Props {
  label?: string
  desc?: string
  bg?: string
  href?: string
}

const props = withDefaults(
  defineProps<Props>(), {
    label: '',
    desc: '',
    bg: '/images/bg/adrian-infernus-BN6iQEVN0ZQ-unsplash.jpg',
    href: '/cotacoes'
  }
)
</script>
<template>
  <router-link :to="href" class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-96 mx-auto">
    <img :src="bg" :alt="label" class="absolute inset-0 h-full w-full object-cover">
    <div class="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/90"></div>
    <h3 class="z-10 mt-3 text-3xl font-bold text-white">{{ label }}</h3>
    <div class="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">{{ desc }}</div>
  </router-link>
</template>