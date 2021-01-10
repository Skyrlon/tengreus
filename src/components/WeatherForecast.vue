<template>
  <div class="weather-forecast" :class="{ active: isActive }">
    <weather-card
      :key="day.dt"
      v-for="day in forecast"
      :WeatherData="day"
      :Title="dayOfTheWeek(day.dt)"
      
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import WeatherCard from "./WeatherCard.vue";

export default {
  components: { WeatherCard },
  name: "WeatherForecast",
  props: {
    isActive: Boolean,
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
  },
};
</script>

<style lang="scss">
.weather-forecast {
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  left: 100%;
  width: 100%;
  height: 200px;
  transition: 0.5s;
  &.active {
    left: 0;
  }
  & > div {
    width: 10%;
    height: 100%;
  }
}
</style>