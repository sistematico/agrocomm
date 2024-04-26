<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import BaseLayout from '@/layouts/base.vue'
import { getIp, useFetch, states } from '@/composables'

const route = useRoute()

onMounted(async () => {
  const ip = await getIp()
  const geo = await useFetch(import.meta.env.VITE_API_URL + '/geo/' + ip)
  const urlRedirect = 'https://' + geo.region.toLocaleLowerCase() + '.' + import.meta.env.VITE_APP_URL.replace(/(^\w+:|^)\/\//, '') + route.path

  console.log(urlRedirect)

  if (geo && geo.region) {
    const state = states.find(s => s[geo.region] || null) 
    // const obj = Object(state)
    // const first = Object.keys(obj)[0]

    if (state && import.meta.env.NODE_ENV === 'production') {
      // const urlRedirect = 'https://' + first.toLocaleLowerCase() + '.' + import.meta.env.VITE_APP_URL.replace(/(^\w+:|^)\/\//, '') + route.path
      window.location.href = urlRedirect
    }
  }
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
