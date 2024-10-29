<template>
  <nav class="bg-dark fixed w-full top-0 z-10 border-b-2 border-[#fff3]">
    <!-- <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8"> -->
    <div class="container mx-auto">
      <div class="relative flex h-16 items-center justify-between">
        <a href="/" class="flex items-center">
          <img class="h-10 w-auto" src="/images/logo.svg" alt={site.title}>
          <span class="mt-1 ml-2 text-white text-3xl font-extrabold">{site.title}</span>
        </a>
        <div class="flex flex-1 items-center justify-end sm:items-stretch sm:justify-end">
          <div class="hidden sm:ml-6 sm:block">
            <div class="flex space-x-4">
              <a href="/" class="font-lato text-lg rounded-md bg-zinc-500 px-3 py-2 text-white hover:text-white">Início</a>
            </div>
          </div>
        </div>
        <div class="absolute inset-y-0 right-0 me-2 flex items-center sm:hidden">
          <!-- Mobile menu button-->
          <button data-mobile-button type="button" class="relative inline-flex items-center justify-center rounded-md p-2 text-monokai-comment hover:bg-monokai-bg hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
            <span class="absolute -inset-0.5"></span>
            <span class="sr-only">Open main menu</span>
            
            <svg data-mobile-closed class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
            
            <svg data-mobile-open class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div data-mobile-menu class="sm:hidden hidden" id="mobile-menu" data-state="close">
      <div class="space-y-1 px-2 pb-3 pt-2">
        <a href="/" class="font-lato text-base block rounded-md bg-monokai-dark px-3 py-2 font-medium text-monokai-comment hover:bg-monokai-bg hover:text-white">Início</a>
      </div>
    </div>
  </nav>
</template>