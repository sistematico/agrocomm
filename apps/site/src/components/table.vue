<script setup lang="ts">
defineProps({
  data: { type: Object, required: true }
})
</script>
<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th scope="col" v-for="(value, key) in data[0]" :key="key">
          {{ key }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td v-for="(value, key) in item" :key="key">
          {{ value }}
        </td>
      </tr>
    </tbody>
  </table>
</template>