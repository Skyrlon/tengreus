<template>
  <div class="weather-forecast" :class="{ active: isActive }">
    <div class="weather-forecast-card-container" v-if="!showForecastDetails">
      <weather-card
        :key="day.dt"
        v-for="day in forecast"
        :WeatherData="day"
        :Day="dayOfTheWeek(day.dt)"
      >
        <div class="weather-forecast-details-link" @click="showDetails(day)">
          {{ $t("details") }}
        </div>
      </weather-card>
    </div>
    <weather-forecast-details
      v-if="showForecastDetails"
      :ForecastData="forecastDetailsData"
      @go-back="showForecastDetails = false"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import WeatherCard from "./WeatherCard.vue";
import WeatherForecastDetails from "./WeatherForecastDetails.vue";

export default {
  components: { WeatherCard, WeatherForecastDetails },
  name: "WeatherForecast",
  props: {
    isActive: Boolean,
  },
  data() {
    return {
      showForecastDetails: false,
      forecastDetailsData: {},
    };
  },
  computed: {
    ...mapState(["forecast"]),
  },
  methods: {
    showDetails(payload) {
      this.forecastDetailsData = payload;
      this.showForecastDetails = true;
    },
  },
};
</script>

<style lang="scss">
.weather-forecast {
  position: absolute;
  left: 100%;
  width: 100%;
  height: 90%;
  transition: left 1s;
  &.active {
    left: 0;
  }
  &-card-container {
    display: flex;
    margin-top: 2.5%;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    & > div {
      width: 10%;
    }
  }
}
</style>