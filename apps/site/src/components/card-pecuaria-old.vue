<template>
  <router-link to="/pecuaria" class="group relative block w-1/2">
    <img
      alt="Pecuaria"
      src="/img/res/pecuaria.webp"
      class="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50 rounded-md"
    />

    <div class="relative p-4 sm:p-6 lg:p-8">
      <p class="text-xl font-bold text-white sm:text-2xl">Pecuaria</p>
      <div class="mt-32 sm:mt-48 lg:mt-64">
        <div
          class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
        >
          <p class="text-sm text-white">
            Cotações da arroba do boi e da vaca.
          </p>
        </div>
      </div>
    </div>
  </router-link>
</template>
