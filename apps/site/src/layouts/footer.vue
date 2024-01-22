<script setup lang="ts">
import Icon from '@/components/icon.vue'

const appName = import.meta.env.VITE_APP_NAME
const appDesc = import.meta.env.VITE_APP_DESC
</script>
<template>
  <div>
    <footer class="mx-auto max-w-screen-2xl px-4 md:px-8">
      <div class="mb-16 grid grid-cols-2 md:grid-cols-4 gap-12 pt-10 lg:gap-8 lg:pt-12">
        <div class="col-span-full lg:col-span-2">
          <div class="mb-4 lg:-mt-2">
            <router-link to="/" class="inline-flex items-center gap-2 text-xl font-bold text-gray-100 bg-transparent md:text-2xl">
              <img src="/img/navbar.svg" class="mr-3 h-12 sm:h-10" :alt="appName" />
              <span class="text-white">{{ appName }}</span>
            </router-link>
          </div>

          <p class="mb-6 text-gray-400 sm:pr-8">{{ appDesc }}</p>

          <div class="flex gap-4">
            <a href="https://www.facebook.com/agrocommbr" target="_blank" class="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
              <Icon name="facebook" />
            </a>
            <a href="https://twitter.com/agrocommbr" target="_blank" class="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
              <Icon name="x" />
            </a>
          </div>
        </div>
        <div>
          <div class="mb-4 font-bold uppercase tracking-widest text-gray-100">Suporte</div>

          <nav class="flex flex-col gap-4">
            <div>
              <router-link to="/contato" class="text-gray-400 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Contato</router-link>
            </div>
            <div>
              <router-link to="/doc" class="text-gray-400 transition duration-100 hover:text-indigo-500 active:text-indigo-600">Documentação</router-link>
            </div>
            <div>
              <router-link to="/faq" class="text-gray-400 transition duration-100 hover:text-indigo-500 active:text-indigo-600">FAQ</router-link>
            </div>
          </nav>
        </div>
        <div>
          <div class="mb-4 font-bold uppercase tracking-widest text-gray-100">Legal</div>

          <nav class="flex flex-col gap-4">
            <div>
              <router-link to="/termos" class="text-gray-400 transition duration-100 hover:text-indigo-500 active:text-indigo-600"> Termos de Uso </router-link>
            </div>
            <div>
              <router-link to="/privacidade" class="text-gray-400 transition duration-100 hover:text-indigo-500 active:text-indigo-600"> Política de Privacidade </router-link>
            </div>
            <div>
              <router-link to="/cookies" class="text-gray-400 transition duration-100 hover:text-indigo-500 active:text-indigo-600"> Política de Cookies </router-link>
            </div>
          </nav>
        </div>
      </div>
      <div class="border-t border-gray-800 py-8 text-center text-sm text-gray-400">© {{ new Date().getFullYear() }} - {{ appName }}. Todos os direitos reservados.</div>
    </footer>
  </div>
</template>
