<script setup lang="ts">
import Header from '@/components/header.vue'
import Footer from '@/components/footer.vue'
</script>
<template>
  <div class="flex flex-col h-screen">
    <Header />
      <main class="flex-1 overflow-y-auto">
        <div class="h-full px-5">
          <div class="container mx-auto pt-20 pb-20">
            <slot />
          </div>
        </div>
    </main>
    <Footer />
  </div>
</template>