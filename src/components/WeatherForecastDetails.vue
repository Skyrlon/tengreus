<template>
  <div class="weather-forecast-details">
    <div class="weather-forecast-details-icon">
      <weather-card
        :WeatherData="ForecastData"
        :Title="dayOfTheWeek(ForecastData.dt)"
      >
        <div class="weather-forecast-details-link" @click="$emit('go-back')">
          {{ $t("back") }}
        </div>
      </weather-card>
    </div>
    <div class="weather-forecast-details-text">
      <div class="feels-like-temp">
        {{ $t("feels_like") }} :
        {{ convertTemperature(ForecastData.feels_like.day) }}
        <div class="units">
          {{ tempUnit }}
        </div>
      </div>
      <div class="min-max-temp">
        Min/Max : {{ convertTemperature(ForecastData.temp.min) }}/{{
          convertTemperature(ForecastData.temp.max)
        }}
        <div class="units">
          {{ tempUnit }}
        </div>
      </div>
      <div class="pressure">
        {{ $t("pressure") }} : {{ convertPressure(ForecastData.pressure) }}
        <div class="units">
          {{ pressureUnit }}
        </div>
      </div>
      <div class="humidity">
        {{ $t("humidity") }} : {{ ForecastData.humidity }}%
      </div>
      <div class="wind">
        {{ $t("wind") }} :
        <div class="wind-direction">
          <arrow-icon :degree="ForecastData.wind_deg" />
        </div>
        {{ $t(getWindDirection(ForecastData.wind_deg)) }}
        {{ convertSpeed(ForecastData.wind_speed) }}
        <div class="units">
          {{ speedUnit }}
        </div>
      </div>
      <div class="cloudiness">
        {{ $t("cloudiness") }} : {{ ForecastData.clouds }}%
      </div>
      <div class="moon-phase">
        {{ $t("moon_phase") }} : {{ $t(getMoonPhase(ForecastData.dt)) }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ArrowIcon from "@/components/icons/ArrowIcon.vue";
import WeatherCard from "./WeatherCard.vue";

export default {
  components: { WeatherCard, ArrowIcon },
  name: "WeatherForecastDetails",
  props: {
    ForecastData: Object,
  },
  computed: {
    ...mapState(["tempUnit", "pressureUnit", "lengthUnit", "speedUnit"]),
  },
};
</script>

<style lang="scss">
.weather-forecast-details {
  display: flex;
  width: 100%;
  flex-direction: row;
  & > div:nth-child(1) {
    width: 20%;
  }
  &-text {
    display: flex;
    flex-wrap: wrap;
    & > div {
      box-sizing: border-box;
      margin-top: 3em;
      padding-left: 5em;
      width: 50%;
    }
    & .wind-direction {
      display: inline-block;
      width: 1em;
      height: 1em;
    }
  }
}
</style>