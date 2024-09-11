import { reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { DEFAULT_FILTER_PARAMETERS, FILTER_KEYS } from "../constants/filterParameters.js";

export function useFlatsFilter() {
  const route = useRoute();

  const filterParams = reactive({
    rooms: DEFAULT_FILTER_PARAMETERS.rooms,
    floorMin: DEFAULT_FILTER_PARAMETERS.floorMin,
    floorMax: DEFAULT_FILTER_PARAMETERS.floorMax,
    areaMin: DEFAULT_FILTER_PARAMETERS.areaMin,
    areaMax: DEFAULT_FILTER_PARAMETERS.areaMax,
    priceMin: DEFAULT_FILTER_PARAMETERS.priceMin,
    priceMax: DEFAULT_FILTER_PARAMETERS.priceMax
  });

  const updateFilterParams = (newQuery) => {

    Object.entries(newQuery).reduce((params, [key, value]) => {

      if (key === FILTER_KEYS.ROOMS) {
        params.rooms = !!value.length ? value.split(',') : DEFAULT_FILTER_PARAMETERS[key];
      } else if (Object.keys(filterParams).includes(key)) {
        params[key] = value? Number(value) : DEFAULT_FILTER_PARAMETERS[key];
      }
      return params;
    }, filterParams);
  };



  watch(
    route,
    (newRoute) => {

      if (!Object.keys(newRoute.query).length) {
        updateFilterParams(DEFAULT_FILTER_PARAMETERS);
        return;
      }

      updateFilterParams(newRoute.query);
    },
    { immediate: true, deep: true }
  );

  return { filterParams };
}
