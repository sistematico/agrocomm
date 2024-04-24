<script setup lang="ts">
import { useState } from '@/composables/states'

defineProps({
  data: { type: Object, required: true }
})
</script>
<template>
  <table class="table table-hover">
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
          <!-- <div class="input-group">
            <div class="input-group-text" id="btnGroupAddon">R$</div>
            <input type="text" class="form-control" placeholder="Input group example" aria-label="Input group example" aria-describedby="btnGroupAddon">
          </div> -->

          <template v-if="String(key) === 'Preco'">
            <div class="btn-group" role="group" aria-label="Price Group">
              <button type="button" class="btn btn-sm btn-outline-green" disabled>R$</button>
              <button type="button" class="btn btn-sm btn-green" disabled>{{ value }}</button>
            </div>
          </template>
          <template v-else-if="String(key) === 'Estado'">
            <div class="btn-group" role="group" aria-label="Price Group">
              <button type="button" class="btn btn-sm btn-outline-green">
                <img width="20" height="20" :src="`https://cdn.agrocomm.com.br/images/bandeiras/square-rounded/${value.toLowerCase()}.svg`" :alt="value" /> 
              </button>
              <button type="button" class="btn btn-sm btn-green">{{ useState(value) }}</button>
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