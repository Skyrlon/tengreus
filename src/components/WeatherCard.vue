<template>
  <div class="weather-card">
    <div class="weather-card_day">{{ $t(Day) }}</div>
    <div class="weather-card_icon">
      <div class="tooltip">
        {{ WeatherData.weather[0].description }}
      </div>
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
      {{ $t("day") }} / {{ $t("night") }} <br />
      {{ convertTemperature(WeatherData.temp.day) }}
      {{ this.$store.state.tempUnit }} /
      {{ convertTemperature(WeatherData.temp.night) }}
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
  font-size: 100%;
  &_day {
    margin-top: 5%;
    margin-bottom: 5%;
  }
  &_icon {
    position: relative;
    margin: auto;
    width: 100%;
    &:hover .tooltip,
    .weather-card_icon:active .tooltip {
      visibility: visible;
      opacity: 1;
    }
    & .tooltip {
      visibility: hidden;
      background-color: #555;
      color: #fff;
      text-align: center;
      border-radius: 6px;
      padding: 0.5em 0em;
      position: absolute;
      font-size: 0.75em;
      top: 1.75em;
      left: 0;
      right: 0;
      margin-right: auto;
      margin-left: auto;
      z-index: 1;
      opacity: 0;
      transition: opacity 0.5s;
    }
  }
  &_temperature {
    font-size: 100%;
  }
  &_link {
    margin-top: 2.5%;
  }
}
</style>