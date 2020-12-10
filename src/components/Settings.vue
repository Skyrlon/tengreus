<template>
  <div class="settings">
    Settings :
    <select
      id="temperature"
      @change="temperatureConverter($event)"
      v-model="temperatureUnity"
    >
      <option value="celsius">°C</option>
      <option value="fahrenheit">°F</option>
      <option value="kelvin">K</option>
    </select>
    <select id="pressure"></select>
    <select id="distance"></select>
    <select id="speed"></select>
  </div>
</template>

<script>
export default {
  name: "Settings",
  methods: {
    temperatureConverter(e) {
      this.$store.commit("MEASUREMENT_UNIT_CONVERTER", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.settings {
  position: absolute;
  top: 0;
  right: 0;
}
</style>