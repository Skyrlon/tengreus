<template>
  <div class="weather-icon">
    <sun-icon
      v-if="
        weatherMain === 'Clear' && isDayOrNight(time, sunrise, sunset) === 'day'
      "
    />
    <moon-icon
      v-if="
        weatherMain === 'Clear' &&
        isDayOrNight(time, sunrise, sunset) === 'night'
      "
      :moonPhase="moonPhase"
    />
    <cloud-icon
      v-if="weatherMain === 'Clouds'"
      :cloudiness="getCloudiness(weatherId)"
      :moonPhase="moonPhase"
      :moonOrSun="isDayOrNight(time, sunrise, sunset)"
    />
    <thunderstorm-icon
      v-if="weatherMain === 'Thunderstorm'"
      :isRaining="isRaining(weatherId)"
    />
    <rain-icon
      v-if="weatherMain === 'Rain' || weatherMain === 'Drizzle'"
      :isSnowing="weatherId === 511"
    />
    <snow-icon v-if="weatherMain === 'Snow'" />
    <mist-icon
      v-if="
        [
          'Mist',
          'Smoke',
          'Haze',
          'Dust',
          'Fog',
          'Sand',
          'Ash',
        ].includes(weatherMain)
      "
    />
    <wind-icon v-if="weatherMain === 'Squall'" />
    <tornado-icon v-if="weatherMain === 'Tornado'" />
  </div>
</template>

<script>
import SunIcon from "@/components/icons/SunIcon.vue";
import CloudIcon from "@/components/icons/CloudIcon.vue";
import ThunderstormIcon from "@/components/icons/ThunderstormIcon.vue";
import RainIcon from "@/components/icons/RainIcon.vue";
import SnowIcon from "@/components/icons/SnowIcon.vue";
import MoonIcon from "@/components/icons/MoonIcon.vue";
import MistIcon from "@/components/icons/MistIcon.vue";
import TornadoIcon from "@/components/icons/TornadoIcon.vue";
import WindIcon from "@/components/icons/WindIcon.vue";

export default {
  name: "WeatherIcon",
  components: {
    SunIcon,
    CloudIcon,
    ThunderstormIcon,
    RainIcon,
    SnowIcon,
    MoonIcon,
    MistIcon,
    TornadoIcon,
    WindIcon,
  },
  props: {
    weatherMain: String,
    weatherId: Number,
    time: Number,
    sunrise: Number,
    sunset: Number,
    moonPhase: String,
  },
  methods: {
    isDayOrNight(time, sunrise, sunset) {
      if (time > sunrise && time < sunset) {
        return "day";
      } else {
        return "night";
      }
    },
    getCloudiness(id) {
      let cloudiness;
      switch (id) {
        case 801:
          cloudiness = "few clouds";
          break;
        case 802:
          cloudiness = "scattered clouds";
          break;
        case 803:
          cloudiness = "broken clouds";
          break;
        case 804:
          cloudiness = "overcast clouds";
          break;
      }
      return cloudiness;
    },
    isRaining(id) {
      if (id <= 202 || id >= 230) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss">
.weather-icon {
  height: 100%;
  width: 100%;
}
</style>