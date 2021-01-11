<template>
  <div class="weather-forecast-details">
    <weather-card :WeatherData="ForecastData" :Title="ForecastData.dt" />
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
      Pressure : {{ convertPressure(ForecastData.pressure) }} {{ pressureUnit }}
    </div>
    <div class="humidity">Humidity : {{ ForecastData.humidity }}%</div>
    <div class="wind">
      Wind : <compass-icon :degree="ForecastData.wind_deg" />
      {{ convertSpeed(ForecastData.wind_speed) }}{{ speedUnit }}
    </div>
    <div class="cloudiness">Cloudiness : {{ ForecastData.cloudiness }}%</div>
    <div class="moon-phase">
      Moon phase : {{ getMoonPhase(ForecastData.dt) }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import CompassIcon from "@/components/icons/CompassIcon.vue";
import WeatherCard from "./WeatherCard.vue";

export default {
  components: { WeatherCard, CompassIcon },
  name: "WeatherForecastDetails",
  props: {
    ForecastData: Object,
  },
  computed: {
    ...mapState(["tempUnit", "pressureUnit", "lengthUnit", "speedUnit"]),
  },
};
</script>

<style>
.weather-forecast-details {
  display: flex;
}
</style>