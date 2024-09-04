<script setup>
  import { computed, defineProps } from 'vue';

  const minValue = defineModel('minValue');
  const maxValue = defineModel('maxValue');

  const props = defineProps({
    min: Number,
    max: Number,
    step: Number,
  });

  const minPercent = computed(() => {
    const percent = ((minValue.value - props.min) / (props.max - props.min)) * 100;
    return Math.min(Math.max(percent, 0), 100);
  });

  const maxPercent = computed(() => {
    const percent = ((maxValue.value - props.min) / (props.max - props.min)) * 100;
    return Math.min(Math.max(percent, 0), 100);
  });

  const minInputHandler = (evt) => {

    let value = evt.target.value;

    if (value === '') {
      minValue.value = '';
      return;
    }

    if (value > maxValue.value || value < minValue.value ) {
      value = maxValue.value;
    }

    if (value <= props.min) {
      value = props.min;
    }

    minValue.value = value;
  }

  const maxInputHandler = (evt) => {

    let value = evt.target.value;

    if (value === '') {
      maxValue.value = '';
      return;
    }

    if (value < minValue.value || value > maxValue.value) {
      value = minValue.value;
    }

    if (value >= props.max) {
      value = props.max;
    }

    maxValue.value = value;
  }
</script>

<template>
  <div class="range-slider-container">
    <div class="minmax-inputs">
      <input
          type="number"
          :min="min"
          :max="max"
          :step="props.step"
          v-model="minValue"
          @input="minInputHandler"
      >
      <div class="minmax-inputs__separator">-</div>
      <input
          type="number"
          :min="min"
          :max="max"
          :step="props.step"
          v-model="maxValue"
          @input="maxInputHandler"
      >
    </div>
    <div class="container">
      <div class="slider-track"
           :style="{
            background: `linear-gradient(to right, #d7d7d7 ${minPercent}%, #70D24E ${minPercent}%, #70D24E ${maxPercent}%, #d7d7d7 ${maxPercent}%)`
          }"
      >
        <input
            id="slider-1"
            type="range"
            name="min"
            :min="min"
            :max="max"
            :step="props.step"
            v-model="minValue"
            @input="minInputHandler"
        >
        <input
            id="slider-2"
            type="range"
            name="max"
            :min="min"
            :max="max"
            :step="props.step"
            v-model="maxValue"
            @input="maxInputHandler"
        >
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .range-slider-container {
    position: relative;
  }

  .minmax-inputs {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    &__separator {
      width: 5px;
      margin: 0 3px 0 3px;
      font-size: 12px;
      font-weight: 700;
      line-height: 28px;
      opacity: 0.5;
    }

    input[type="number"] {
      width: 80px;
      height: 40px;
      border-radius: 5px;
      border: 1px solid #D8D8D8;
      font-size: 16px;
      text-align: center;
      color: #2C323A;
      -moz-appearance: textfield;

      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &:focus, &:active {
        border: 1px solid #70D24E;
        outline: 0;
        outline-offset: 0;
      }
    }
  }

  .container {
    position: relative;
    width: 100%;
    height: 33px;
  }

  input[type="range"] {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    outline: none;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    background-color: transparent;
    pointer-events: none;
  }
  .slider-track {
    width: 175px;
    height: 2px;
    position: absolute;
    margin: auto;
    top: 0;
    bottom: 0;
    border-radius: 5px;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    -webkit-appearance: none;
    height: 2px;
  }
  input[type="range"]::-moz-range-track {
    -moz-appearance: none;
    height: 5px;
  }
  input[type="range"]::-ms-track {
    appearance: none;
    height: 2px;
  }
  input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 24px;
    width: 24px;
    background-color: #70D24E;
    border: 4px solid #fff;
    margin-top: -11px;
    border-radius: 50%;
    pointer-events: auto;
  }
  input[type="range"]::-moz-range-thumb {
    appearance: none;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background-color: #70D24E;
    border: 4px solid #fff;
    pointer-events: auto;
  }
  input[type="range"]::-ms-thumb {
    appearance: none;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background-color: #70D24E;
    pointer-events: auto;
  }

</style>
