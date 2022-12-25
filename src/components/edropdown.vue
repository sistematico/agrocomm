<script setup>
defineProps({ items: Object })
</script>
<template>
  <ul class="navbar-nav">
    <li class="nav-item dropdown">
      <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <img class="align-middle" :src="`/assets/img/bandeiras/br.svg`" height="26" alt="Brasil" />
      </a>
      <ul class="dropdown-menu dropdown-menu-md-end">
        <li v-for="(value, key) in items">
          <router-link class="d-flex align-items-center dropdown-item" :to="`/${key.toLowerCase()}`">
            <img class="me-2" :src="`/assets/img/bandeiras/${key.toLowerCase()}.svg`" height="26" :alt="value" />
            {{ value }}
          </router-link>
        </li>
      </ul>
    </li>
  </ul>
</template>
