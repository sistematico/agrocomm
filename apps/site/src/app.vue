<script setup lang="ts">
import { Notivue, Notification } from 'notivue'
import BaseLayout from '@/layouts/base.vue'
</script>
<template>
  <BaseLayout>
    <Notivue v-slot="item">
      <Notification :item="item" />
    </Notivue>    
    <RouterView />
  </BaseLayout>
</template>