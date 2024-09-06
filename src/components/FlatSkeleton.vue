<template>
  <div class="skeleton" >
    <div class="skeleton__header">
      <div class="skeleton__header__floor">
      </div>

      <div class="skeleton__header__rooms">
      </div>
    </div>

      <div class="skeleton__body">
        <div class="skeleton__body__img">
        </div>
      </div>

      <div class="skeleton__price">
        <div class="skeleton__price__total"></div>
      </div>
  </div>
</template>

<script setup>

</script>


<style scoped lang="scss">

  .skeleton {
    display: flex;
    flex-direction: column;
    width: 27rem;
    height: 36.5rem;
    margin: 0 15px 15px 0;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;

    &__header {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: baseline;
      height: 2.8rem;
      margin: 10px 0 10px 10px;
      font-size: 1.2rem;

      &__floor {
        width: 5rem;
        height: 2rem;
      }

      &__rooms {
        width: 15rem;
        height: 2rem;
      }
    }

    &__body {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 25rem;
      height: 25rem;
      border: 1px solid #ebebeb;
      border-radius: 5px;

      &__img {
        width: 16rem;
        height: 16rem;
      }
    }

    &__price {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      margin: 13px 5px 0 0;

      &__total {
        width: 20rem;
        height: 2.5rem;
        margin-bottom: 6px;
      }
    }

    @media (max-width: 575px) {
      width: 100%;
      height: 21rem;

      &__body {
        width: calc(50vw - 2rem);
        max-width: 25rem;

        &__img {
          width: 7rem;
          height: 7rem;
        }
      }
    }
  }

  .skeleton__header__floor, .skeleton__header__rooms, .skeleton__body__img, .skeleton__price__total {
    border-radius: 5px;
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: gradientAnimation 1.5s ease-in-out infinite;
  }

  @keyframes gradientAnimation {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
</style>
