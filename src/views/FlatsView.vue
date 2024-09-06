<script setup>
  import FlatsList from "../components/FlatsList.vue";
  import { data } from "../mock/mock.json";
  import { onMounted, ref, watch } from "vue";
  import { useFlatsFilter } from "../composables/useFlatsFilter.js";
  import ListSkeleton from "../components/ListSkeleton.vue";

  const {filterParams} = useFlatsFilter();

  const flats = ref([]);
  const filteredFlats = ref([]);
  const isLoading = ref(true);

  const filterFlats = () => {
    setTimeout(() => {
      const rooms = filterParams.rooms;
      const floorMin = filterParams.floorMin;
      const floorMax = filterParams.floorMax;
      const areaMin = filterParams.areaMin;
      const areaMax = filterParams.areaMax;
      const priceMin = filterParams.priceMin;
      const priceMax = filterParams.priceMax;

      filteredFlats.value = flats.value.filter((flat) => {
        const matchesRooms = rooms.length === 0 || rooms.includes(flat.rooms.toString());
        const matchesFloor = flat.floor >= floorMin && flat.floor <= floorMax;
        const matchesArea = flat.area >= areaMin && flat.area <= areaMax;
        const matchesPrice = flat.price >= priceMin * 1000000 && flat.price <= priceMax * 1000000;

        return matchesRooms && matchesFloor && matchesArea && matchesPrice;
      });

      isLoading.value = false;
    }, 500)
  };

  onMounted(() => {
    setTimeout(() => {
      flats.value = data;

      filterFlats();
      isLoading.value = false;
    }, 500);
  });

  watch(
      filterParams,
      () => {
        isLoading.value = true;
        filterFlats();
      },
      { deep: true }
  );
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
