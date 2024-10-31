<script setup lang="ts">
import BaseLayout from '@/layouts/base.vue'

var host = window.location.host
var subdomain = host.split('.')[0]

console.log('host:', host)
console.log('subdomain:', subdomain)
</script>
<template>
  <BaseLayout>
    <RouterView />
  </BaseLayout>
</template>