<template>
  <div class="banner">
    <div class="weather-summary">
      <div class="city-name">{{ city }}</div>
      <div class="hour">{{ time }}</div>
      <div class="temperature">{{ temperature }}°C</div>
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
export default {
  name: "WeatherBanner",
  data() {
    return {
      city: "City Name",
      time: "11:54",
      temperature: -15,
      weather: "Current Weather",
    };
  },
};
</script>

<style lang="scss" scoped>
.banner {
  position: fixed;
  width: 100%;
  background-image: url("https://via.placeholder.com/1536x320.png/0000FF?text=Banner");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: white;
}

.weather-summary {
  position: relative;
  width: 90%;
  height: 50%;
  margin: 5%;
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
  top: 15%;
  right: 0;
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