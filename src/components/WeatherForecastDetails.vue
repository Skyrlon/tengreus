<template>
  <div class="weather-forecast-details">
    <div class="weather-forecast-details-icon">
      <weather-card :WeatherData="ForecastData" :Title="ForecastData.dt">
        <div class="weather-forecast-details-link" @click="$emit('go-back')">
          Back
        </div>
      </weather-card>
    </div>
    <div class="weather-forecast-details-text">
      <div class="feels-like-temp">
        Feels like : {{ convertTemperature(ForecastData.feels_like.day)
        }}{{ tempUnit }}
      </div>
      <div class="min-max-temp">
        Min/max temperature : {{ convertTemperature(ForecastData.temp.min) }}/{{
          convertTemperature(ForecastData.temp.max)
        }}{{ tempUnit }}
      </div>
      <div class="pressure">
        Pressure : {{ convertPressure(ForecastData.pressure) }}
        {{ pressureUnit }}
      </div>
      <div class="humidity">Humidity : {{ ForecastData.humidity }}%</div>
      <div class="wind">
        Wind :
        <div class="wind-direction">
          <arrow-icon :degree="ForecastData.wind_deg" />
        </div>
        {{ convertSpeed(ForecastData.wind_speed) }}{{ speedUnit }}
      </div>
      <div class="cloudiness">Cloudiness : {{ ForecastData.clouds }}%</div>
      <div class="moon-phase">
        Moon phase : {{ getMoonPhase(ForecastData.dt) }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ArrowIcon from "@/components/icons/ArrowIcon.vue";
import WeatherCard from "./WeatherCard.vue";

export default {
  components: { WeatherCard, ArrowIcon },
  name: "WeatherForecastDetails",
  props: {
    ForecastData: Object,
  },
  computed: {
    ...mapState(["tempUnit", "pressureUnit", "lengthUnit", "speedUnit"]),
  },
};
</script>

<style lang="scss">
.weather-forecast-details {
  display: flex;
  width: 100%;
  flex-direction: row;
  & > div:nth-child(1) {
    width: 20%;
  }
  &-text {
    display: flex;
    flex-wrap: wrap;
    & > div {
      justify-content: center;
      width: 50%;
    }
    & .wind {
      display: flex;
      flex-direction: row;
      &-direction {
        width: 1em;
        height: 1em;
      }
    }
  }
}
</style>