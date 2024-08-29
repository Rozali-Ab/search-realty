<script setup>
  import {RouterLink} from "vue-router";
</script>

<template>
  <h3>Page not found</h3>
  <RouterLink
    to="/"
  >Go back </RouterLink>
</template>

<style scoped lang="scss">
  a {
    display: block;
    width: 100px;
    height: 40px;
    background-color: #70D24E;
    color: #fff;
    border-radius: 5px;
    text-align: center;
    align-content: center;
  }
</style>
