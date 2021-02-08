<template>
  <div class="weather-current" :class="{ active: isActive }">
    <div class="feels-like-temp">
      <div class="fields">{{ $t("feels_like") }} :</div>
      <div class="value">
        {{ convertTemperature(temperatures.feelsLike) }}
        <div class="units">
          {{ tempUnit }}
        </div>
      </div>
    </div>

    <div class="min-max-temp">
      <div class="fields">Min/Max :</div>
      <div class="value">
        {{ convertTemperature(temperatures.min) }}/{{
          convertTemperature(temperatures.max)
        }}
        <div class="units">
          {{ tempUnit }}
        </div>
      </div>
    </div>

    <div class="pressure">
      <div class="fields">{{ $t("pressure") }} :</div>
      <div class="value">
        {{ convertPressure(pressure) }}
        <div class="units">
          {{ pressureUnit }}
        </div>
      </div>
    </div>

    <div class="humidity">
      <div class="fields">{{ $t("humidity") }} :</div>
      <div class="value">{{ humidity }}%</div>
    </div>

    <div class="visibility">
      <div class="fields">{{ $t("visibility") }} :</div>
      <div class="value">
        {{ convertLength(visibility) }}
        <div class="units">
          {{ lengthUnit }}
        </div>
      </div>
    </div>

    <div class="wind">
      <div class="fields">{{ $t("wind") }} :</div>
      <div class="value">
        <div class="wind-direction">
          <arrow-icon :degree="wind.deg" />
        </div>
        {{ $t(getWindDirection(wind.deg)) }}
        {{ convertSpeed(wind.speed) }}
        <div class="units">
          {{ speedUnit }}
        </div>
      </div>
    </div>

    <div class="cloudiness">
      <div class="fields">{{ $t("cloudiness") }} :</div>
      <div class="value">{{ cloudiness }}%</div>
    </div>

    <div class="moon-phase">
      <div class="fields">{{ $t("moon_phase") }} :</div>
      <div class="value">{{ $t(getMoonPhase(time)) }}</div>
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
  height: 50%;
  box-sizing: border-box;
  padding-left: 5%;
  padding-right: 5%;
  padding-top: 2.5%;
  font-size: medium;
  text-align: left;
  flex: 1 1 auto;
  justify-content: space-between;
  transition: 1s;
  &.active {
    left: 0;
  }
  & > div {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    border-top: 2px solid lightgrey;
    padding-left: 0.5em;
    padding-right: 1em;
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
}
</style>