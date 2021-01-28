<template>
  <div class="settings">
    <div class="settings-form">
      <div class="row">Settings :</div>
      <div class="row">
        <div>Temperature :</div>
        <select
          id="temperature"
          @change="changeTemperature($event)"
          v-model="tempUnitSelected"
        >
          <option value="celsius">°C</option>
          <option value="fahrenheit">°F</option>
          <option value="kelvin">K</option>
        </select>
      </div>

      <div class="row">
        <div>Pressure :</div>
        <select
          id="pressure"
          @change="changePressure($event)"
          v-model="pressureUnitSelected"
        >
          <option value="atmosphere">atm</option>
          <option value="bar">bar</option>
          <option value="hectopascal">hPa</option>
          <option value="pascal">Pa</option>
          <option value="psi">psi</option>
          <option value="torr">Torr</option>
        </select>
      </div>

      <div class="row">
        <div>Distance :</div>
        <select
          id="distance"
          @change="changeLength($event)"
          v-model="lengthUnitSelected"
        >
          <option value="metric">metric</option>
          <option value="imperial">imperial</option>
        </select>
      </div>

      <div class="row">
        <div>Speed :</div>
        <select
          id="speed"
          @change="changeSpeed($event)"
          v-model="speedUnitSelected"
        >
          <option value="metric">metric</option>
          <option value="imperial">imperial</option>
        </select>
      </div>

      <div class="row">
        <button @click="resetLocalStorage">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  created() {
    this.tempUnitSelected = localStorage.getItem("tempUnit")
      ? localStorage.getItem("tempUnit")
      : "celsius";
    this.pressureUnitSelected = localStorage.getItem("pressureUnit")
      ? localStorage.getItem("pressureUnit")
      : "hectopascal";
    this.lengthUnitSelected = localStorage.getItem("lengthUnit")
      ? localStorage.getItem("lengthUnit")
      : "metric";
    this.speedUnitSelected = localStorage.getItem("speedUnit")
      ? localStorage.getItem("speedUnit")
      : "metric";
  },

  data() {
    return {
      tempUnitSelected: "",
      pressureUnitSelected: "",
      lengthUnitSelected: "",
      speedUnitSelected: "",
    };
  },

  methods: {
    changeTemperature(e) {
      this.$store.commit("CHANGE_TEMPERATURE_UNIT", e.target.value);
    },
    changePressure(e) {
      this.$store.commit("CHANGE_PRESSURE_UNIT", e.target.value);
    },
    changeLength(e) {
      this.$store.commit("CHANGE_LENGTH_UNIT", e.target.value);
    },
    changeSpeed(e) {
      this.$store.commit("CHANGE_SPEED_UNIT", e.target.value);
    },
    resetLocalStorage() {
      this.$store.commit("RESET_LOCAL_STORAGE");
      this.tempUnitSelected =  "celsius";
      this.pressureUnitSelected =  "hectopascal";
      this.lengthUnitSelected =  "metric";
      this.speedUnitSelected =  "metric";
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