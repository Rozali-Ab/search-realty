<script setup>
  import Title from "./components/Title.vue";
  import Filter from "./components/Filter.vue";
  import { useStore } from "vuex";

  const store = useStore();
  store.dispatch("init");

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
