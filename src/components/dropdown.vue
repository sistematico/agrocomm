<script setup>
defineProps({
  label: String,
  items: Object
})
</script>
<template>
  <div class="dropdown">
    <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">{{ label }}</button>
    <ul class="dropdown-menu">
      <!-- <li v-for="(value, key, index) in getObj(items)"> -->
      <!-- <li v-for="{ sigla, nome } in items"> -->
      <li v-for="{ sigla, nome } in items">
        <router-link class="dropdown-item" :to="`/${sigla.toLowerCase()}`">
          {{ nome }}
        </router-link>
      </li>
    </ul>
  </div>
</template>
