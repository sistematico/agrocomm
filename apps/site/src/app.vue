<script setup lang="ts">
import { onMounted } from 'vue'
import BaseLayout from '@/layouts/base.vue'
import { getIp } from '@/composables/ip'
import { useFetch } from '@/composables/fetch'

onMounted(async () => {
  const ip = await getIp()
  const geo = await useFetch(import.meta.env.VITE_API_URL + '/geo/' + ip)
  console.info(JSON.stringify(geo, null, 2))
})
</script>
<template>
  <BaseLayout>
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </BaseLayout> 
</template>
<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
