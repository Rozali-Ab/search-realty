<script setup>
  import FlatsList from "../components/FlatsList.vue";
  import ListSkeleton from "../components/ListSkeleton.vue";

  import { computed } from "vue";
  import { useStore } from "vuex";

  const store = useStore();

  const filteredFlats = computed(() => store.state.filteredFlats);
  const isLoading = computed(() => store.state.isLoading)

</script>

<template>
<TransitionGroup name="list" >

  <ListSkeleton v-if="isLoading" key="skeleton" :length="4"/>

  <FlatsList v-else-if="filteredFlats.length" :flats="filteredFlats" />

  <div v-else class="no-matches">
    Объявления по вашему запросу не найдены. <br>Попробуйте изменить параметры поиска
  </div>
</TransitionGroup>
</template>

<style scoped lang="scss">
.no-matches {
  padding: 30px;
  font-size: 1.5rem;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
}
</style>
