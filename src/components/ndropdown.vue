<script setup>
defineProps({
  label: String,
  items: Array
})
</script>
<template>
  <ul class="navbar-nav">
    <li class="nav-item dropdown">
      <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"> {{ label }} </a>
      <ul class="dropdown-menu">
        <li v-for="{ label, link } in items">
          <router-link class="dropdown-item" :to="link">
            {{ label }}
          </router-link>
        </li>
      </ul>
    </li>
  </ul>
</template>
<style scoped>
.dropdown-menu {
	min-width: 1rem !important;
}
</style>
