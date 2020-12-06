<template>
  <div class="weather-details">
    <div class="">Feels like : {{ feelLikeTemperature }}°C</div>
    <div class="">
      Min/max temperature : {{ minTemperature }}/{{ maxTemperature }}°C
    </div>
    <div class="">Pressure : {{ pressure }}hPA</div>
    <div class="">Humidity : {{ humidity }}%</div>
    <div class="">Visibility : {{ visibility }}m</div>
    <div class="">Wind speed : {{ windSpeed }}m/s</div>
    <div class="">Wind direction : {{ windDeg }}°</div>
    <div class="">Wind Gust : {{ windGust }}m/s</div>
    <div class="">Cloudiness : {{ cloudiness }}%</div>
    <div class="">Rain volume for the last hour : {{ rainInLast1H }}mm</div>
    <div class="">Rain volume for the last 3 hours : {{ rainInLast3H }}mm</div>
    <div class="">Snow volume for the last hour : {{ snowInLast1H }}mm</div>
    <div class="">Snow volume for the last 3 hours : {{ snowInLast3H }}mm</div>
  </div>
</template>

<script>
export default {
  name: "WeatherDetails",
  data() {
    return {
      feelLikeTemperature: -10,
      minTemperature: -11,
      maxTemperature: -9,
      pressure: 1023,
      humidity: 100,
      visibility: 16093,
      windSpeed: 1.5,
      windDeg: 350,
      windGust: 3,
      cloudiness: 1,
      rainInLast1H: 0,
      rainInLast3H: 0,
      snowInLast1H: 0,
      snowInLast3H: 0,
      sunrise: "7:00",
      sunset: "17:00",
    };
  },
};
</script>

<style lang="scss" scoped>
.weather-details {
  font-size: 1em;
  text-align: left;
  flex-wrap: wrap;
  flex: 1 1 auto;
  column-count: 3;

  & div {
    padding: 1em;
  }
}
</style>