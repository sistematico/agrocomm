<script setup lang="ts">
import { ref } from 'vue'
import type { State } from '@/types'

const open = ref(false)
const selected = ref({ abbr: 'BR', name: 'Brasil' })

// <select v-model="selected">
//   <option disabled value="">Please select one</option>
//   <option>A</option>
//   <option>B</option>
//   <option>C</option>
// </select>

const states = ref<State[]>([
  { abbr: 'BR', name: 'Brasil' },
  { abbr: 'AC', name: 'Acre' },
  { abbr: 'AL', name: 'Alagoas' },
  { abbr: 'AP', name: 'Amapá' },
  { abbr: 'AM', name: 'Amazonas' },
  { abbr: 'BA', name: 'Bahia' },
  { abbr: 'CE', name: 'Ceará' },
  { abbr: 'DF', name: 'Distrito Federal' },
  { abbr: 'ES', name: 'Espírito Santo' },
  { abbr: 'GO', name: 'Goiás' },
  { abbr: 'MA', name: 'Maranhão' },
  { abbr: 'MT', name: 'Mato Grosso' },
  { abbr: 'MS', name: 'Mato Grosso do Sul' },
  { abbr: 'MG', name: 'Minas Gerais' },
  { abbr: 'PA', name: 'Pará' },
  { abbr: 'PB', name: 'Paraíba' },
  { abbr: 'PR', name: 'Paraná' },
  { abbr: 'PE', name: 'Pernambuco' },
  { abbr: 'PI', name: 'Piauí' },
  { abbr: 'RJ', name: 'Rio de Janeiro' },
  { abbr: 'RN', name: 'Rio Grande do Norte' },
  { abbr: 'RS', name: 'Rio Grande do Sul' },
  { abbr: 'RO', name: 'Rondônia' },
  { abbr: 'RR', name: 'Roraima' },
  { abbr: 'SC', name: 'Santa Catarina' },
  { abbr: 'SP', name: 'São Paulo' },
  { abbr: 'SE', name: 'Sergipe' },
  { abbr: 'TO', name: 'Tocantins' }
])
</script>
<template>
  <div>
    <!-- <label id="listbox-label" class="block text-sm/6 font-medium text-gray-900">Estado</label> -->
    <div class="relative">
      <button @click="open = !open" type="button" class="relative w-full cursor-default rounded-md bg-sonokai-black py-2 pl-3 pr-10 text-left text-white shadow-sm outline-none sm:text-sm/6" aria-haspopup="listbox" aria-expanded="true" aria-labelledby="listbox-label">
        <span class="flex items-center">
          <img :src="`/images/flags/${selected.abbr.toLowerCase()}.svg`" :alt="selected.name" class="h-5 w-5 flex-shrink-0" />
          <span class="ml-3 block truncate">{{ selected.name }}</span>
        </span>
        <span class="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
            <path fill-rule="evenodd" d="M10.53 3.47a.75.75 0 0 0-1.06 0L6.22 6.72a.75.75 0 0 0 1.06 1.06L10 5.06l2.72 2.72a.75.75 0 1 0 1.06-1.06l-3.25-3.25Zm-4.31 9.81 3.25 3.25a.75.75 0 0 0 1.06 0l3.25-3.25a.75.75 0 1 0-1.06-1.06L10 14.94l-2.72-2.72a.75.75 0 0 0-1.06 1.06Z" clip-rule="evenodd" />
          </svg>
        </span>
      </button>
      <!-- Select popover, show/hide based on select state. Entering: "" From: "" To: "" Leaving: "transition ease-in duration-100" From: "opacity-100" To: "opacity-0" -->
      <ul class="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-sonokai-black py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm" :class="{ 'hidden': !open }" tabindex="-1" role="listbox" aria-labelledby="listbox-label" aria-activedescendant="listbox-option-3">
        <!-- Select option, manage highlight styles based on mouseenter/mouseleave and keyboard navigation. Highlighted: "bg-indigo-600 text-white", Not Highlighted: "text-gray-900" -->
        <li class="relative cursor-default select-none py-2 pl-3 pr-9 text-white" id="listbox-option-0" role="option" v-for="state in states" @click="selected = state; open = !open">
          <div class="flex items-center">
            <img :src="`/images/flags/${state.abbr.toLowerCase()}.svg`" :alt="state.abbr" class="h-5 w-5 flex-shrink-0 rounded-full" />
            <span class="ml-3 block truncate" :class="{ 'text-white font-bold': selected.abbr === state.abbr, 'text-sonokai-fg font-normal': selected.abbr !== state.abbr }">{{ state.abbr }}</span>
          </div>
          <span class="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600" v-if="selected.abbr === state.abbr">
            <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon">
              <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
            </svg>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>