<template>
  <div class="banner">
    <div class="weather-summary">
      <div class="city-name">{{ city }}</div>
      <div class="hour">{{ time }}</div>
      <div class="temperature">
        {{ temperatures.currentTemp }}{{ tempUnit }}
      </div>
      <div class="current-weather">{{ weather }}</div>
      <div class="weather-icon">
        <sun-icon v-if="foo == false" />
        <cloud-icon
          v-if="foo == false"
          :cloudiness="weather"
          :moonPhase="getMoonPhase"
        />
        <thunderstorm-icon
          v-if="foo == false"
          :isRaining="weather.includes('Rain') || weather.includes('Drizzle')"
        />
        <rain-icon
          v-if="foo == false"
          :isSnowing="weather.includes('Freezing')"
        />
        <snow-icon v-if="foo == false" />
        <moon-icon v-if="foo == false" :moonPhase="getMoonPhase" />
        <mist-icon v-if="foo == false" />
        <tornado-icon v-if="foo == true" />
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

export default {
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
  },
  data() {
    return {
      foo: true,
    };
  },
  computed: {
    ...mapState([
      "tempUnit",
      "temperatures",
      "city",
      "time",
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
}

.weather-icon {
  position: absolute;
  top: 20%;
  right: 5%;
  width: 7em;
  height: 7em;
}

svg {
  height: 100%;
  width: 100%;
}
</style>