<script setup>
  import { computed, onBeforeUpdate, onMounted, ref, unref } from "vue";
  import { data } from "../mock/mock.json";
  import { useFlatsFilter } from "../composables/useFlatsFilter.js";
  import ListSkeleton from "../components/ListSkeleton.vue";
  import FlatsList from "../components/FlatsList.vue";

  const {filterParams} = useFlatsFilter();

  const flats = ref([]);
  const isLoading = ref(true);

  const filteredFlats = computed(() => {
    const {
      rooms,
      floorMin,
      floorMax,
      areaMin,
      areaMax,
      priceMin,
      priceMax

    } = unref(filterParams);

    return flats.value.filter((flat) => {
      const matchesRooms = !rooms.length || rooms.includes(flat.rooms.toString());
      const matchesFloor = flat.floor >= floorMin && flat.floor <= floorMax;
      const matchesArea = flat.area >= areaMin && flat.area <= areaMax;
      const matchesPrice = flat.price >= priceMin * 1000000 && flat.price <= priceMax * 1000000;

      return matchesRooms && matchesFloor && matchesArea && matchesPrice;
    })
  });

  onMounted(() => {
    setTimeout(() => {
      flats.value = data;

      isLoading.value = false;
    }, 500);
  });

  onBeforeUpdate(() => {
    isLoading.value = true;

    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  })
</script>

<template>
  <TransitionGroup name="list">

    <ListSkeleton v-if="isLoading" key="skeleton" :length="8"/>
    <FlatsList v-else-if="filteredFlats.length" :flats="filteredFlats" key="list"/>

    <div v-else key="no-match"
      class="no-matches"
    >
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
