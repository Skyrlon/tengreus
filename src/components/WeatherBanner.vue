<template>
  <div :class="'banner ' + getWeather(weather.main)">
    <div class="banner-content">
      <div class="weather-summary">
        <div class="weather-summary_row city-name">
          {{ city.name }}
          <div
            class="reload-icon"
            :class="{ reloading: isReloading }"
            @click="reloadData"
          >
            <reload-icon :isBlackOrWhite="getReloadIconColor" />
          </div>
        </div>
        <div class="weather-summary_row hour">{{ convertTime(time) }}</div>
        <div class="weather-summary_row temperature">
          {{ convertTemperature(temperatures.current) }}{{ tempUnit }}
        </div>
        <div class="weather-summary_row current-weather">
          {{ weather.detailed }}
        </div>
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
    getReloadIconColor() {
      let color;
      if (
        ["rain", "night", "clouds", "tornado"].includes(
          this.getWeather(this.weather.main)
        )
      ) {
        color = "white";
      } else {
        color = "black";
      }
      return color;
    },
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
  width: 100%;
  height: 50%;
  background: black;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: white;
  &.thunder {
    background-image: url("../assets/images/thunder.jpg");
    background-color: #3a3b90;
  }
  &.rain {
    background-image: url("../assets/images/rain.jpg");
    background-color: #929ba0;
  }
  &.snow {
    background-image: url("../assets/images/snow.jpg");
    background-color: #d8d7dc;
    color: #2c3e50;
  }
  &.fog {
    background-image: url("../assets/images/fog.jpg");
    background-color: #dcd6ca;
    color: #2c3e50;
  }
  &.dust {
    background-image: url("../assets/images/dust.jpg");
    background-color: #e5c8aa;
  }
  &.tornado {
    background-image: url("../assets/images/tornado.jpg");
    background-color: #928d8db0;
  }
  &.wind {
    background-image: url("../assets/images/wind.jpg");
    background-color: #479add;
  }
  &.clouds {
    background-image: url("../assets/images/clouds.jpg");
    background-color: #015a96;
  }
  &.sun {
    background-image: url("../assets/images/sun.jpg");
    background-color: #468ad3;
  }
  &.night {
    background-image: url("../assets/images/night.jpg");
    background-color: #09090a;
  }
  &-content {
    margin-left: 0;
    width: 90%;
    height: 99%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}

.weather-summary {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 5%;
  height: 99%;
  width: 80%;
  text-align: left;
  @media (orientation: landscape) {
    width: 90%;
  }
  @media (orientation: portrait) {
    width: 50%;
  }
  &_row {
    font-size: calc(16px + (26 - 16) * ((100vw - 300px) / (1600 - 300)));
  }
}

.city-name {
  display: flex;
  flex-direction: row;
}

.reload-icon {
  padding-top: 0.2em;
  padding-left: 0.2em;
  width: calc(16px + (26 - 16) * ((100vw - 300px) / (1600 - 300)));
  cursor: pointer;
  &.reloading {
    animation: infinite-spin 0.5s infinite linear;
  }
}

.current-weather {
  text-transform: capitalize;
}

.icons {
  display: flex;
  flex-direction: column;
  position: relative;
  top: 20%;
  height: 75%;
  justify-content: space-between;
  @media (orientation: landscape) {
    width: 10%;
  }
  @media (orientation: portrait) {
    width: 20%;
  }
}

.weather-icon-container {
  width: 100%;
}

.sun-path {
  width: 100%;
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