<script setup>
  import { ref, watch } from 'vue';

  import RangeSlider from "./RangeSlider.vue";
  import RoomsCheckbox from "./RoomsCheckbox.vue";

  import { useFlatsFilter } from "../composables/useFlatsFilter.js";
  import router from "../router/index.js";
  import { DEFAULT_FILTER_PARAMETERS } from "../constants/filterParameters.js";

  const isFilterVisible = ref(false);

  const {filterParams} = useFlatsFilter();

  const rooms = ref(filterParams.rooms);
  const floorMin = ref(filterParams.floorMin);
  const floorMax = ref(filterParams.floorMax)
  const areaMin = ref(filterParams.areaMin);
  const areaMax = ref(filterParams.areaMax);
  const priceMin = ref(filterParams.priceMin);
  const priceMax = ref(filterParams.priceMax);


  //проверяем изменились ли параметры фильтра, добавляем в запрос при изменении
  const createNewFilterQuery = () => {
    const queryParams = {};

    if (rooms.value.length) queryParams.rooms = rooms.value.join(',');

    floorMin.value !== DEFAULT_FILTER_PARAMETERS.floorMin ? queryParams.floorMin = floorMin.value: '' ;
    floorMax.value !== DEFAULT_FILTER_PARAMETERS.floorMax ? queryParams.floorMax = floorMax.value: '';

    areaMin.value !== DEFAULT_FILTER_PARAMETERS.areaMin ? queryParams.areaMin = areaMin.value: '';
    areaMax.value !== DEFAULT_FILTER_PARAMETERS.areaMax ? queryParams.areaMax = areaMax.value: '';

    priceMin.value !== DEFAULT_FILTER_PARAMETERS.priceMin ? queryParams.priceMin = priceMin.value: '';
    priceMax.value !== DEFAULT_FILTER_PARAMETERS.priceMax ? queryParams.priceMax = priceMax.value: '';

    return queryParams;
  }

  const onApplyFilter = () => {

    const queryParams = createNewFilterQuery();

    router.push({
      query: queryParams
    })
  };

  const onResetFilter = () => {

    router.push({
      query: {}
    })
  };

  watch(filterParams, (newParams) => {
    rooms.value = newParams.rooms;
    floorMin.value = newParams.floorMin;
    floorMax.value = newParams.floorMax;
    areaMin.value = newParams.areaMin;
    areaMax.value = newParams.areaMax;
    priceMin.value = newParams.priceMin;
    priceMax.value = newParams.priceMax;
  });


</script>

<template>
  <div class="filter-container container">
    <button class="show-filter"
            v-if="!isFilterVisible"
            @click="isFilterVisible = true"
    >
      Фильтровать
    </button>
    <form @submit.prevent="onApplyFilter" class="filter"
          :class="{'filter--active' : isFilterVisible}"
    >
      <button
          class="close-filter"
          v-if="isFilterVisible"
          @click="isFilterVisible = false"
      >X</button>

      <RoomsCheckbox
          v-model:selected-rooms="rooms"
      />

      <div class="separator"></div>

      <div class="filter__floor filter-block">
        <div class="filter__floor__title title">этаж</div>
        <RangeSlider
            v-model:min-value="floorMin"
            v-model:max-value="floorMax"
            :min="DEFAULT_FILTER_PARAMETERS.floorMin"
            :max="DEFAULT_FILTER_PARAMETERS.floorMax"
            :step="1"
        />
      </div>

      <div class="separator"></div>

      <div class="filter__area filter-block">
        <div class="filter__area__title title">площадь, <span>м<sup>2</sup></span></div>
        <RangeSlider
            v-model:min-value="areaMin"
            v-model:max-value="areaMax"
            :min="DEFAULT_FILTER_PARAMETERS.areaMin"
            :max="DEFAULT_FILTER_PARAMETERS.areaMax"
            :step="0.1"
        />
      </div>

      <div class="separator"></div>

      <div class="filter__price filter-block">
        <div class="filter__price__title title">стоимость, <span>млн.р.</span></div>

        <RangeSlider
            v-model:min-value="priceMin"
            v-model:max-value="priceMax"
            :min="DEFAULT_FILTER_PARAMETERS.priceMin"
            :max="DEFAULT_FILTER_PARAMETERS.priceMax"
            :step="0.1"
        />
      </div>

      <div class="separator"></div>

      <div class="filter__buttons">
        <button class="filter__buttons__submit"
          @click="onApplyFilter"
          type="submit"
        >
          Применить
        </button>
        <button class="filter__buttons__reset"
            @click="onResetFilter"
        >
          <span>Сбросить фильтр</span>
        </button>
      </div>
    </form>
  </div>
