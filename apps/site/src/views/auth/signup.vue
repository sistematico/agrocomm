<script setup lang="ts">
import { ref } from 'vue'

const apiUrl = import.meta.env.VITE_API_URL
const form = ref({ username: '', email: '', password: '' })
const response = ref(null)

async function send() {
  console.log(form.value)

  response.value = await (await fetch(`${apiUrl}/auth/signup`, {
    method: 'POST',
    body: JSON.stringify(form.value)
  })).json()
}
</script>
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <h1>Cadastro</h1>
        <p v-if="response">{{ response }}</p>
        <form @submit.prevent="send" v-else>
          <div class="mb-3">
            <label for="username" class="form-label">Nome de usuário</label>
            <input v-model="form.username" type="text" class="form-control" id="username" required>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input v-model="form.email" type="email" class="form-control" id="email" aria-describedby="emailHelp" required>
            <div id="emailHelp" class="form-text">Nós nunca compartilhamos seu e-mail com ninguem.</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Senha</label>
            <input v-model="form.password" type="password" class="form-control" id="password" required>
          </div>
          <button type="submit" class="btn btn-primary">Cadastrar</button>
        </form>
      </div>
    </div>
  </div>
</template>