<template>
  <div class="filter__rooms">
    <div class="filter__rooms__title title">комнаты</div>
    <div class="filter__rooms__buttons">
      <label v-for="room in roomsValues" :key="room">
        <input type="checkbox" :value="room" v-model="selectedRooms"
        >
        <span
            class="filter__rooms__checkbox"
            :class="{ selected: isSelected(room) }">
          {{roomsValuesLayout[room]}}
        </span>
      </label>
    </div>
  </div>
</template>

<script setup>

  const selectedRooms = defineModel('selectedRooms');

  const roomsValues = ['s', '1', '2', '3'];

  const roomsValuesLayout = {
    's': 'S',
    '1': '1k',
    '2': '2k',
    '3': '3k'
  }

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
</style>
