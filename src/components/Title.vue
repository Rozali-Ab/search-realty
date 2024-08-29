<script setup>

</script>

<template>
  <div class="main-title">
    <RouterLink to="/">
      <img src="../assets/vue.svg" alt="logo">
    </RouterLink>
    <span>LOREM IPSUM DOLOR SIT </span>
  </div>
</template>

<style scoped lang="scss">
  .main-title {
    position: relative;
    padding-top: 30px;

    img {
      display: inline-block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100px;
    }

    span {
      display: block;
      font-size: 34px;
      font-weight: 400;
      text-align: center;
      color: #2C323A;
    }
  }
</style>
