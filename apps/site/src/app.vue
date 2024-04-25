<script setup lang="ts">
import { onMounted } from 'vue'
import BaseLayout from '@/layouts/base.vue'
import { getIp } from '@/composables/ip'
import { getGeo } from '@/composables/geo'

onMounted(async () => {
  const ip = await getIp()
  const geo = await getGeo(ip)
  alert(geo)
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
