<script setup>
  import FlatsList from "../components/FlatsList.vue";
  import { useRoute } from "vue-router";
  import data from "../mock/mock.json";
  import { ref, watch } from "vue";
  import { FILTER_PARAMETERS } from "../constants/filterParameters.js";

  const route = useRoute();

  const flats = ref(data.data);
  const filteredFlats = ref([]);

  const filterFlats = () => {
    const query = route.query;

    const flatsQuery = query.rooms ? query.rooms.split(',') : [];
    const floorMin = parseInt(query.floorMin) || FILTER_PARAMETERS.FLOOR_MIN;
    const floorMax = parseInt(query.floorMax) || FILTER_PARAMETERS.FLOOR_MAX;
    const areaMin = parseFloat(query.areaMin) || FILTER_PARAMETERS.AREA_MIN;
    const areaMax = parseFloat(query.areaMax) || FILTER_PARAMETERS.AREA_MAX;
    const priceMin = parseFloat(query.priceMin) || FILTER_PARAMETERS.PRICE_MIN;
    const priceMax = parseFloat(query.priceMax) || FILTER_PARAMETERS.PRICE_MAX;

    filteredFlats.value = flats.value.filter((flat) => {
      const matchesRooms = flatsQuery.length === 0 || flatsQuery.includes(flat.rooms.toString());
      const matchesFloor = flat.floor >= floorMin && flat.floor <= floorMax;
      const matchesArea = parseFloat(flat.area) >= areaMin && parseFloat(flat.area) <= areaMax;
      const matchesPrice = flat.price >= priceMin * 1000000 && flat.price <= priceMax * 1000000;

      return matchesRooms && matchesFloor && matchesArea && matchesPrice;
    });
  };

  filterFlats();

  watch(() => route.query, filterFlats, { deep: true });
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
