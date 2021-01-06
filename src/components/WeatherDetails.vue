<template>
  <div class="weather-details">
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
        Pressure : {{ pressure.converted }} {{ pressureUnit }}
      </div>
      <div class="humidity">Humidity : {{ humidity }}%</div>
    </section>

    <section>
      <div class="visibility">
        Visibility : {{ visibility.converted }}{{ lengthUnit }}
      </div>
      <div class="wind">
        Wind : <compass-icon :degree="wind.deg" /> {{ wind.speedConverted
        }}{{ speedUnit }} with gust of {{ wind.gustConverted }}{{ speedUnit }}
      </div>
      <div class="cloudiness">Cloudiness : {{ cloudiness }}%</div>
      <div class="moon-phase">Moon phase : {{ getMoonPhase }}</div>
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
import { mapGetters, mapState } from "vuex";
import CompassIcon from "@/components/icons/CompassIcon.vue";

export default {
  components: { CompassIcon },
  name: "WeatherDetails",
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
      "sunrise",
      "sunset",
      "moonPhase",
    ]),
    ...mapGetters(["getMoonPhase"]),
  },
};
</script>

<style lang="scss">
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
    & > div {
      padding: 1.5em 15%;
    }
  }
}
</style>