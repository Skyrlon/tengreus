<template>
  <div :class="'banner ' + getWeather(weather.main)">
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
    </div>
    <div class="icons">
      <div class="weather-icon-container">
        <weather-icon
          :weatherMain="weather.main"
          :weatherId="weather.id"
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
    getWeather(weather) {
      if (weather === "Thunderstorm") {
        return "thunder";
      } else if (weather === "Drizzle" || weather === "Rain") {
        return "rain";
      } else if (weather === "Snow") {
        return "snow";
      } else if (["Mist", "Smoke", "Haze", "Fog", "Ash"].includes(weather)) {
        return "fog";
      } else if (weather === "Dust" || weather === "Sand") {
        return "dust";
      } else if (weather === "Tornado") {
        return "tornado";
      } else if (weather === "Squall") {
        return "wind";
      } else if (weather === "Clouds") {
        return "clouds";
      } else if (
        weather === "Clear" &&
        this.time > this.sunrise &&
        this.time < this.sunset
      ) {
        return "sun";
      } else if (
        weather === "Clear" &&
        (this.time < this.sunrise || this.time > this.sunset)
      ) {
        return "night";
      }
    },
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
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: white;
  &.thunder {
    background-image: url("../assets/images/thunder.jpg");
  }
  &.rain {
    background-image: url("../assets/images/rain.jpg");
  }
  &.snow {
    background-image: url("../assets/images/snow.jpg");
  }
  &.fog {
    background-image: url("../assets/images/fog.jpg");
  }
  &.dust {
    background-image: url("../assets/images/dust.jpg");
  }
  &.tornado {
    background-image: url("../assets/images/tornado.jpg");
  }
  &.wind {
    background-image: url("../assets/images/wind.jpg");
  }
  &.clouds {
    background-image: url("../assets/images/clouds.jpg");
  }
  &.sun {
    background-image: url("../assets/images/sun.jpg");
  }
  &.night {
    background-image: url("../assets/images/night.jpg");
  }
}

.weather-summary {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 5%;
  width: 80%;
  height: 99%;
  text-align: left;
}

.city-name {
  margin: 0;
  font-size: 2em;
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
}

.temperature {
  font-size: 1.75em;
}

.current-weather {
  font-size: 1.75em;
  text-transform: capitalize;
}

.icons {
  display: flex;
  flex-direction: column;
  position: relative;
  top: 20%;
  width: 10%;
  height: 75%;
}

.weather-icon-container {
  position: absolute;
  right: 20px;
  width: 7em;
}

.sun-path {
  position: absolute;
  bottom: 0;
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