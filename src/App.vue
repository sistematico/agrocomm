<script setup>
import { ref, provide, onMounted } from 'vue'
import BaseLayout from './layouts/base.vue'
// import { useGeo } from './composables/geo.js'
// const { data } = useGeo()

const position = ref('')

provide('agricultura', [
  { label: 'Soja', link: '/soja' },
  { label: 'Milho', link: '/milho' }
])

provide('pecuaria', [
  { label: 'Arroba do Boi', link: '/arroba-do-boi' },
  { label: 'Arroba da Vaca', link: '/arroba-da-vaca' }
])

onMounted(() => {
  const getLocation = async (lat, lon) => {
    try {
      let { address } = await (await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`)).json()
      console.log(address.state)
      return address.state
    } catch (error) {
      console.log(error.message)
    }
  }

  const success = async (position) => {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    position.value = getLocation(latitude, longitude)
  }
  const error = (err) => { console.log(error) }

  navigator.geolocation.getCurrentPosition(success, error)
})
</script>
<template>
  <base-layout>
    <router-view />
  </base-layout>
</template>
