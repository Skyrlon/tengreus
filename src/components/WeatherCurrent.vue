<template>
  <div class="weather-current" :class="{ active: isActive }">
    <div class="feels-like-temp">
      Feels like : {{ convertTemperature(temperatures.feelsLike)
      }}{{ tempUnit }}
    </div>
    <div class="min-max-temp">
      Min/max temperature : {{ convertTemperature(temperatures.min) }}/{{
        convertTemperature(temperatures.max)
      }}{{ tempUnit }}
    </div>
    <div class="pressure">
      Pressure : {{ convertPressure(pressure) }} {{ pressureUnit }}
    </div>
    <div class="humidity">Humidity : {{ humidity }}%</div>
    <div class="visibility">
      Visibility : {{ convertLength(visibility) }}{{ lengthUnit }}
    </div>
    <div class="wind">
      Wind :
      <div class="wind-direction">
        <arrow-icon :degree="wind.deg" />
      </div>
      {{ getWindDirection(wind.deg) }}
      {{ convertSpeed(wind.speed) }}{{ speedUnit }}
    </div>
    <div class="cloudiness">Cloudiness : {{ cloudiness }}%</div>
    <div class="moon-phase">Moon phase : {{ getMoonPhase(time) }}</div>
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