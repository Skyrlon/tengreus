<template>
  <div class="weather-details">
    <section>
      <div class="feels-like-temp">
        Feels like : {{ feelLikeTemperature }}°C
      </div>
      <div class="min-max-temp">
        Min/max temperature : {{ minTemperature }}/{{ maxTemperature }}°C
      </div>
      <div class="pressure">Pressure : {{ pressure }}hPA</div>
      <div class="humidity">Humidity : {{ humidity }}%</div>
    </section>

    <section>
      <div class="visibility">Visibility : {{ visibility }}m</div>
      <div class="wind">
        Wind : {{ windDeg }}° {{ windSpeed }}m/s with gust of {{ windGust }}m/s
      </div>
      <div class="cloudiness">Cloudiness : {{ cloudiness }}%</div>
      <div class="moon-phase">Moon phase : Waning Gibbous</div>
    </section>

    <section>
      <div class="rain-last-hour">
        Rain volume for the last hour : {{ rainInLast1H }}mm
      </div>
      <div class="rain-last-three-hours">
        Rain volume for the last 3 hours : {{ rainInLast3H }}mm
      </div>
      <div class="snow-last-hour">
        Snow volume for the last hour : {{ snowInLast1H }}mm
      </div>
      <div class="snow-last-three-hours">
        Snow volume for the last 3 hours : {{ snowInLast3H }}mm
      </div>
    </section>
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
  display: flex;
  border: 5px solid;
  font-size: 1em;
  text-align: left;
  flex: 1 1 auto;
  justify-content: space-between;

  & section {
    display: flex;
    flex-direction: column;
    border: 1px solid;
    flex: 1;
    justify-content: center;
    & div {
      padding: 1.5em;
    }
  }
}
</style>