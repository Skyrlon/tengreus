<template>
  <div class="weather-card">
    <div class="weather-card_title">{{ Title }}</div>
    <div class="weather-card_icon"></div>
    <weather-icon
      :weatherMain="WeatherData.weather[0].main"
      :weatherDetails="WeatherData.weather[0].description"
      :time="WeatherData.dt"
      :sunrise="WeatherData.sunrise"
      :sunset="WeatherData.sunset"
      :moonPhase="getMoonPhase(WeatherData.dt)"
    />
  </div>
</template>

<script>
import WeatherIcon from "./WeatherIcon.vue";
export default {
  components: { WeatherIcon },
  name: "WeatherCard",
  props: {
    Title: String,
    WeatherData: Object,
  },
};
</script>

<style lang="scss">
.weather-card {
  border: 1px solid;
  border-radius: 10%;
  &_icon {
    width: 33%;
    height: 33%;
  }
}
</style>