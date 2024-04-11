<template>
  <div class="row">
    <div class="col-md-6 p-3">
      <router-link to="/soja">        
        <div class="card text-bg-dark">
          <img 
            src="https://cdn.agrocomm.com.br/images/banner/plantas-verdes-frescas-crescem-na-natureza-vibrante-gerada-pela-ia.jpg" 
            class="card-img img-fluid" 
            alt="Soja"
            style="width: auto; max-height: 300px;"
          >
          <div class="card-img-overlay">
            <h5 class="card-title">Soja</h5>
            <p class="card-text">Preço da saca de soja</p>
            <!-- <p class="card-text"><small>Last updated 3 mins ago</small></p> -->
          </div>
        </div>
      </router-link>
    </div>
    <div class="col-md-6 p-3">
      <router-link to="/milho">        
        <div class="card text-bg-dark">
          <img 
            src="https://cdn.agrocomm.com.br/images/banner/plantas-verdes-frescas-crescem-na-natureza-vibrante-gerada-pela-ia.jpg" 
            class="card-img img-fluid" 
            alt="Milho"
            style="width: auto; max-height: 300px;"
          >
          <div class="card-img-overlay">
            <h5 class="card-title">Milho</h5>
            <p class="card-text">Preço da saca de milho</p>
            <!-- <p class="card-text"><small>Last updated 3 mins ago</small></p> -->
          </div>
        </div>
      </router-link>
    </div>
    <div class="col-md-6 p-3">
      <router-link to="/boi">
        <div class="card text-bg-dark">
          <img 
            src="https://cdn.agrocomm.com.br/images/banner/pexels-jose-fagundes-10823067.jpg" 
            class="card-img img-fluid" 
            alt="Pecuária" 
            style="width: auto; max-height: 300px;"
          >
          <div class="card-img-overlay">
            <h5 class="card-title">Boi</h5>
            <p class="card-text">Preço da arroba do boi</p>
          </div>
        </div>
      </router-link>
    </div>
    <div class="col-md-6 p-3">
      <router-link to="/vaca">
        <div class="card text-bg-dark ">
          <img 
            src="https://cdn.agrocomm.com.br/images/banner/pexels-jose-fagundes-10823067.jpg" 
            class="card-img img-fluid" 
            alt="Pecuária"
            style="width: auto; max-height: 300px;"
          >
          <div class="card-img-overlay">
            <h5 class="card-title">Vaca</h5>
            <p class="card-text">Preço da arroba da vaca</p>
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>