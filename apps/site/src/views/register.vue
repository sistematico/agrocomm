<script setup lang="ts">
import { ref } from 'vue'

interface Response {
  message: string
  ok?: boolean
}

const url = `${import.meta.env.VITE_API_URL}/users/signup`
const response = ref<Response | null>(null)
const form = ref({
  username: '',
  email: '',
  password: '',
  submitted: false,
  loading: false
})

async function register() {
  form.value.loading = true
  form.value.submitted = true
  response.value = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(form.value)
  }).then(res => res.json())
}
</script>
<template>
  <div class="max-h-auto mx-auto max-w-xl">
    <div class="mb-6 space-y-3">
      <p class="text-3xl font-bold">Cadastro</p>
      <p class="text-gray-600" v-if="response">{{ response.message }}</p>
    </div>
    <form class="w-full" @submit.prevent="register">
      <div class="mb-10 space-y-3">
        <div class="mb-5 space-y-1">
          <div class="space-y-2">
            <label class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="username">Usuário</label>
            <input v-model="form.username" class="flex h-10 w-full rounded-md border px-3 py-2 border-none bg-sonokai-black outline-none" id="username" />
          </div>
          <div class="space-y-2">
            <label class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="email">E-mail</label>
            <input v-model="form.email" class="flex h-10 w-full rounded-md border px-3 py-2 border-none bg-sonokai-black outline-none" id="email" name="email" />
          </div>
          <div class="space-y-2">
            <label class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="password">Senha</label>
            <input v-model="form.password" class="flex h-10 w-full rounded-md border px-3 py-2 border-none bg-sonokai-black outline-none" id="password" />
          </div>
        </div>
        <div class="flex space-x-3">
          <button class="block rounded-md bg-sonokai-black px-3 py-2 font-bold text-white hover:bg-black/75 outline-none transition ease-in-out duration-500" type="submit">
            Cadastro
          </button>
          <button class="block rounded-md border-2 border-sonokai-red px-3 py-2 font-bold text-sonokai-red hover:text-white hover:bg-sonokai-red outline-none transition ease-in-out duration-500" type="reset">
            Apagar
          </button>
        </div>
      </div>
    </form>
    <div class="text-center">
      Já tem uma conta? <router-link class="text-sonokai-red" to="/entrar">Entre agora</router-link>
    </div>
  </div>
</template>