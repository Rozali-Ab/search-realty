<script setup>
  import { ref, reactive, watch } from 'vue';

  import RangeSlider from "./RangeSlider.vue";
  import { useRoute, useRouter } from "vue-router";

  const router = useRouter();
  const route = useRoute();

  const isFilterVisible = ref(false);

  const roomsValues = ['s', '1', '2', '3'];

  const form = reactive({
    rooms: route.query.rooms ? route.query.rooms.split(',') : [],
    floorMin: route.query.floorMin ? Number(route.query.floorMin) : 1,
    floorMax: route.query.floorMax ? Number(route.query.floorMax) : 50,
    areaMin: route.query.areaMin ? Number(route.query.areaMin) : 1,
    areaMax: route.query.areaMax ? Number(route.query.areaMax) : 1000,
    priceMin: route.query.priceMin ? Number(route.query.priceMin) : 1,
    priceMax: route.query.priceMax ? Number(route.query.priceMax) : 100
  });

  const isSelected = (room) => {
    return form.rooms.includes(room);
  };

  const onApplyFilter = () => {

    const queryParams = {};

    if (form.rooms.length) queryParams.rooms = form.rooms.join(',');

    form.floorMin !== 1 ? queryParams.floorMin = form.floorMin: '' ;
    form.floorMax !== 50 ? queryParams.floorMax = form.floorMax: '';

    form.areaMin !== 1 ? queryParams.areaMin = form.areaMin: '';
    form.areaMax !== 1000 ? queryParams.areaMax = form.areaMax: '';

    form.priceMin !== 1 ? queryParams.priceMin = form.priceMin: '';
    form.priceMax !== 100 ? queryParams.priceMax = form.priceMax: '';

    router.push({
      path: '/flats',
      query: queryParams
    })
  };

  const onResetFilter = () => {
    // form.rooms = [];
    // form.floorMin = 1;
    // form.floorMax = 50;
    // form.areaMin = 1;
    // form.areaMax = 1000;
    // form.priceMin = 1;
    // form.priceMax = 100;

    router.push({
      path: '/flats',
      query: {}
    })
  };

  watch(
      () => route.query,
      (newQuery) => {
        form.rooms = newQuery.rooms ? newQuery.rooms.split(',') : [];
        form.floorMin = newQuery.floorMin ? Number(newQuery.floorMin) : 1;
        form.floorMax = newQuery.floorMax ? Number(newQuery.floorMax) : 50;
        form.areaMin = newQuery.areaMin ? Number(newQuery.areaMin) : 1;
        form.areaMax = newQuery.areaMax ? Number(newQuery.areaMax) : 1000;
        form.priceMin = newQuery.priceMin ? Number(newQuery.priceMin) : 1;
        form.priceMax = newQuery.priceMax ? Number(newQuery.priceMax) : 100;
      },
      { immediate: true }
  );

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
      <div class="filter__rooms">
        <div class="filter__rooms__title title">комнаты</div>
        <div class="filter__rooms__buttons">
          <label v-for="room in roomsValues" :key="room">
            <input type="checkbox" :value="room" v-model="form.rooms">
            <span class="filter__rooms__checkbox" :class="{ selected: isSelected(room) }">
              <template v-if="room === 's'">
                {{room.toUpperCase()}}
              </template>
              <template v-else>
                {{room}}k
              </template>
            </span>
          </label>
        </div>
      </div>

      <div class="separator"></div>

      <div class="filter__floor filter-block">
        <div class="filter__floor__title title">этаж</div>
        <RangeSlider
            v-model:min-value="form.floorMin"
            v-model:max-value="form.floorMax"
            :min="1"
            :max="50"
            :step="1"
        />
      </div>

      <div class="separator"></div>

      <div class="filter__area filter-block">
        <div class="filter__area__title title">площадь, <span>м<sup>2</sup></span></div>
        <RangeSlider
            v-model:min-value="form.areaMin"
            v-model:max-value="form.areaMax"
            :min="1"
            :max="100"
            :step="0.1"
        />
      </div>

      <div class="separator"></div>

      <div class="filter__price filter-block">
        <div class="filter__price__title title">стоимость, <span>млн.р.</span></div>

        <RangeSlider
            v-model:min-value="form.priceMin"
            v-model:max-value="form.priceMax"
            :min="1"
            :max="100"
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
        <button
            @click="onResetFilter"
            class="filter__buttons__reset"
        >
          Сбросить фильтр
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


    &__rooms {

      &__buttons {
        display: flex;
        flex-direction: row;

        input[type="checkbox"] {
          position: absolute;
          opacity: 0;
        }
      }
        &__checkbox {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-right: 5px;
          margin-bottom: 10px;
          width: 47px;
          height: 40px;
          font-size: 16px;
          font-weight: 700;
          border: 1px solid #D8D8D8;
          border-radius: 5px;
          background-color: #fff;
          color: #2C323A;
          user-select: none;
          text-align: center;

          &.selected {
            background-color: #70D24E;
            color: #fff;
          }
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

      a {
        width: 100%;
        text-align: center;
      }

      &__submit {
        width: 100%;
        height: 40px;
        font-size: 14px;
        text-transform: uppercase;
        color: #fff;
        background-color: #70D24E;
        border-radius: 5px;
      }

      &__reset {
        position: relative;
        margin-top: 10px;
        background: none;
        font-size: 10px;
        font-weight: 700;
        text-transform: uppercase;
        color: #2C323A;

        &:after {
          content: '';
          height: 1px;
          width: 108px;
          position: absolute;
          bottom: -3px;
          left: 0;
          background-color: #70D24E;
        }
      }

      button {
        border: none;
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
