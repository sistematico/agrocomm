<script setup lang="ts">
import { ref } from 'vue'

const apiUrl = import.meta.env.VITE_API_URL
const form = ref({ identifier: '', password: '' })
const response = ref(null)

async function send() {
  response.value = await (await fetch(`${apiUrl}/auth/signin`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form.value)
  })).json()
}
</script>
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <h1>Entrar</h1>
        <p v-if="response">{{ response }}</p>
        <form @submit.prevent="send" v-else>
          <div class="mb-3">
            <label for="username" class="form-label">Nome de usuário ou E-mail</label>
            <input v-model="form.identifier" type="text" class="form-control" id="username" required>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Senha</label>
            <input v-model="form.password" type="password" class="form-control" id="password" required>
          </div>
          <button type="submit" class="btn btn-primary">Entrar</button>
        </form>
      </div>
    </div>
  </div>
</template>