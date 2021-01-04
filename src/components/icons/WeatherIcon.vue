<template>
  <div class="weather-icon">
    <sun-icon v-if="weatherMain == 'Clear'" />
    <moon-icon v-if="weatherMain == 'Clear'" :moonPhase="getMoonPhase" />
    <cloud-icon
      v-if="weatherMain == 'Clouds'"
      :cloudiness="weatherDetails"
      :moonPhase="getMoonPhase"
    />
    <thunderstorm-icon
      v-if="weatherMain == 'Thunderstorm'"
      :isRaining="
        weatherDetails.includes('rain') || weatherDetails.includes('drizzle')
      "
    />
    <rain-icon
      v-if="weatherMain == 'Rain'"
      :isSnowing="weatherDetails.includes('freezing')"
    />
    <snow-icon v-if="weatherMain == 'Snow'" />
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
          'Squall',
        ].includes(weatherMain)
      "
    />
    <tornado-icon v-if="weatherMain == 'Tornado'" />
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
  },
  props: {
    weatherMain: String,
    weatherDetails: String,
  },
};
</script>

<style>
.weather-icon {
  height: 100%;
  width: 100%;
}

svg {
  height: 100%;
  width: 100%;
}
</style>