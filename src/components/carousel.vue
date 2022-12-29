<script setup>
defineProps({
  images: Array
})
</script>
<template>
  <div id="agroCarousel" class="carousel carousel-fade" data-bs-ride="carousel" data-bs-interval="4000" data-bs-delay='{"show":1000,"hide":1000}'>

    <div class="carousel-caption position-absolute start-0 top-0 d-flex align-items-center justify-content-center align-items-center w-100 h-100">
      <div class="position-absolute start-0 top-0 w-auto ms-3 mt-3">
        <img src="/img/logo.png" width="200" height="200" alt="AgroComm" />
      </div>
    </div>

    <div class="carousel-inner">
      <div class="carousel-item active">
        <img :src="images[0]" class="d-block w-100 rounded-3" alt="AgroComm" />
      </div>
      <div class="carousel-item">
        <img :src="images[1]" class="d-block w-100 rounded-3" alt="AgroComm" />
      </div>
      <div class="carousel-item">
        <img :src="images[2]" class="d-block w-100 rounded-3" alt="AgroComm" />
      </div>
    </div>
  </div>
</template>
<style scoped>
#agroCarousel .carousel-item img {
  object-fit: cover;
  object-position: center;
  height: 50vh;
  overflow: hidden;
}

.carousel-caption { z-index: 10; }

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  #agroCarousel .carousel-item img { height: 35vh; }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  #agroCarousel .carousel-item img { height: 35vh; }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  #agroCarousel .carousel-item img { height: 35vh; }
}

/* X-Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  #agroCarousel .carousel-item img { height: 35vh; }
}

/* XX-Large devices (larger desktops, 1400px and up) */
@media (min-width: 1400px) {
  #agroCarousel .carousel-item img { height: 35vh; }
}
</style>
