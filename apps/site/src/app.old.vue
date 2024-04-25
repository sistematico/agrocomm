<script setup lang="ts">
import BaseLayout from '@/layouts/base.vue'
</script>
<template>
  <BaseLayout>
    <router-view v-slot="{ Component, route }">
      <transition name="fade" mode="out-in">
        <component :is="Component" :key="route.path" />
      </transition>
    </router-view>
  </BaseLayout> 

  <!-- <base-layout>
    <router-view v-slot="{ Component, route }">
      <template v-if="Component">
        <transition name="fade" mode="out-in">
          <keep-alive>
            <suspense>
              <component :is="Component" :key="route.path" />
              <template #fallback>
                Carregando...
              </template>
            </suspense>
          </keep-alive>
        </transition>
      </template>
    </router-view>
  </base-layout> -->
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
