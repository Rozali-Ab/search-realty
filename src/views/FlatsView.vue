<script setup>
  import FlatsList from "../components/FlatsList.vue";
  import { data } from "../mock/mock.json";
  import { computed, ref, unref, } from "vue";
  import { useFlatsFilter } from "../composables/useFlatsFilter.js";

  const {filterParams} = useFlatsFilter();

  const flats = ref(data);

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
    });
  });

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
