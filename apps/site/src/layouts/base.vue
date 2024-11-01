<script setup lang="ts">
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
</script>
<template>
  <div class="flex flex-col min-h-screen justify-between">
    <Header />
    <main class="mt-20 mb-10">
      <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>
    <Footer />
  </div>
</template>