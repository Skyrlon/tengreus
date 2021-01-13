<template>
  <div class="weather">
    <weather-banner />
    <weather-details />
    <transition name="show-settings">
      <settings v-if="showSettings" />
    </transition>
    <div class="settings-icon" :class="{ active: showSettings }">
      <settings-icon
        @click.native="showSettings = !showSettings"
        :isActive="showSettings"
      />
    </div>
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

.show-settings-enter-active {
  transform-origin: 100% 0%;
  animation: show-up 0.7s linear;
}

.show-settings-leave-active {
  transform-origin: 100% 0%;
  animation: show-up 0.7s linear reverse;
}

.settings-icon {
  position: absolute;
  right: 0;
  top: 0;
  width: 3.5%;
  height: auto;
  transform: rotate(0deg);
  transition: 0.7s;
  &.active {
    transform: rotate(-180deg);
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