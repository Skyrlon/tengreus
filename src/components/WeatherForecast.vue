<template>
  <div class="weather-forecast" :class="{ active: isActive }">
    <div class="weather-forecast-card-container" v-if="!showForecastDetails">
      <weather-card
        :key="day.dt"
        v-for="day in forecast"
        :WeatherData="day"
        :Title="dayOfTheWeek(day.dt)"
        @ask-for-details="showDetails"
      />
    </div>
    <weather-forecast-details
      v-if="showForecastDetails"
      :ForecastData="forecastDetailsData"
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
    dayOfTheWeek(time) {
      let dayInLetters;
      let dt = new Date(time * 1000);
      let day = dt.getDay();
      switch (day) {
        case 0:
          dayInLetters = "Monday";
          break;
        case 1:
          dayInLetters = "Tuesday";
          break;
        case 2:
          dayInLetters = "Wednesday";
          break;
        case 3:
          dayInLetters = "Thursday";
          break;
        case 4:
          dayInLetters = "Friday";
          break;
        case 5:
          dayInLetters = "Saturday";
          break;
        case 6:
          dayInLetters = "Sunday";
          break;
      }
      return dayInLetters;
    },
    showDetails(payload) {
      this.forecastDetailsData = payload.data;
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
  height: 200px;
  transition: 0.5s;
  &.active {
    left: 0;
  }
  &-card-container {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
    height: 100%;
    & > div {
      width: 10%;
      height: 100%;
    }
  }
}
</style>