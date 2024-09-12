import { computed, reactive, ref } from "vue";
import { DEFAULT_FILTER_PARAMETERS, MULTIPLIER_MILLION_TO_RUBLES } from "../constants/filterParameters.js";
import { data } from "../mock/mock.json";

const flats = ref(data);

export function useFlatsFilter() {

  const filterParams = reactive({
    rooms: DEFAULT_FILTER_PARAMETERS.rooms,
    floorMin: DEFAULT_FILTER_PARAMETERS.floorMin,
    floorMax: DEFAULT_FILTER_PARAMETERS.floorMax,
    areaMin: DEFAULT_FILTER_PARAMETERS.areaMin,
    areaMax: DEFAULT_FILTER_PARAMETERS.areaMax,
    priceMin: DEFAULT_FILTER_PARAMETERS.priceMin,
    priceMax: DEFAULT_FILTER_PARAMETERS.priceMax
  });

  const filteredFlats = computed(() => {
    return  flats.value.filter((flat) => {
      const matchesRooms = !filterParams.rooms.length || filterParams.rooms.includes(flat.rooms.toString());
      const matchesFloor = flat.floor >= filterParams.floorMin && flat.floor <= filterParams.floorMax;
      const matchesArea = flat.area >= filterParams.areaMin && flat.area <= filterParams.areaMax;
      const matchesPrice = flat.price >= filterParams.priceMin * MULTIPLIER_MILLION_TO_RUBLES && flat.price <= filterParams.priceMax * MULTIPLIER_MILLION_TO_RUBLES;

      return matchesRooms && matchesFloor && matchesArea && matchesPrice;
    });
  });

  return { filterParams, filteredFlats};
}
