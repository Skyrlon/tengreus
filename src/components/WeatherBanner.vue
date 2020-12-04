<template>
  <div class="banner">
    <div class="weather-summary">
      <div class="city-name">City Name</div>
      <div class="hour">08:45</div>
      <div class="temperature">-15°C</div>
      <div class="current-weather">Current Weather</div>
    </div>

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
</template>

<script>
export default {
  name: "WeatherBanner",
};
</script>

<style lang="scss" scoped>
.banner {
  position: absolute;
  width: 100%;
  height: 50vh;
  background-image: url("https://via.placeholder.com/1536x320.png/0000FF?text=Banner");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  color: white;
}

.weather-summary {
  position: absolute;
  top: 10%;
  left: 5%;
  text-align: left;
}

.city-name {
  margin: 0;
  font-size: 2.5em;
}

.hour {
  font-size: 2em;
  padding-top: 0.5em;
}

.temperature {
  font-size: 2em;
  padding-top: 0.5em;
}

.current-weather {
  font-size: 1.75em;
  padding-top: 0.5em;
}

.weather-icon {
  position: absolute;
  bottom: 0;
  right: 5%;
  width: 200px;
  height: 200px;
}

svg {
  height: 50%;
  width: 50%;
}
path {
  fill: white;
  stroke: black;
  stroke-width: 2;
  stroke-linejoin: round;
}
</style>