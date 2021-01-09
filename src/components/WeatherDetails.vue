<template>
  <div class="weather-details">
    <div class="nav-weather" :class="{ forecast: showForecast }">
      <span class="nav-weather_current" @click="showForecast = false"
        >Current</span
      >
      |
      <span class="nav-weather_forecast" @click="showForecast = true"
        >Forecast</span
      >
    </div>
    <weather-current :isActive="!showForecast"/>
    <weather-forecast :isActive="showForecast"/>
  </div>
</template>

<script>
import WeatherCurrent from "./WeatherCurrent.vue";
import WeatherForecast from "./WeatherForecast.vue";
export default {
  name: "WeatherDetails",
  data() {
    return {
      showForecast: false,
    }
  },
  components: {
    WeatherCurrent,
    WeatherForecast,
  },
};
</script>

<style lang="scss">
.weather-details {
  position: relative;
}
</style>