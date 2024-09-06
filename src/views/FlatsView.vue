<script setup>
  import FlatsList from "../components/FlatsList.vue";
  import { data } from "../mock/mock.json";
  import { ref, watch } from "vue";
  import { useFlatsFilter } from "../composables/useFlatsFilter.js";

  const {filterParams} = useFlatsFilter();

  const flats = ref(data);
  const filteredFlats = ref([]);

  const filterFlats = () => {

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
  };

  filterFlats();

  watch(
      filterParams,
      () => {
        filterFlats();
      },
      { deep: true }
  );
</script>

<template>
  <FlatsList v-if="filteredFlats.length" :flats="filteredFlats"/>
  <div v-else
    class="no-matches"
  >
    Объявления по вашему запросу не найдены. <br>Попробуйте изменить параметры поиска
  </div>
</template>

<style scoped lang="scss">
  .no-matches {
    padding: 30px;
    font-size: 1.5rem;
  }
</style>
