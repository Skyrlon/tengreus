<template>
  <div class="weather-details">
    <div class="nav-weather" :class="{ forecast: showForecast }">
      <span class="nav-weather_current" @click="showForecast = false">
        {{ $t("current") }}
      </span>
      |
      <span class="nav-weather_forecast" @click="showForecast = true">
        {{ $t("forecast") }}
      </span>
    </div>
    <transition name="slide-current">
      <weather-current v-if="!showForecast" />
    </transition>
    <transition name="slide-forecast">
      <weather-forecast v-if="showForecast" />
    </transition>
  </div>
</template>

<script>
import WeatherCurrent from "./WeatherCurrent.vue";
import WeatherForecast from "./WeatherForecast.vue";
export default {
  name: "WeatherDetails",
  data() {
    return {
      showForecast: false,
    };
  },
  components: {
    WeatherCurrent,
    WeatherForecast,
  },
};
</script>

<style lang="scss">
.weather-details {
  position: relative;
}

.nav-weather {
  &_current {
    display: inline-block;
    text-decoration: underline #6495ed 0.25em;
    cursor: pointer;
  }
  &_forecast {
    display: inline-block;
    text-decoration: none;
    cursor: pointer;
  }
  &.forecast {
    & .nav-weather_forecast {
      text-decoration: underline #6495ed 0.25em;
    }
    & .nav-weather_current {
      text-decoration: none;
    }
  }
}

.moon-phase {
  text-transform: none;
}

.units {
  display: inline-block;
  text-transform: none;
}

.slide-current-leave-active,
.slide-current-enter-active,
.slide-forecast-leave-active,
.slide-forecast-enter-active {
  transition: 1s;
}
.slide-current-enter {
  transform: translate(-100%, 0);
}
.slide-current-leave-to {
  transform: translate(-100%, 0);
}
.slide-forecast-enter {
  transform: translate(100%, 0);
}
.slide-forecast-leave-to {
  transform: translate(100%, 0);
}
</style>