<template>
  <div class="settings">
    Settings :
    <select id="temperature" @change="changeTemperature($event)">
      <option value="celsius" selected="selected">°C</option>
      <option value="fahrenheit">°F</option>
      <option value="kelvin">K</option>
    </select>

    <select id="pressure" @change="changePressure($event)">
      <option value="atmosphere">atm</option>
      <option value="bar">bar</option>
      <option value="hectopascal" selected="selected">hPa</option>
      <option value="pascal">Pa</option>
      <option value="psi">psi</option>
      <option value="torr">Torr</option>
    </select>

    <select id="distance"></select>

    <select id="speed"></select>
  </div>
</template>

<script>
export default {
  name: "Settings",
  methods: {
    changeTemperature(e) {
      this.$store.commit("TEMPERATURE_CONVERTER", e.target.value);
    },
    changePressure(e) {
      this.$store.commit("PRESSURE_CONVERTER", e.target.value);
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