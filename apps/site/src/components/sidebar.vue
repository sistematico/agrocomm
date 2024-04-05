<script setup lang="ts">
defineProps({
  json: { type: Object, required: true }
})
</script>
<template>
  <div class="card mt-2 mt-md-0 mb-2" v-for="item in json">
    <div class="card-header fs-4">{{ item.title }}</div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item" v-for="link in item.links">
        <router-link :to="link.url">{{ link.name }}</router-link>
      </li>
    </ul>
  </div>
</template>