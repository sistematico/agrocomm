<template>
  <table class="table table-dark table-striped table-hover">
    <thead>
      <!-- <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr> -->
      <slot name="header" />
    </thead>
    <tbody>
      <!-- <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr> -->
      <slot />
    </tbody>
  </table>
</template>