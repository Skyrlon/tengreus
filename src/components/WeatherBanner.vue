<template>
  <div class="banner">
    <div class="weather-summary">
      <div class="city-name">{{ city.name }}</div>
      <div class="hour">{{ time.hour }}:{{ time.minutes }}</div>
      <div class="temperature">{{ temperatures.current }}{{ tempUnit }}</div>
      <div class="current-weather">{{ weather.detailed }}</div>
      <div class="weather-icon">
        <sun-icon v-if="temperatures.current == 'Clear'" />
        <moon-icon v-if="weather.main == 'Clear'" :moonPhase="getMoonPhase" />
        <cloud-icon
          v-if="weather.main == 'Clouds'"
          :cloudiness="weather.detailed"
          :moonPhase="getMoonPhase"
        />
        <thunderstorm-icon
          v-if="weather.main == 'Thunderstorm'"
          :isRaining="
            weather.detailed.includes('rain') || weather.includes('drizzle')
          "
        />
        <rain-icon
          v-if="weather.main == 'Rain'"
          :isSnowing="weather.includes('freezing')"
        />
        <snow-icon v-if="weather.main == 'Snow'" />
        <mist-icon
          v-if="
            weather.main ==
            ('Mist' ||
              'Smoke' ||
              'Haze' ||
              'Dust' ||
              'Fog' ||
              'Sand' ||
              'Ash' ||
              'Squall')
          "
        />
        <tornado-icon v-if="weather.main == 'Tornado'" />
      </div>
      <div class="sun-path">
        <sun-path-icon
          :time="time.unix"
          :sunRise="sunrise.unix"
          :sunSet="sunset.unix"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SunIcon from "./icons/SunIcon.vue";
import CloudIcon from "./icons/CloudIcon.vue";
import ThunderstormIcon from "./icons/ThunderstormIcon.vue";
import RainIcon from "./icons/RainIcon.vue";
import SnowIcon from "./icons/SnowIcon.vue";
import MoonIcon from "./icons/MoonIcon.vue";
import MistIcon from "./icons/MistIcon.vue";
import TornadoIcon from "./icons/TornadoIcon.vue";
import SunPathIcon from "./icons/SunPathIcon.vue";

export default {
  created() {
    this.$store.dispatch("getWeather");
  },
  name: "WeatherBanner",
  components: {
    SunIcon,
    CloudIcon,
    ThunderstormIcon,
    RainIcon,
    SnowIcon,
    MoonIcon,
    MistIcon,
    TornadoIcon,
    SunPathIcon,
  },
  computed: {
    ...mapState([
      "tempUnit",
      "temperatures",
      "city",
      "time",
      "sunrise",
      "sunset",
      "currentTemp",
      "weather",
      "moonPhase",
    ]),
    ...mapGetters(["getMoonPhase"]),
  },
};
</script>

<style lang="scss" scoped>
.banner {
  flex: 0 1 auto;
  width: 100%;
  background-image: url("https://via.placeholder.com/1536x320.png/0000FF?text=Banner");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: white;
}

.weather-summary {
  position: relative;
  padding: 5%;
  width: 90%;
  text-align: left;
}

.city-name {
  margin: 0;
  font-size: 2.5em;
}

.hour {
  font-size: 1.75em;
  padding-top: 0.5em;
}

.temperature {
  font-size: 1.75em;
  padding-top: 1.5em;
}

.current-weather {
  font-size: 1.75em;
  padding-top: 0.5em;
  text-transform: capitalize;
}

.weather-icon {
  position: absolute;
  top: 20%;
  right: 5%;
  width: 7em;
  height: 7em;
}

.sun-path {
  position: absolute;
  bottom: 10px;
  right: 20px;
  width: 7em;
}

svg {
  height: 100%;
  width: 100%;
}
</style>