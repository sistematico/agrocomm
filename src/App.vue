<script setup>
import { ref, provide, onMounted } from 'vue'
import BaseLayout from './layouts/base.vue'

provide('agricultura', [
  { label: 'Soja', link: '/soja' },
  { label: 'Milho', link: '/milho' }
])

provide('pecuaria', [
  { label: 'Arroba do Boi', link: '/arroba-do-boi' },
  { label: 'Arroba da Vaca', link: '/arroba-da-vaca' }
])
</script>
<template>
  <base-layout>
    <router-view />
  </base-layout>
</template>
