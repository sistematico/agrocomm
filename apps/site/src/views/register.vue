<template>
  <div class="max-h-auto mx-auto max-w-xl">
    <div class="mb-8 space-y-3">
      <p class="text-3xl font-bold">Cadastro</p>
      <!-- <p class="text-gray-600">Enter your email, and we'll send a code to your inbox. <br />No need for passwords   -- like magic!</p> -->
    </div>
    <form class="w-full">
      <div class="mb-10 space-y-3">
        <div class="space-y-1">
          <div class="space-y-2">
            <label class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="username">Usuário</label>
            <input class="flex h-10 w-full rounded-md border px-3 py-2 border-none bg-zinc-800 outline-none" id="username" />
          </div>
          <div class="space-y-2">
            <label class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="email">E-mail</label>
            <input class="flex h-10 w-full rounded-md border px-3 py-2 border-none bg-zinc-800 outline-none" id="email" name="email" />
          </div>
          <div class="space-y-2">
            <label class="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" for="password">Senha</label>
            <input class="flex h-10 w-full rounded-md border px-3 py-2 border-none bg-zinc-800 outline-none" id="password" />
          </div>
        </div>
        <button class="ring-offset-background focus-visible:ring-ring flex h-10 w-full items-center justify-center whitespace-nowrap rounded-md bg-black px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-black/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" type="submit">
          Cadastro
        </button>
      </div>
    </form>
    <div class="text-center">
      Já tem uma conta? <router-link class="text-blue-500" to="/entrar">Entre agora</router-link>
    </div>
  </div>
</template>