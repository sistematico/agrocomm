<script setup>
import BaseLayout from '@/layouts/base.vue'
</script>
<template>
  <base-layout>
    <router-view v-slot="{ Component, route }">
      <transition>
        <div :key="route.name">  
          <component :is="Component"></component>
        </div>
      </transition>
    </router-view>
  </base-layout>
</template>
<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>

