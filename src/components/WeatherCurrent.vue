<template>
  <div class="weather-current" :class="{ active: isActive }">
    <div class="feels-like-temp">
      {{ $t("feels_like") }} : {{ convertTemperature(temperatures.feelsLike) }}
      <div class="units">
        {{ tempUnit }}
      </div>
    </div>

    <div class="min-max-temp">
      Min/Max : {{ convertTemperature(temperatures.min) }}/{{
        convertTemperature(temperatures.max)
      }}
      <div class="units">
        {{ tempUnit }}
      </div>
    </div>

    <div class="pressure">
      {{ $t("pressure") }} : {{ convertPressure(pressure) }}
      <div class="units">
        {{ pressureUnit }}
      </div>
    </div>

    <div class="humidity">{{ $t("humidity") }} : {{ humidity }}%</div>

    <div class="visibility">
      {{ $t("visibility") }} : {{ convertLength(visibility) }}
      <div class="units">
        {{ lengthUnit }}
      </div>
    </div>

    <div class="wind">
      {{ $t("wind") }} :
      <div class="wind-direction">
        <arrow-icon :degree="wind.deg" />
      </div>
      {{ $t(getWindDirection(wind.deg)) }}
      {{ convertSpeed(wind.speed) }}
      <div class="units">
        {{ speedUnit }}
      </div>
    </div>

    <div class="cloudiness">{{ $t("cloudiness") }} : {{ cloudiness }}%</div>

    <div class="moon-phase">
      {{ $t("moon_phase") }} : {{ $t(getMoonPhase(time)) }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ArrowIcon from "@/components/icons/ArrowIcon.vue";

export default {
  name: "WeatherCurrent",
  components: { ArrowIcon },
  props: {
    isActive: Boolean,
  },
  computed: {
    ...mapState([
      "tempUnit",
      "pressureUnit",
      "lengthUnit",
      "speedUnit",
      "temperatures",
      "pressure",
      "humidity",
      "visibility",
      "wind",
      "cloudiness",
      "time",
      "sunrise",
      "sunset",
      "moonPhase",
    ]),
  },
};
</script>

<style lang="scss">
.weather-current {
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  left: -100%;
  width: 100%;
  font-size: medium;
  text-align: left;
  flex: 1 1 auto;
  justify-content: space-between;
  transition: 1s;
  &.active {
    left: 0;
  }
  & > div {
    box-sizing: border-box;
    margin-top: 3em;
    padding-left: 5em;
    width: 50%;
  }
  & .wind-direction {
    display: inline-block;
    width: 1em;
    height: 1em;
  }
}
</style>