<script setup lang="ts">
import Card from '@/components/card-featured.vue'
</script>
<template>
  <div class="row">
    <Suspense>
      <div class="col-md-6 p-3">
        <router-link to="/soja"> 
          <Card 
            title="Soja"
            subtitle="Preço da saca de soja"
            image="https://cdn.agrocomm.com.br/images/banner/plantas-verdes-frescas-crescem-na-natureza-vibrante-gerada-pela-ia.jpg"
          /> 
        </router-link>
      </div>
      <div class="col-md-6 p-3">
        <router-link to="/milho">   
          <Card 
            title="Milho"
            subtitle="Preço da saca de milho"
            image="https://cdn.agrocomm.com.br/images/banner/corn-field-organic-farming-concept.jpg"
          />      
        </router-link>
      </div>
      <div class="col-md-6 p-3">
        <router-link to="/boi">
          <Card 
            title="Boi"
            subtitle="Preço da arroba do boi"
            image="https://cdn.agrocomm.com.br/images/banner/pecuaria4.jpg"
          />
        </router-link>
      </div>
      <div class="col-md-6 p-3">
        <router-link to="/vaca">
          <Card 
            title="Vaca"
            subtitle="Preço da arroba da vaca"
            image="https://cdn.agrocomm.com.br/images/banner/pecuaria.jpg"
          />
        </router-link>
      </div>
      <template #fallback>
        Carregando...
      </template>
    </Suspense>
  </div>
</template>