<script setup>
  import data from "../mock/mock.json";
  import FlatsList from "../components/FlatsList.vue";
  import { ref } from "vue";

  const flats = ref(data.data);
</script>

<template>
  <FlatsList :flats="flats"/>
</template>

<style scoped lang="scss">

</style>
