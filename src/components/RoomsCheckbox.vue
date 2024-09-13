<template>
  <div class="filter__rooms">
    <div class="filter__rooms__title title">комнаты</div>
    <div class="filter__rooms__buttons">
      <label v-for="room in roomsValues" :key="room">
        <input type="checkbox"
               :value="room"
               v-model="selectedRooms"
               :disabled="isLoading"
        >
        <span
            class="filter__rooms__checkbox"
            :class="{ selected: isSelected(room), loading: isLoading}"
        >
          {{ROOMS_CHECKBOX_VALUES[room]}}
        </span>
      </label>
    </div>
  </div>
</template>

<script setup>
  const selectedRooms = defineModel('selectedRooms');

  defineProps({
    isLoading: {
      type: Boolean,
      default: true
    }
  })

  import { ROOMS_CHECKBOX_VALUES } from "../constants/roomsCheckboxValues.js";


  const roomsValues = Object.keys(ROOMS_CHECKBOX_VALUES);

  const isSelected = (room) => {
    return selectedRooms.value.includes(room);
  };

</script>


<style scoped lang="scss">
.filter__rooms {

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
    cursor: pointer;

    &.selected {
      background-color: #70D24E;
      color: #fff;
    }
  }
}

.title {
  font-size: 12px;
  height: 28px;
  font-weight: 700;
  text-transform: uppercase;
  color: #2C323A;
}

.loading {
  background: linear-gradient(90deg, rgba(112, 210, 78, 0.46) 25%, rgba(224, 224, 224, 0.6) 50%, rgba(112, 210, 78, 0.52) 75%);
  background-size: 200% 100%;
  animation: gradientAnimation 1.5s ease-in-out infinite;

  @keyframes gradientAnimation {
    0% {
      background-position: 200% 0;
    }
    100% {
      background-position: -200% 0;
    }
  }
}
</style>
