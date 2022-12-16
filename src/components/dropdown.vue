<script setup>
defineProps({
  label: String,
  items: Array
})
</script>
<template>
  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ label }}</button>
    <ul class="dropdown-menu">
      <li v-for="{ label, link } in items">
        <router-link class="dropdown-item" :to="link">
          {{ label }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
