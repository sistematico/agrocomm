<script setup lang="ts">
import Header from '@/layouts/header.vue'
import Footer from '@/layouts/footer.vue'
</script>
<template>
  <div class="pb-6 sm:pb-8 lg:pb-12">
    <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
      <Header />
      <main>
        <slot />
      </main>
    </div>
  </div>
  <Footer />
</template>
