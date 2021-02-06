<template>
  <div class="weather-card">
    <div class="weather-card_day">{{ $t(Day) }}</div>
    <div class="weather-card_icon" :title="WeatherData.weather[0].description">
      <weather-icon
        :weatherMain="WeatherData.weather[0].main"
        :weatherId="WeatherData.weather[0].id"
        :time="WeatherData.dt"
        :sunrise="WeatherData.sunrise"
        :sunset="WeatherData.sunset"
        :moonPhase="getMoonPhase(WeatherData.dt)"
      />
    </div>
    <div class="weather-card_temperature">
      {{ convertTemperature(WeatherData.temp.day) }}
      {{ this.$store.state.tempUnit }}
    </div>
    <div class="weather-card_link">
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
    Day: String,
    WeatherData: Object,
  },
};
</script>

<style lang="scss">
.weather-card {
  display: flex;
  flex-direction: column;
  border: 1px solid;
  border-radius: 10%;
  width: 100%;
  height: 100%;
  background: #2f73c6;
  font-size: 1.25em;
  &_day {
    margin-top: 5%;
    margin-bottom: 5%;
  }
  &_icon {
    margin-left: 20%;
    width: 60%;
    height: 60%;
  }
  &_link {
    margin-top: 10%;
  }
}
</style>