<script setup lang="ts">
import { ref } from 'vue'

const apiUrl = import.meta.env.VITE_API_URL
const form = ref({ email: '', password: '' })
const response = ref(null)

async function send() {
  const url = `${apiUrl}/auth/signup`
  response.value = await (await fetch(url)).json()
}
</script>
<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-4">
        <h1>Cadastro</h1>
        <p v-if="response">{{ response }}</p>
        <form @submit.prevent="send">
          <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email address</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div class="mb-3">
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1">
          </div>
          <div class="mb-3 form-check">
            <input type="checkbox" class="form-check-input" id="exampleCheck1">
            <label class="form-check-label" for="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" class="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>