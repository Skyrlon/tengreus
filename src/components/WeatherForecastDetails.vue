<template>
  <div class="weather-forecast-details">
    <div class="weather-forecast-details-icon">
      <weather-card
        :WeatherData="ForecastData"
        :Day="dayOfTheWeek(ForecastData.dt)"
      >
        <div class="weather-forecast-details-link" @click="$emit('go-back')">
          {{ $t("back") }}
        </div>
      </weather-card>
    </div>
    <div class="weather-forecast-details-text">
      <div class="feels-like-temp">
        <div class="fields">{{ $t("feels_like") }}</div>
        <div class="value">
          {{ convertTemperature(ForecastData.feels_like.day) }}
          <div class="units">
            {{ tempUnit }}
          </div>
          ({{ $t("day") }}) <br />
          {{ convertTemperature(ForecastData.feels_like.night) }}
          <div class="units">
            {{ tempUnit }}
          </div>
          ({{ $t("night") }})
        </div>
      </div>
      <div class="min-max-temp">
        <div class="fields">Min/Max</div>
        <div class="value">
          {{ convertTemperature(ForecastData.temp.min) }}/{{
            convertTemperature(ForecastData.temp.max)
          }}
          <div class="units">
            {{ tempUnit }}
          </div>
        </div>
      </div>
      <div class="pressure">
        <div class="fields">{{ $t("pressure") }}</div>
        <div class="value">
          {{ convertPressure(ForecastData.pressure) }}
          <div class="units">
            {{ pressureUnit }}
          </div>
        </div>
      </div>
      <div class="humidity">
        <div class="fields">{{ $t("humidity") }}</div>
        <div class="value">{{ ForecastData.humidity }}%</div>
      </div>
      <div class="wind">
        <div class="fields">{{ $t("wind") }}</div>
        <div class="value">
          <div class="wind-direction">
            <arrow-icon :degree="ForecastData.wind_deg" />
          </div>
          {{ $t(getWindDirection(ForecastData.wind_deg)) }}
          {{ convertSpeed(ForecastData.wind_speed) }}
          <div class="units">
            {{ speedUnit }}
          </div>
        </div>
      </div>
      <div class="cloudiness">
        <div class="fields">{{ $t("cloudiness") }}</div>
        <div class="value">{{ ForecastData.clouds }}%</div>
      </div>
      <div class="moon-phase">
        <div class="fields">{{ $t("moon_phase") }}</div>
        <div class="value">{{ $t(getMoonPhase(ForecastData.dt)) }}</div>
      </div>
      <div class="sun-rise-set">
        <div class="fields">{{ $t("sun_rise_set") }}</div>
        <div class="value">
          {{ $t(convertTime(ForecastData.sunrise)) }}-{{
            $t(convertTime(ForecastData.sunset))
          }}
        </div>
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
  position: absolute;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  box-sizing: border-box;
  padding-top: 2.5%;
  padding-left: 1%;
  padding-right: 1%;
  &-icon {
    margin-left: 1%;
    width: 10%;
    @media (min-width: 1025px) and (orientation: landscape) {
      width: 10%;
    }
    @media (max-width: 1024px) and (min-width: 500px) {
      margin-top: 1%;
      margin-bottom: 1%;
      width: 20%;
    }
    @media (max-width: 600px) {
      margin-top: 1%;
      margin-bottom: 1%;
      width: 40%;
    }
  }
  &-text {
    display: flex;
    flex-wrap: wrap;
    width: 90%;
    font-size: 1em;
    margin-left: 1%;
    text-align: left;
    @media (min-width: 1025px) and (orientation: landscape) {
      width: 90%;
    }
    @media (max-width: 1024px) and (min-width: 500px) {
      margin-top: 1%;
      margin-bottom: 1%;
      width: 80%;
    }
    @media (max-width: 600px) {
      margin-top: 1%;
      margin-bottom: 1%;
      width: 60%;
    }

    & > div {
      display: flex;
      justify-content: space-between;
      box-sizing: border-box;
      border-top: 2px solid lightgrey;
      padding-left: 0.5em;
      padding-right: 1em;
      margin-left: 0.5%;
      margin-right: 0.5%;
      @media (orientation: landscape) {
        padding-top: 1.25%;
        padding-bottom: 1.25%;
        width: 45%;
      }
      @media (orientation: portrait) {
        padding-top: 2.5%;
        padding-bottom: 2.5%;
        width: 100%;
      }
    }
    & .wind-direction {
      display: inline-block;
      width: 1em;
      height: 1em;
    }
    & .sun-rise-set {
      text-transform: none;
    }
    & .value {
      text-align: right;
    }
  }
}
</style>