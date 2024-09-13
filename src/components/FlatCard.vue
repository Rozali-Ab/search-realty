<script setup>
  import { defineProps, computed, ref } from "vue";
  import { ROOMS_COUNT_TITLES } from "../constants/roomsCountTitles.js";

  const props = defineProps({
    flat: Object,
  });

  const calculatePricePerMeter = () => {
    return (Number(props.flat.price) / Number(props.flat.area)).toFixed(0);
  }
  const formatPrice = (price) => {
    return parseFloat(price).toLocaleString('ru-RU');
  };

  const isHovered = ref(false);
  const hasImgError = ref(false);

  const id = props.flat.id;
  const floor = props.flat.floor + ' этаж';
  const rooms = ROOMS_COUNT_TITLES[props.flat.rooms];
  const area = props.flat.area;
  const imgSrc = `../src/assets/${props.flat.img}`;
  const flatRouteLink = '/flats/' + props.flat.id;
  const formattedPrice = computed(() => formatPrice(props.flat.price) + 'p.');
  const pricePerMeter = computed(() => formatPrice(calculatePricePerMeter()) + ' р. за м');

  const onImageError = () => {
    hasImgError.value = true;
  }
</script>

<template>
<div
    class="card"
    :class="{'card--active' : isHovered}"
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="card__header">
      <div class="card__header__floor">
        <span>{{floor}}</span>
      </div>

      <div class="card__header--wrapper">
        <div class="card__header__rooms">
          <span>{{rooms}}</span>
        </div>
        <span class="card__header__symbol">-</span>
        <div class="card__header__area">
          {{area}}м<sup>2</sup>
        </div>
      </div>
    </div>

    <div class="mobile-wrapper">
      <div class="card__body">
        <div class="card__body__number">&#8470;{{id}}</div>
        <div class="card__body__img">
          <div v-if="hasImgError" class="card__body__img--error"></div>
          <img v-else
            :src="imgSrc" alt="flat"
            @error="onImageError"
          >
        </div>
      </div>

      <div class="card__price">
        <div class="card__price__total">{{formattedPrice}}</div>
        <div class="card__price__per-meter">{{pricePerMeter}}<sup>2</sup></div>
      </div>
    </div>


    <RouterLink :to="flatRouteLink">
      <div class="card__btn">
        <span class="card__btn__span">Подробнее</span>
      </div>
    </RouterLink>
  </div>


</template>

<style lang="scss" scoped>
  .card {
    display: flex;
    flex-direction: column;
    width: 27rem;
    height: 36.5rem;
    margin: 0 15px 15px 0;
    padding: 10px;
    background-color: #fff;
    color: #000;
    border-radius: 10px;
    font-weight: bolder;

    &__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;
      height: 2.8rem;
      margin: 10px 0 10px 10px;
      font-size: 1.2rem;

      &--wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: baseline;
        font-weight: bolder;
      }

      &__floor{
        color: rgba(44, 50, 58, 0.58);
      }

      &__symbol {
        font-weight: lighter;
        color: rgba(44, 50, 58, 0.58);
        margin: 0 5px;
      }

      &__rooms{
        margin: 0 5px;
      }

      &__area{
        margin: 0 5px;

        sup {
          font-size: 0.8rem;
        }
      }
    }

    &__body {
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 25rem;
      height: 25rem;
      border: 1px solid #ebebeb;
      border-radius: 5px;
      transition: height 300ms ease-out;

      &__number {
        display: flex;
        justify-content: center;
        align-self: flex-end;
        width: 6.2rem;
        height: 3rem;
        font-size: 1.4rem;
        line-height: 2.8rem;
        border-radius: 0 5px 0 5px;
        border-left: 1px solid #ebebeb;
        border-bottom: 1px solid #ebebeb;

      }

      &__img {
        margin-top: -20px;
        img {
          display: block;
          width: 188px;
          transform: rotate(90deg);
          transition: width 300ms ease-out;
          filter: saturate(1.7);
        }

        &--error {
          width: 188px;
        }
      }

    }

    &__price {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin: 13px 5px 0 0;

      &__total {
        font-size: 2rem;
        margin-bottom: 6px;
      }
      &__per-meter {
        font-size: 1.2rem;
        color: rgba(44, 50, 58, 0.58);
        margin-bottom: 20px;

        sup {
          font-size: 8px;
        }
      }
    }

    &__btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25rem;
      height: 0;
      color: #fff;
      background: #70D24E;
      border-radius: 2px 2px 5px 5px;
      transition: height 300ms ease-out;

      &__span {
        display: none;
      }

      &:hover {
        background-color: #4ccd20;
      }

      &:active {
        transform: scale(0.95);
        box-shadow: 0 5px 10px 0 #70D24E;
      }
    }

    &--active {
      box-shadow: 0 5px 20px 0 #56565640;

      .card__body {
        height: 20rem;
      }

      .card__btn {
        height: 4rem;

        &__span {
          display: inline-block;
          text-transform: uppercase;
          font-size: 1.4rem;
          font-weight: lighter;
          line-height: 2.8rem;
        }
      }

      img {
        width: 152px;
      }
    }

    @media (max-width: 575px) {
      width: 100%;
      height: auto;

      &__header {
        font-size: 1.5rem;
      }

      &__body {
        width: calc(50vw - 2rem);
        max-width: 25rem;
        height: 10rem;

        img {
          width: 70px;
        }
      }

      &__price__total {
          font-size: 1.5rem;
      }

     &__btn {
       width: calc(50vw - 2rem);
       max-width: 25rem;
       height: 4rem;

       &__span {
         display: inline-block;
         text-transform: uppercase;
         font-size: 1.4rem;
         font-weight: lighter;
         line-height: 2.8rem;
       }
     }

      &--active {
        .card__body {
          height: auto;
        }

        img {
          width: 70px;
        }
      }

      .mobile-wrapper {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }

}
</style>
