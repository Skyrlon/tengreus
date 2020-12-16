<template>
  <div class="settings" :class="{ active: isActive }">
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
    <div class="settings-icon" @click="showSettings">
      <svg
        version="1.1"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <path
          d="M22.2,14.4L21,13.7c-1.3-0.8-1.3-2.7,0-3.5l1.2-0.7c1-0.6,1.3-1.8,0.7-2.7l-1-1.7c-0.6-1-1.8-1.3-2.7-0.7
            L18,5.1c-1.3,0.8-3-0.2-3-1.7V2c0-1.1-0.9-2-2-2h-2C9.9,0,9,0.9,9,2v1.3c0,1.5-1.7,2.5-3,1.7L4.8,4.4c-1-0.6-2.2-0.2-2.7,0.7
            l-1,1.7C0.6,7.8,0.9,9,1.8,9.6L3,10.3C4.3,11,4.3,13,3,13.7l-1.2,0.7c-1,0.6-1.3,1.8-0.7,2.7l1,1.7c0.6,1,1.8,1.3,2.7,0.7L6,18.9
            c1.3-0.8,3,0.2,3,1.7V22c0,1.1,0.9,2,2,2h2c1.1,0,2-0.9,2-2v-1.3c0-1.5,1.7-2.5,3-1.7l1.2,0.7c1,0.6,2.2,0.2,2.7-0.7l1-1.7
            C23.4,16.2,23.1,15,22.2,14.4z M12,16c-2.2,0-4-1.8-4-4c0-2.2,1.8-4,4-4s4,1.8,4,4C16,14.2,14.2,16,12,16z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "Settings",
  data() {
    return {
      isActive: false,
    };
  },
  methods: {
    showSettings() {
      if (this.isActive == true) {
        this.isActive = false;
      } else if (this.isActive == false) {
        this.isActive = true;
      }
    },
    changeTemperature(e) {
      this.$store.commit("TEMPERATURE_CONVERTER", e.target.value);
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
  width: 20%;
  justify-content: space-between;
  background: green;
  &.active {
    & .settings-form {
      display: flex;
    }
  }
  &-form {
    display: none;
    flex-direction: column;
    justify-content: left;
    & .row {
      display: flex;
      padding: 1em;
    }
  }
  &-icon {
    position: absolute;
    right: 0;
    top: 0;
    width: 5vw;
    height: auto;
  }
}
</style>