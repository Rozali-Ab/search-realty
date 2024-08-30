<script setup>
  import FlatsList from "../components/FlatsList.vue";
  import { useRoute } from "vue-router";
  import data from "../mock/mock.json";
  import { ref, watch } from "vue";

  const route = useRoute();

  const flats = ref(data.data);
  const filteredFlats = ref([]);

  const filterFlats = () => {
    const query = route.query;

    const flatsQuery = query.rooms ? query.rooms.split(',') : [];
    const floorMin = parseInt(query.floorMin) || 1;
    const floorMax = parseInt(query.floorMax) || 50;
    const areaMin = parseFloat(query.areaMin) || 1;
    const areaMax = parseFloat(query.areaMax) || 1000;
    const priceMin = parseFloat(query.priceMin) || 1;
    const priceMax = parseFloat(query.priceMax) || 100;

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
