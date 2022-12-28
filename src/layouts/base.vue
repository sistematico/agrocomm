<script setup>
import Header from '@/layouts/partials/header.vue'
import Footer from '@/layouts/partials/footer.vue'
// import Alert from '@/components/alert.vue'
</script>
<template>
  <main>
    <div class="container py-4">
      <Header />
      <!-- <Alert v-if="$route.params.estado">
        {{ $route.params.estado }}
      </Alert> -->
      <slot />
      <Footer />
    </div>
  </main>
</template>