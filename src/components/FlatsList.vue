<script setup>
  import { defineProps} from "vue";
  import Card from "./FlatCard.vue";

  defineProps({
    flats: Array,
  })

</script>

<template>
  <div class="flats-list">
    <Card v-for="flat in flats" :key="flat.id" :flat="flat"/>
  </div>
</template>

<style lang="scss" scoped>
  .flats-list {
    display: flex;
    flex-wrap: wrap;
    max-width: 1140px;
    margin: 0 auto;

    @media (max-width: 1200px) {
      max-width: 855px;
    }

    @media (max-width: 900px) {
      max-width: 570px;
    }
  }
</style>
