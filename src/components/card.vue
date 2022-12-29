<script setup>
defineProps({
  title: { type: String, default: '', required: true },
  subtitle: { type: String, default: '' },
  body: { type: String, default: '' },
  links: { type: Object, default: { link: 'Link', href: 'https://www.google.com' } }
})
</script>
<template>
  <div class="card" style="width: 18rem">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <h6 class="card-subtitle mb-2 text-muted" v-if="subtitle !== ''">{{ subtitle }}</h6>
      <p class="card-text">{{ body }}</p>
      <template v-for="{link, href} in links" v-if="links">
        <a :href="href" class="card-link">{{ link }}</a>
      </template>
    </div>
  </div>
</template>
