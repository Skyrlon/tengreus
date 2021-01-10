<template>
  <div class="weather">
    <weather-banner />
    <weather-details />
    <transition name="settings-appear">
      <settings v-if="showSettings" />
    </transition>
    <settings-icon
      @click.native="showSettings = !showSettings"
      :isActive="showSettings"
    />
  </div>
</template>

<script>
import WeatherBanner from "@/components/WeatherBanner.vue";
import Settings from "@/components/Settings.vue";
import SettingsIcon from "@/components/icons/SettingsIcon.vue";
import WeatherDetails from "../components/WeatherDetails.vue";

export default {
  name: "Weather",
  beforeCreate() {
    this.$store.dispatch("getCurrentWeather");
    this.$store.dispatch("getForecastWeather");
  },
  data() {
    return {
      showSettings: false,
    };
  },
  components: {
    WeatherBanner,
    Settings,
    SettingsIcon,
    WeatherDetails,
  },
};
</script>

<style lang="scss">
.weather {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  & .footer {
    flex: 0 1 40px;
  }
}

@keyframes show-up {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>