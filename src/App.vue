<script setup>
  import Title from "./components/Title.vue";
  import Filter from "./components/Filter.vue";

</script>

<template>
  <div class="container">
    <Title />
    <Filter />
    <RouterView />
  </div>
</template>

<style>

</style>
