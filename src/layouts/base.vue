<script setup>
import { useSlots } from 'vue'
import Header from '@/layouts/partials/header.vue'
import Footer from '@/layouts/partials/footer.vue'

const slots = useSlots()
</script>
<template>
  <main>
    <div class="container py-4">
      <Header />
      <slot name="alert" v-if="slots.alert" />
      <slot />
      <Footer />
    </div>
  </main>
</template>