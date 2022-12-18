<script setup>
defineProps({
  href: { type: String, default: '#' },
  color: { type: String, default: 'primary' },
  size: { type: String, default: 'sm' }
})
</script>
<template>
  <a :href="href" :class="`btn btn-${color} btn-${size}`">
    <slot name="icon" />
    &nbsp;<slot />
  </a>
</template>
