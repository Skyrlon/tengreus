<template>
  <div class="weather-card">
    <div class="weather-card_title">{{ $t(Title) }}</div>
    <div class="weather-card_icon">
      <weather-icon
        :weatherMain="WeatherData.weather[0].main"
        :weatherId="WeatherData.weather[0].id"
        :time="WeatherData.dt"
        :sunrise="WeatherData.sunrise"
        :sunset="WeatherData.sunset"
        :moonPhase="getMoonPhase(WeatherData.dt)"
      />
      <slot></slot>
    </div>
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
  width: 100%;
  height: 100%;
  background: #2f73c6;
  &_title {
    margin-top: 5%;
    margin-bottom: 5%;
  }
  &_icon {
    margin-left: 15%;
    width: 70%;
    height: auto;
  }
}
</style>