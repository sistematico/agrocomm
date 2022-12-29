<script setup>
import { useSlots } from 'vue'

defineProps({
  title: { type: String, default: null },
  footer: { type: String, default: null },
  color: { type: String, default: 'primary' }
})

const slots = useSlots()
</script>
<template>
  <div :class="`alert alert-${color} alert-dismissible fade show`" role="alert">
    <h4 class="alert-heading" v-if="slots.title">
      <slot name="title" />
    </h4>
    <p>
      <slot />
    </p>
    <hr v-if="slots.footer">
    <p class="mb-0" v-if="slots.footer">
      <slot name="footer" />
    </p>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
  </div>
</template>