<template>
  <div class="weather-forecast" :class="{ active: isActive }"></div>
</template>

<script>
export default {
  name: "WeatherForecast",
  props: {
    isActive: Boolean,
  },
};
</script>

<style lang="scss">
.weather-forecast {
  position: absolute;
  left: 100%;
  width: 100%;
  height: 200px;
  background: red;
  transition: 0.5s;
  &.active {
    left: 0;
  }
}
</style>