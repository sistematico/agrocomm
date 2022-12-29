<script setup>
import BaseLayout from '@/layouts/base.vue'
import { storeToRefs } from 'pinia'
import { useEstadoStore } from '@/stores/estado'
const { estado } = storeToRefs(useEstadoStore())
</script>
<template>
  <base-layout>
    <template #alert v-if="estado">
      <Alert>
        <template #title>Atenção!</template>
        Este site está em desenvolvimento, suas funções podem se comportar de forma inesperada em alguns momentos.
        <template #footer>Obrigado pela compreensão</template>
      </Alert>
    </template>
    <router-view />
  </base-layout>
</template>