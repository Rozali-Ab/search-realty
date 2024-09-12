<script setup>
  import FlatsList from "../components/FlatsList.vue";
  import { useFlatsFilter } from "../composables/useFlatsFilter.js";

  const { filteredFlats } = useFlatsFilter();

</script>

<template>
<FlatsList v-if="filteredFlats" :flats="filteredFlats" />
<div v-else class="no-matches">
  Объявления по вашему запросу не найдены. <br>Попробуйте изменить параметры поиска
</div>
</template>

<style scoped lang="scss">
.no-matches {
  padding: 30px;
  font-size: 1.5rem;
}
</style>
