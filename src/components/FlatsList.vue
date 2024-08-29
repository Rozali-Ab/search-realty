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
    justify-content: flex-start;
    flex-wrap: wrap;

    @media (max-width: 1200px) {
      justify-content: center;
    }
  }
</style>
