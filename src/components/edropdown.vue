<script setup>
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useEstadoStore } from '@/stores/estado'

const router = useRouter()
const { estado } = storeToRefs(useEstadoStore())
const props = defineProps({ items: Object })

function changeRoute(novoEstado) {
  estado.value = novoEstado
  router.go()
}
</script>
<template>
  <ul class="navbar-nav">
    <li class="nav-item dropdown">
      <a class="nav-link" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
        <img class="align-middle" :src="`/img/bandeiras/${estado}.svg`" height="26" :alt="estado" v-if="estado" />
        <img class="align-middle" src="/img/bandeiras/br.svg" height="26" alt="Todos os Estados" v-else />
      </a>
      <ul class="dropdown-menu dropdown-menu-md-end">
        <li v-for="(value, key) in props.items">
          <button class="d-flex align-items-center dropdown-item" @click="changeRoute(key.toLowerCase().trim())">
            <img class="me-2" :src="`/img/bandeiras/${key.toLowerCase()}.svg`" height="26" :alt="value" />
            {{ value }}
          </button>
        </li>
      </ul>
    </li>
  </ul>
</template>
