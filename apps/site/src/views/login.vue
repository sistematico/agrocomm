<script setup lang="ts">
import { ref, watchEffect } from 'vue'

interface Response {
  message: string
  ok?: boolean
}

const url = `${import.meta.env.VITE_API_URL}/users/signin`

const API_URL = `https://api.github.com/repos/vuejs/core/commits?per_page=3&sha=`
const branches = ['main', 'v2-compat']

const currentBranch = ref(branches[0])
const commits = ref([])

watchEffect(async () => {
  // this effect will run immediately and then
  // re-run whenever currentBranch.value changes
  const url = `${API_URL}${currentBranch.value}`
  commits.value = await (await fetch(url)).json()
})

// function truncate(v) {
//   const newline = v.indexOf('\n')
//   return newline > 0 ? v.slice(0, newline) : v
// }

// function formatDate(v) {
//   return v.replace(/T|Z/g, ' ')
// }


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
  response.value = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(form.value)
  }).then(res => res.json())
}
</script>
<template>
    <div class="max-h-auto mx-auto max-w-xl">
      <div class="mb-8 space-y-3">
        <p class="text-3xl font-bold">Entrar</p>
        <p class="text-gray-600" v-if="response">{{ response }}</p>
      </div>
      <form @submit.prevent="login">
        <div class="mb-10 space-y-3">
          <div class="space-y-1">
            <div class="space-y-2">
              <label class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="username">Usuário ou E-mail</label>
              <input v-model="form.identifier" class="flex h-10 w-full rounded-md border px-3 py-2 border-none bg-zinc-800 outline-none" id="username" />
            </div>
            <div class="space-y-2">
              <label class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="password">Senha</label>
              <input v-model="form.password" class="flex h-10 w-full rounded-md border px-3 py-2 border-none bg-zinc-800 outline-none" id="password" />
            </div>
          </div>
          <button class="ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" type="submit">
            Entrar
          </button>
        </div>
      </form>
      <div class="text-center">
        Ainda não tem uma conta? <router-link class="text-blue-500" to="/cadastro">Crie uma agora</router-link>
      </div>
    </div>
</template>