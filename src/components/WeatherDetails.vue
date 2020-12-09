<template>
  <div class="weather-details">
    <div class="parameters">
      Parameters :
      <select
        id="temperature"
        @change="temperatureConverter($event)"
        v-model="temperatureUnity"
      >
        <option value="celsius">°C</option>
        <option value="farenheit">°F</option>
        <option value="kelvin">°K</option>
      </select>
      <select id="pressure"></select>
      <select id="distance"></select>
      <select id="speed"></select>
    </div>
    <section>
      <div class="feels-like-temp">
        Feels like : {{ feelsLikeTemp }}°C
      </div>
      <div class="min-max-temp">
        Min/max temperature : {{ minTemp }}/{{
          maxTemp
        }}°C
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
      <div class="moon-phase">Moon phase : {{ moonPhase }}</div>
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
import { mapState } from "vuex";

export default {
  name: "WeatherDetails",
  computed: {
    ...mapState([
      "feelsLikeTemp",
      "minTemp",
      "maxTemp",
      "pressure",
      "humidity",
      "visibility",
      "windSpeed",
      "windDeg",
      "windGust",
      "cloudiness",
      "rainInLast1H",
      "rainInLast3H",
      "snowInLast1H",
      "snowInLast3H",
      "sunrise",
      "sunset",
      "moonPhase",
    ]),
  },
  methods: {
    temperatureConverter() {
      if (this.temperatureUnity == "celsius") {
        this.feelLikeTemperatureConverted = this.feelLikeTemperature;
        this.minTemperatureConverted = this.minTemperature;
        this.maxTemperatureConverted = this.maxTemperature;
      }
      if (this.temperatureUnity == "farenheit") {
        this.feelLikeTemperatureConverted = this.feelLikeTemperature * 1.8 + 32;
        this.minTemperatureConverted = this.minTemperature * 1.8 + 32;
        this.maxTemperatureConverted = this.maxTemperature * 1.8 + 32;
      }
      if (this.temperatureUnity == "kelvin") {
        this.feelLikeTemperatureConverted = this.feelLikeTemperature + 273.15;
        this.maxTemperatureConverted = this.maxTemperature + 273.15;
        this.minTemperatureConverted = this.minTemperature + 273.15;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.weather-details {
  padding-top: 2%;
  display: flex;
  font-size: medium;
  text-align: left;
  flex: 1 1 auto;
  justify-content: space-between;

  & section {
    display: flex;
    flex-direction: column;
    flex: 1;
    &:nth-child(-n + 3) {
      border-right: 2px solid green;
    }
    & div {
      padding: 1.5em 15%;
    }
  }
}

.parameters {
  position: absolute;
}
</style>