<script setup>
  import { useRoute, useRouter } from "vue-router";
  import { onMounted, reactive } from "vue";
  import data from "../mock/mock.json";

  const route = useRoute();
  const router = useRouter();

  const flatId = route.params.id;

  const state = reactive({
    flat: {}
  });

  onMounted(() => {
    const flat = data.data.find((flat) => flat.id === flatId);

    if (flat) {
      state.flat = flat;
    } else router.push('/404');
  })
</script>

<template>
  <div class="flat" v-if="state.flat">
    <div class="flat__image">
      <img src="../assets/room.png" alt="flat">
    </div>
    <div class="flat__description">
      <div class="title">
        <span v-if="state.flat.rooms == 1">Однокомнатная квартира</span>
        <span v-else-if="state.flat.rooms == 2">Двухкомнатная квартира</span>
        <span v-else-if="state.flat.rooms == 3">Трехкомнатная квартира</span>
        <span v-else>Квартира студия</span>
      </div>
      <div class="area">
        {{state.flat.area}} м<sup>2</sup>
      </div>
      <div class="floor">
        <span>{{state.flat.floor}}</span>/50 этаж
      </div>
      <div class="price">
        {{parseFloat(state.flat.price).toLocaleString('ru-RU')}} руб.
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .flat {
    display: flex;
    flex-direction: row;
    justify-content: space-around;

    &__image {
      img {
        filter: saturate(1.7);
      }
    }

    &__description {
      display: flex;
      flex-direction: column;
      font-size: 3rem;
      line-height: 5rem;

      .title {
        font-size: 4rem;
        font-weight: bolder;
      }

      .area {
        color: #2C323A;
      }

      .floor span{
        font-weight: bolder;
      }

      .price {
        font-weight: bolder;
      }
    }
  }
</style>
