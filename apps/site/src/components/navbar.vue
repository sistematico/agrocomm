<script setup lang="ts">
import Icon from '@/components/icon.vue'
</script>
<template>
  <!-- <ul class="navbar-nav mx-auto ms-md-auto py-2 py-md-0 mb-md-0">
    <li class="d-flex align-items-center nav-item">
      <router-link to="/" class="btn btn-primary me-0 me-md-2">
        <Icon name="home" />
        Início
      </router-link>
    </li>
    <li class="d-flex align-items-center nav-item">
      <router-link to="/contato" class="btn btn-primary me-0 me-md-2">
        <Icon name="mail" />
        Contato
      </router-link>
    </li>
  </ul> -->

  <ul class="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
    <li>
      <router-link to="/" class="nav-link px-2">
        <Icon name="home" />
        Início
      </router-link>
    </li>
    <li>
      <div>
        <a href="#" class="nav-link btn dropdown-toggle px-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <Icon name="tractor" size="20" />
          Agricultura
        </a>
        <ul class="dropdown-menu">
          <li>
            <router-link to="/cotacoes/milho" class="dropdown-item">Milho</router-link>
          </li>
          <li>
            <router-link to="/cotacoes/soja" class="dropdown-item">Soja</router-link>
          </li>
        </ul>
      </div>
    </li>
    <li>
      <div>
        <a href="#" class="nav-link btn dropdown-toggle px-2" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <Icon name="cow" size="20" />
          Pecuária
        </a>
        <ul class="dropdown-menu">
          <li>
            <router-link to="/cotacoes/boi" class="dropdown-item">Arroba do Boi</router-link>
          </li>
          <li>
            <router-link to="/cotacoes/vaca" class="dropdown-item">Arroba da Vaca</router-link>
          </li>
          <li>
            <router-link to="/cotacoes/leiloes" class="dropdown-item">Leilões</router-link>
          </li>
        </ul>
      </div>
    </li>
    <li>
      <router-link to="/contato" class="nav-link px-2">
        <Icon name="mail" />
        Contato
      </router-link>
    </li>
  </ul>
</template>
<style scoped>
.dropdown-menu {
  min-width: 0;
}

.dropdown-toggle::after {
  display: none;
}

.dropdown-item.active, 
.dropdown-item:active {
  color: black;
  background-color: #B5C18E;
}

a {
  color: #fff;
}
</style>