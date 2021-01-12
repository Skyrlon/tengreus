<template>
  <div class="weather-current" :class="{ active: isActive }">
    <section>
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
    </section>

    <section>
      <div class="visibility">
        Visibility : {{ convertLength(visibility) }}{{ lengthUnit }}
      </div>
      <div class="wind">
        Wind :
        <div class="wind-direction">
          <arrow-icon :degree="wind.deg" />
        </div>
        {{ convertSpeed(wind.speed) }}{{ speedUnit }} with gust of
        {{ convertSpeed(wind.gust) }}{{ speedUnit }}
      </div>
      <div class="cloudiness">Cloudiness : {{ cloudiness }}%</div>
      <div class="moon-phase">Moon phase : {{ getMoonPhase(time) }}</div>
    </section>

    <section>
      <div class="rain-last-hour">
        Rain volume for the last hour : {{ precipitation.rainLast1H }}mm
      </div>
      <div class="rain-last-three-hours">
        Rain volume for the last 3 hours : {{ precipitation.rainLast3H }}mm
      </div>
      <div class="snow-last-hour">
        Snow volume for the last hour : {{ precipitation.snowLast1H }}mm
      </div>
      <div class="snow-last-three-hours">
        Snow volume for the last 3 hours : {{ precipitation.snowLast3H }}mm
      </div>
    </section>
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
      "precipitation",
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
  left: -100%;
  width: 100%;
  font-size: medium;
  text-align: left;
  flex: 1 1 auto;
  justify-content: space-between;
  transition: 0.5s;
  &.active {
    left: 0;
  }

  & section {
    display: flex;
    flex-direction: column;
    flex: 1;
    &:nth-child(-n + 3) {
      border-right: 2px solid green;
    }
    & > div {
      padding: 1.5em 15%;
    }
  }
  & .wind {
    display: flex;
    flex-direction: row;
    &-direction {
      width: 1em;
    }
  }
}
</style>