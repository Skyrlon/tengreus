<template>
  <div class="weather-card">
    <weather-banner />
    <weather-details />
  </div>
</template>

<script>
import WeatherBanner from "@/components/WeatherBanner.vue";
import WeatherDetails from "@/components/WeatherDetails.vue";

export default {
  name: "WeatherCard",
  components: {
    WeatherBanner,
    WeatherDetails,
  },
};
</script>

<style lang="scss" scoped>
.weather-card {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  & .footer {
      flex: 0 1 40px;
  }
}
</style>