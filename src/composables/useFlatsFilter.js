import { reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { DEFAULT_FILTER_PARAMETERS, FILTER_KEYS } from "../constants/filterParameters.js";

export function useFlatsFilter() {
  const route = useRoute();
  const query = route.query;

  const filterParams = reactive({
    rooms: query.rooms ? query.rooms.split(',') : DEFAULT_FILTER_PARAMETERS.rooms,
    floorMin: query.floorMin ? Number(query.floorMin) : DEFAULT_FILTER_PARAMETERS.floorMin,
    floorMax: query.floorMax ? Number(query.floorMax) : DEFAULT_FILTER_PARAMETERS.floorMax,
    areaMin: query.areaMin ? Number(query.areaMin) : DEFAULT_FILTER_PARAMETERS.areaMin,
    areaMax: query.areaMax ? Number(query.areaMax) : DEFAULT_FILTER_PARAMETERS.areaMax,
    priceMin: query.priceMin ? Number(query.priceMin) : DEFAULT_FILTER_PARAMETERS.priceMin,
    priceMax: query.priceMax ? Number(query.priceMax) : DEFAULT_FILTER_PARAMETERS.priceMax
  });

  const updateFilterParams = (newQuery) => {
    Object.entries(newQuery).reduce((params, [key, value]) => {

      if (key === FILTER_KEYS.ROOMS) {
        params.rooms = value.length !== 0 ? value.split(',') : DEFAULT_FILTER_PARAMETERS[key];
      } else if (Object.keys(filterParams).includes(key)) {
        params[key] = value? Number(value) : DEFAULT_FILTER_PARAMETERS[key];
      }
      return params;
    }, filterParams);
  };



  watch(
    () => route,
    (newRoute) => {

      if (Object.keys(newRoute.query).length === 0) {
        updateFilterParams(DEFAULT_FILTER_PARAMETERS);
      }

      updateFilterParams(newRoute.query);
    },
    { immediate: true, deep: true }
  );

  return { filterParams };
}
