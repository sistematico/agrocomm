<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <slot name="header" />
      </tr>
    </thead>
    <tbody>
      <slot />
    </tbody>
  </table>
</template>
<style scoped>
.btn-sm, .btn-group-sm > .btn {
  padding: 0.15rem 0.35rem;
  font-size: 0.80rem;
}

table, tr {
  border: 1px solid #495057;
}
</style>