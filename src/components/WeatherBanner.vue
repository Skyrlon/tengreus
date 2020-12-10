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
        <svg viewBox="0 0 105 105">
          <path
            d="M 25,60 
           a 20,20 1 0,0 0,40 
           h 50 
           a 20,20 1 0,0 0,-40 
           a 10,10 1 0,0 -15,-10 
           a 15,15 1 0,0 -35,10  
           z"
          />
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "WeatherBanner",
  computed: {
    ...mapState([
      "tempUnit",
      "temperatures",
      "city",
      "time",
      "currentTemp",
      "weather",
    ]),
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
path {
  fill: white;
  stroke: black;
  stroke-width: 2;
  stroke-linejoin: round;
}
</style>