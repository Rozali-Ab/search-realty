import { createStore } from "vuex";
import { fetchFlats } from "../mock/fetchFlats.js";
import { DEFAULT_FILTER_PARAMETERS, MULTIPLIER_MILLION_TO_RUBLES } from "../constants/filterParameters.js";

export default createStore({
  state: {
    isLoading: true,
    flats: [],
    filterParams: {...DEFAULT_FILTER_PARAMETERS},
    filteredFlats: [],
  },

  mutations: {
    setLoading(state, bool) {
      state.isLoading = bool;
    },
    setFlats(state, flats) {
      state.flats = flats
    },
    setFilterParams(state, params) {
      state.filterParams = { ...params }
    },
    setFilteredFlats(state, flats) {
      state.filteredFlats = flats;
    },
  },
  actions: {
    init({dispatch}) {
      dispatch('fetchData');
    },
    async fetchData({ commit, dispatch }) {
      try {
        commit('setLoading', true);

        const data = await fetchFlats();
        commit('setFlats', data)
      } catch (err) {
        console.log(err);
      } finally {
        dispatch('updateFilterFlats')
        commit('setLoading', false);
      }
    },
    updateFilterFlats({ state, commit }) {
      const filteredFlats = state.flats.filter((flat) => {
        const matchesRooms = !state.filterParams.rooms.length || state.filterParams.rooms.includes(flat.rooms.toString());
        const matchesFloor = flat.floor >= state.filterParams.floorMin && flat.floor <= state.filterParams.floorMax;
        const matchesArea = flat.area >= state.filterParams.areaMin && flat.area <= state.filterParams.areaMax;
        const matchesPrice = flat.price >= state.filterParams.priceMin * MULTIPLIER_MILLION_TO_RUBLES && flat.price <= state.filterParams.priceMax * MULTIPLIER_MILLION_TO_RUBLES;

        return matchesRooms && matchesFloor && matchesArea && matchesPrice;
      });

      commit('setFilteredFlats', filteredFlats);
    },
    updateFilterParams({commit, dispatch}, params) {
      commit('setFilterParams', params);
      dispatch('fetchData');
    }

  },

})
