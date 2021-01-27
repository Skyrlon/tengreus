<template>
  <div class="banner">
    <div class="weather-summary">
      <div class="city-name">
        {{ city.name }}
        <div
          class="reload-icon"
          :class="{ reloading: isReloading }"
          @click="reloadData"
        >
          <reload-icon />
        </div>
      </div>
      <div class="hour">{{ convertTime(time) }}</div>
      <div class="temperature">
        {{ convertTemperature(temperatures.current) }}{{ tempUnit }}
      </div>
      <div class="current-weather">{{ weather.detailed }}</div>
      <div class="weather-icon-container">
        <weather-icon
          :weatherMain="weather.main"
          :weatherDetails="weather.detailed"
          :time="time"
          :sunrise="sunrise"
          :sunset="sunset"
          :moonPhase="getMoonPhase(time)"
        />
      </div>
      <div class="sun-path">
        <sun-path-icon :time="time" :sunRise="sunrise" :sunSet="sunset" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import SunPathIcon from "./icons/SunPathIcon.vue";
import WeatherIcon from "@/components/WeatherIcon.vue";
import ReloadIcon from "../components/icons/ReloadIcon.vue";

export default {
  name: "WeatherBanner",
  components: {
    SunPathIcon,
    WeatherIcon,
    ReloadIcon,
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
  },

  data() {
    return {
      isReloading: false,
      clickCount: 0,
    };
  },

  methods: {
    reloadData() {
      this.clickCount++;
      if (this.clickCount < 2) {
        this.isReloading = true;
        this.$store.dispatch("getCurrentWeather", { id: this.city.id });
        this.$store.dispatch("getForecastWeather", {
          longitude: this.city.lon,
          latitude: this.city.lat,
        });
        setTimeout(() => {
          this.isReloading = false;
        }, 1000);
        setTimeout(() => {
          this.clickCount = 0;
        }, 300000);
      } else {
        return;
      }
    },
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
  display: flex;
  flex-direction: row;
}

.reload-icon {
  width: 0.75em;
  &.reloading {
    animation: infinite-spin 0.5s infinite linear;
  }
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

.weather-icon-container {
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

@keyframes infinite-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
</style>