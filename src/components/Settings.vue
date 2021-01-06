<template>
  <div class="settings">
    <div class="settings-form">
      <div class="row">Settings :</div>
      <div class="row">
        <div>Temperature :</div>
        <select id="temperature" @change="changeTemperature($event)">
          <option value="celsius" selected="selected">°C</option>
          <option value="fahrenheit">°F</option>
          <option value="kelvin">K</option>
        </select>
      </div>

      <div class="row">
        <div>Pressure :</div>
        <select id="pressure" @change="changePressure($event)">
          <option value="atmosphere">atm</option>
          <option value="bar">bar</option>
          <option value="hectopascal" selected="selected">hPa</option>
          <option value="pascal">Pa</option>
          <option value="psi">psi</option>
          <option value="torr">Torr</option>
        </select>
      </div>

      <div class="row">
        <div>Distance :</div>
        <select id="distance" @change="changeLength($event)">
          <option value="metric">metric</option>
          <option value="imperial">imperial</option>
        </select>
      </div>

      <div class="row">
        <div>Speed :</div>
        <select id="speed" @change="changeSpeed($event)">
          <option value="metric">metric</option>
          <option value="imperial">imperial</option>
        </select>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  methods: {
    changeTemperature(e) {
      this.$store.commit("CHANGE_TEMPERATURE_UNIT", e.target.value);
    },
    changePressure(e) {
      this.$store.commit("PRESSURE_CONVERTER", e.target.value);
    },
    changeLength(e) {
      this.$store.commit("LENGTH_CONVERTER", e.target.value);
    },
    changeSpeed(e) {
      this.$store.commit("SPEED_CONVERTER", e.target.value);
    },
  },
};
</script>

<style lang="scss" scoped>
.settings {
  position: absolute;
  display: flex;
  top: 0;
  right: 0;
  justify-content: space-between;
  background: green;

  &-form {
    display: flex;
    flex-direction: column;
    justify-content: left;

    & .row {
      display: flex;
      padding: 1em;
    }
  }
}
</style>