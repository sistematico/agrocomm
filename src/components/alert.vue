<script setup>
defineProps({
  color: { 
    type: String, 
    default: 'primary' 
  }
})
</script>
<template>
  <div :class="`alert alert-${color} alert-dismissible fade show`" role="alert">
    <strong>
      <slot name="title" />
    </strong> 
    <slot />
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fechar"></button>
  </div>
</template>