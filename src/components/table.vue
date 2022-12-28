<template>
  <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead>
        <slot name="header" />
      </thead>
      <tbody>
        <slot />
      </tbody>
    </table>
  </div>
</template>
<style scoped>
.table {
  --bs-table-color: var(--bs-body-color);
  --bs-table-bg: transparent;
  --bs-table-border-color: var(--bs-border-color);
  --bs-table-accent-bg: transparent;
  --bs-table-striped-color: var(--bs-body-color);
  --bs-table-striped-bg: rgba(0, 0, 0, 0.02);
  --bs-table-active-color: var(--bs-body-color);
  --bs-table-active-bg: rgba(0, 0, 0, 0.1);
  --bs-table-hover-color: var(--bs-body-color);
  --bs-table-hover-bg: rgba(0, 0, 0, 0.075);
  width: 100%;
  margin-bottom: 1rem;
  color: var(--bs-table-color);
  vertical-align: middle;
  border-color: var(--bs-table-border-color);
  font-size: 0.7rem;
}

/* Small devices (landscape phones, 576px and up) */
@media (min-width: 576px) {
  .table { font-size: .7rem; }
}

/* Medium devices (tablets, 768px and up) */
@media (min-width: 768px) {
  .table { font-size: .75rem; }
}

/* Large devices (desktops, 992px and up) */
@media (min-width: 992px) {
  .table { font-size: .8rem; }
}

/* X-Large devices (large desktops, 1200px and up) */
@media (min-width: 1200px) {
  .table { font-size: .85rem; }
}

/* XX-Large devices (larger desktops, 1400px and up) */
@media (min-width: 1400px) {
  .table { font-size: .9rem; }
}
</style>
