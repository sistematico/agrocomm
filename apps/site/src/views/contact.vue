<script setup lang="ts">
import { ref } from 'vue'

const apiUrl = import.meta.env.VITE_API_URL
const form = ref({ name: '', email: '', subject: '', text: '' })
const response = ref(null)

async function send() {
  response.value = await (await fetch(`${apiUrl}/mail/send`, { 
    method: 'post',
    body: JSON.stringify(form.value) 
  })).json()
}
</script>
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <h1>Entre em contato</h1>
        <p v-if="response">{{ response }}</p>
        <form @submit.prevent="send" v-else>
          <div class="mb-3">
            <label for="nome" class="form-label">Nome</label>
            <input v-model="form.name" type="text" class="form-control" id="nome" aria-describedby="nomeHelp">
            <div id="nomeHelp" class="form-text">(Opcional)</div>
          </div>
          <div class="mb-3">
            <label for="email" class="form-label">E-mail</label>
            <input v-model="form.email" type="email" class="form-control shadow-none" id="nome" aria-describedby="emailHelp" required>
            <div id="emailHelp" class="form-text">Nós nunca compartilhamos seu e-mail com ninguem.</div>
          </div>
          <div class="mb-3">
            <label for="subject" class="form-label">Assunto</label>
            <input v-model="form.subject" type="text" class="form-control" id="exampleFormControlInput1" required>
          </div>
          <div class="mb-3">
            <label for="text" class="form-label">Mensagem</label>
            <textarea v-model="form.text" class="form-control" id="text" rows="3" required></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Enviar</button>
        </form>
      </div>
    </div>
  </div>
</template>