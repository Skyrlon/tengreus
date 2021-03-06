<template>
  <div class="weather-current">
    <div class="feels-like-temp">
      <div class="fields">{{ $t("feels_like") }}</div>
      <div class="value">
        {{ convertTemperature(current.temperatures.feelsLike) }}
        <div class="units">
          {{ tempUnit }}
        </div>
      </div>
    </div>

    <div class="min-max-temp">
      <div class="fields">Min/Max</div>
      <div class="value">
        {{ convertTemperature(current.temperatures.min) }}/{{
          convertTemperature(current.temperatures.max)
        }}
        <div class="units">
          {{ tempUnit }}
        </div>
      </div>
    </div>

    <div class="pressure">
      <div class="fields">{{ $t("pressure") }}</div>
      <div class="value">
        {{ convertPressure(current.pressure) }}
        <div class="units">
          {{ pressureUnit }}
        </div>
      </div>
    </div>

    <div class="humidity">
      <div class="fields">{{ $t("humidity") }}</div>
      <div class="value">{{ current.humidity }}%</div>
    </div>

    <div class="visibility">
      <div class="fields">{{ $t("visibility") }}</div>
      <div class="value">
        {{ convertLength(current.visibility) }}
        <div class="units">
          {{ lengthUnit }}
        </div>
      </div>
    </div>

    <div class="wind">
      <div class="fields">{{ $t("wind") }}</div>
      <div class="value">
        <div class="wind-direction">
          <div class="arrow">
            <arrow-icon :degree="current.wind.deg" />
          </div>
          {{ $t(getWindDirection(current.wind.deg)) }}
        </div>
        {{ convertSpeed(current.wind.speed) }}
        <div class="units">
          {{ speedUnit }}
        </div>
      </div>
    </div>

    <div class="cloudiness">
      <div class="fields">{{ $t("cloudiness") }}</div>
      <div class="value">{{ current.cloudiness }}%</div>
    </div>

    <div class="moon-phase">
      <div class="fields">{{ $t("moon_phase") }}</div>
      <div class="value">{{ $t(getMoonPhase(current.time)) }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ArrowIcon from "@/components/icons/ArrowIcon.vue";

export default {
  name: "WeatherCurrent",
  components: { ArrowIcon },
  computed: {
    ...mapState([
      "tempUnit",
      "pressureUnit",
      "lengthUnit",
      "speedUnit",
      "current",
    ]),
  },
};
</script>

<style lang="scss">
.weather-current {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  left: 0%;
  width: 100%;
  height: 50%;
  box-sizing: border-box;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 1%;
  text-align: right;
  justify-content: space-between;
  & > div {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    border-top: 2px solid lightgrey;
    padding-left: 0.5em;
    padding-right: 1em;
    @media (orientation: landscape) {
      font-size: 95%;
      align-items: center;
      width: 45%;
      height: 49%;
    }
    @media (orientation: portrait) {
      align-items: center;
      width: 100%;
      height: 24%;
    }
    & .fields {
      text-align: left;
    }
    & .value {
      text-align: right;
    }
  }
  & .wind {
    min-height: 3em;
    & .value {
      text-transform: none;
    }
  }
  & .wind-direction {
    & .arrow {
      display: inline-block;
      width: 1.25em;
      height: 1.25em;
    }
  }
  & .moon-phase {
    min-height: 3em;
  }
}
</style>