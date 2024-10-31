<script setup lang="ts">
interface Props {
  label?: string
  bg?: string
  url?: string
}

const props = withDefaults(
  defineProps<Props>(), {
    label: '',
    bg: '/images/bg/adrian-infernus-BN6iQEVN0ZQ-unsplash.jpg',
    url: '/cotacoes'
  }
)
</script>
<template>
  <router-link class="max-w-[720px] min-w-[200px] h-[200px] m-5" :to="url"> 
      <div class="relative grid h-[28rem] w-full max-w-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700">
        <div :class="`card-image absolute inset-0 m-0 h-full w-full overflow-hidden bg-transparent bg-[url('${props.bg}')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none`">
          <div class="absolute inset-0 w-full h-full bg-gradient-to-t from-black/80 via-black/50 to-bg-black-10"></div>
        </div>
        <div class="relative md:px-12">
          <h4 class="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-white">{{ label }}</h4>
        </div>
      </div>
  </router-link>
</template>