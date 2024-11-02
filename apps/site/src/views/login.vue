<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores'

interface Response {
  message: string
  ok?: boolean
}

const router = useRouter()
const authStore = useAuthStore()
const url = `${import.meta.env.VITE_API_URL}/users/signin`


const response = ref<Response | null>(null)
const form = ref({
  identifier: '',
  password: '',
  submitted: false,
  loading: false
})

async function login() {
  form.value.loading = true
  form.value.submitted = true
  
  const { message, user, ok } = await fetch(url, {
    method: 'post',
    body: JSON.stringify(form.value)
  }).then(res => res.json())

  if (ok && user) {
    response.value = message
    authStore.login(user)
    setTimeout(_ => router.push('/'), 10000)
  }
}
</script>
<template>
    <div class="max-h-auto mx-auto max-w-xl">
      <div class="mb-6 space-y-3">
        <p class="text-3xl font-bold">Entrar</p>
        <p class="text-gray-600" v-if="response">{{ response }}</p>
      </div>
      <form @submit.prevent="login">
        <div class="mb-10 space-y-3">
          <div class="mb-5 space-y-1">
            <div class="space-y-2">
              <label class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="username">Usuário ou E-mail</label>
              <input v-model="form.identifier" class="flex h-10 w-full rounded-md border px-3 py-2 border-none bg-sonokai-black outline-none" id="username" />
            </div>
            <div class="space-y-2">
              <label class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="password">Senha</label>
              <input v-model="form.password" class="flex h-10 w-full rounded-md border px-3 py-2 border-none bg-sonokai-black outline-none" id="password" />
            </div>
          </div>
          <button class="block rounded-md bg-sonokai-black px-4 py-3 font-bold text-white hover:bg-black/75 outline-none transition ease-in-out duration-500" type="submit">
            Entrar
          </button>
        </div>
      </form>
      <div class="text-center">
        Ainda não tem uma conta? <router-link class="text-blue-500" to="/cadastro">Crie uma agora</router-link>
      </div>
    </div>
</template>