<template>
  <div class="list">
    <FlatSkeleton v-for="item in props.length" :key="item"></FlatSkeleton>
  </div>
</template>

<script setup>
  import FlatSkeleton from "./FlatSkeleton.vue";

  const props = defineProps({
    length: {
     type: Number,
      default: 8,
    }
  })
</script>

<style scoped lang="scss">
  .list {
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