</template>

<style scoped lang="scss">
  .show-filter {
    display: none;
    visibility: hidden;
    width: calc(50vw - 3rem);
    max-width: 27rem;
    height: 40px;
    font-size: 14px;
    text-transform: uppercase;
    color: #fff;
    background-color: #70D24E;
    border: none;
    border-radius: 5px;

    @media (max-width: 768px) {
      display: block;
      visibility: visible;
      margin: 0;
      position: absolute;
      left: 50%;
      -ms-transform: translate(-50%, -50%);
      transform: translate(-50%, -50%);
    }
  }

  .close-filter {
    display: none;

    @media (max-width: 768px) {
      display: block;
      position: absolute;
      top: 5px;
      right: 5px;
      width: 30px;
      height: 30px;
      border-radius: 5px;
      border: none;
      background-color: #70D24E;
      text-align: center;
      color: #fff;
    }
  }

  .filter-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 65px 0 30px 0;
    padding-left: 10px;
  }

  .filter {
    position: relative;
    display: flex;
    flex-direction: row;
    width: 100%;

    @media (min-width: 769px) {
      justify-content: center;
      flex-wrap: wrap;
    }
    @media (max-width: 768px) {
      flex-direction: column;
      align-items: center;
      visibility: hidden;
      max-height: 0;
      opacity: 0;
      transition: max-height 300ms ease;

      &--active {
        visibility: visible;
        padding: 30px 0 30px 0;
        max-height: 100vh;
        opacity: 1;
        background-color: rgb(255, 255, 255);
        border-radius: 10px;
      }
    }

    &__area {

      &__title {
        span {
          text-transform: lowercase;

          sup {
            font-size: 8px;
          }
        }
      }
    }

    &__price {

      &__title {
        span {
          text-transform: lowercase;
        }
      }
    }

    &__buttons {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 20rem;
      padding-top: 27px;

      &__submit {
        width: 100%;
        height: 40px;
        font-size: 14px;
        text-transform: uppercase;
        color: #fff;
        background-color: #70D24E;
        border-radius: 5px;

        &:hover {
          background-color: #4ccd20;
        }

        &:active {
          transform: scale(0.95);
          box-shadow: 0 5px 10px 0 #70D24E;
        }
      }

      &__reset {
        position: relative;
        width: 100%;
        height: 40px;
        background: none;

        span {
          display: inline-block;
          margin-top: -10px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          color: #2C323A;

          &:after {
            content: '';
            height: 1px;
            width: 108px;
            position: absolute;
            bottom: 5px;
            transform: translate(-100%, -50%);
            background-color: #70D24E;
          }

        }
      }


      button {
        border: none;
        cursor: pointer;
      }
    }

    .title {
      font-size: 12px;
      height: 28px;
      font-weight: 700;
      text-transform: uppercase;
      color: #2C323A;
    }

    .filter-block {
      display: flex;
      flex-direction: column;
      width: 175px;
    }

    .separator {
      width: 1px;
      height: 20px;
      background-color: #EBEBEB;
      margin-top: 40px;

      @media (min-width: 1200px) {
        margin-left: 30px;
        margin-right: 30px;
      }

      @media (max-width: 1200px) {
        margin-left: calc(2.5vw);
        margin-right: calc(2.5vw);
      }

      @media (max-width: 768px) {
        display: none;
      }
    }


  }

</style>
