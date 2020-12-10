<template>
  <div class="weather-card">
    <weather-banner />
    <weather-details />
    <settings />
  </div>
</template>

<script>
import WeatherBanner from "@/components/WeatherBanner.vue";
import WeatherDetails from "@/components/WeatherDetails.vue";
import Settings from "@/components/Settings.vue";

export default {
  name: "WeatherCard",
  components: {
    WeatherBanner,
    WeatherDetails,
    Settings,
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