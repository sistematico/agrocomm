<script setup lang="ts">
import { useState } from '@/composables/states'

defineProps({
  data: { type: Object, required: true }
})
</script>
<template>
  <table class="table table-hover" v-if="data">
    <thead>
      <tr>
        <th scope="col" v-for="(_, key) in data[0]" :key="key">
          {{ key }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td v-for="(value, key) in item" :key="key">
        <!-- <td v-for="({ price, createdAt, city, state }, index) in items" :key="key"> -->
          <template v-if="String(key) === 'Preco'">
            <div class="btn-group" role="group" aria-label="Price Group">
              <button type="button" class="btn btn-sm btn-outline-green">R$ </button>
              <button type="button" class="btn btn-sm btn-green">{{ value }}</button>
            </div>
          </template>
          <template v-else-if="String(key) === 'Estado'">
            <div class="btn-group" role="group" aria-label="Price Group">
              <button type="button" class="btn btn-sm">
                <img width="20" height="20" :src="`https://cdn.agrocomm.com.br/images/bandeiras/square-rounded/${value.toLowerCase()}.svg`" :alt="value" /> 
              </button>
              <button type="button" class="btn btn-sm">{{ useState(value) }}</button>
            </div>
          </template>
          <template v-else>
            {{ value }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>
.btn-sm, .btn-group-sm > .btn {
  padding: 0.15rem 0.35rem;
  font-size: 0.80rem;
}

table, tr {
  /* border: 1px solid #B5C18E; */
  border: 1px solid #495057;
}

#first{
  opacity: 1;
  transition: opacity 1s;
}

#first:visited{
  opacity: 0;
}

#first:focus{
  opacity: 0;
}

#second:focus{
  outline:none
}

#second{
  opacity: 0;
  transition: opacity 1s;
}

#first:focus + #second{
  opacity: 1;
}

#first:visited ~ #second{
  opacity: 1;
}  
</style>