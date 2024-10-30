<script setup lang="ts">
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
</script>
<template>
  <div class="flex flex-col h-screen">
    <Header />
      <main class="flex-1 overflow-y-auto py-20">
        <div class="h-full px-5">
          <div class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
            <slot />
          </div>
        </div>
    </main>
    <Footer />
  </div>
</template>