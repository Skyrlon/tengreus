<template>
  <div :class="'banner ' + getWeather(current.weather.main)">
    <div class="banner-content">
      <div class="weather-summary">
        <div class="weather-summary_row city-name">
          {{ city.name[this.$i18n.locale || "en"] }}
          <div
            class="reload-icon"
            :class="{ reloading: isReloading }"
            @click="reloadData"
          >
            <reload-icon :isBlackOrWhite="getReloadIconColor" />
            <div class="reload-icon_tooltip">Wait {{ tooltipText }}</div>
          </div>
        </div>
        <div class="weather-summary_row hour">
          {{ convertTime(current.time) }}
        </div>
        <div class="weather-summary_row temperature">
          {{ convertTemperature(current.temperatures.current) }}{{ tempUnit }}
        </div>
        <div class="weather-summary_row current-weather">
          {{ current.weather.detailed[this.$i18n.locale || "en"] }}
        </div>
      </div>
      <div class="icons">
        <div class="weather-icon-container">
          <weather-icon
            :weatherMain="current.weather.main"
            :weatherId="current.weather.id"
            :time="current.time"
            :sunrise="current.sunrise"
            :sunset="current.sunset"
            :moonPhase="getMoonPhase(current.time)"
          />
        </div>
        <div class="sun-path">
          <sun-path-icon
            :time="current.time"
            :sunRise="current.sunrise"
            :sunSet="current.sunset"
            :textColor="getReloadIconColor"
          />
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
    ...mapState(["tempUnit", "city", "current"]),
    getReloadIconColor() {
      let color;
      if (
        ["rain", "night", "clouds", "tornado"].includes(
          this.getWeather(this.current.weather.main)
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
      showTimeLeft: false,
      showDuration: 0,
      timeOutStart: 0,
      tooltipText: "",
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
        this.current.time > this.current.sunrise &&
        this.current.time < this.current.sunset
      ) {
        return "sun";
      } else if (
        weather === "Clear" &&
        (this.current.time < this.current.sunrise ||
          this.current.time > this.current.sunset)
      ) {
        return "night";
      }
    },

    reloadData() {
      let timeLeft, timeLeftMinutes, timeLeftSecondes, myInterval;
      this.clickCount++;
      if (this.clickCount < 2) {
        this.$store.dispatch("getWeather", {
          id: this.city.id,
          longitude: this.city.lon,
          latitude: this.city.lat,
        });
        setTimeout(() => {
          this.isReloading = false;
        }, 1000);
        this.timeOutStart = Date.now();
        console.log(this.timeOutStart);
        setTimeout(() => {
          this.clickCount = 0;
        }, 300000);
      } else if (this.showTimeLeft === false && this.showDuration === 0) {
        this.showTimeLeft = true;
        myInterval = setInterval(() => {
          this.showDuration++;
          timeLeft = (this.timeOutStart + 300000 - Date.now()) / 1000;
          timeLeftMinutes = Math.floor(timeLeft / 60);
          timeLeftSecondes = Math.floor(timeLeft % 60);
          this.tooltipText = timeLeftMinutes + ":" + timeLeftSecondes;
          if (this.showDuration >= 5) {
            clearInterval(myInterval);
            this.showTimeLeft = false;
            this.showDuration = 0;
          }
        }, 1000);
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
  position: relative;
  padding-top: 0.2em;
  padding-left: 0.2em;
  width: calc(16px + (26 - 16) * ((100vw - 300px) / (1600 - 300)));
  cursor: pointer;
  &.reloading {
    animation: infinite-spin 0.5s infinite linear;
  }
  &_tooltip {
    position: absolute;
    top: -25%;
    left: 150%;
    padding: 25%;
    background-color: var(--darktheme-background-color);
    font-size: 75%;
    &::after {
      content: " ";
      position: absolute;
      top: 50%;
      right: 100%;
      margin-top: -10px;
      border-width: 10px;
      border-style: solid;
      border-color: transparent var(--darktheme-background-color) transparent
        transparent;
    }
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

  &_sunrise {
    left: -0.25em;
    font-size: 90%;
  }
  &_sunset {
    right: -0.75em;
    font-size: 90%;
  }
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