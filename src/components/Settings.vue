<template>
  <div class="settings">
    <div class="settings-form">
      <div class="row">{{ $t("settings") }} :</div>
      <div class="row">
        <div>{{ $t("temperature") }} :</div>
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
        <div>{{ $t("pressure") }} :</div>
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
        <div>{{ $t("distance") }} :</div>
        <select
          id="distance"
          @change="changeLength($event)"
          v-model="lengthUnitSelected"
        >
          <option value="metric">{{ $t("metric") }}</option>
          <option value="imperial">{{ $t("imperial") }}</option>
        </select>
      </div>

      <div class="row">
        <div>{{ $t("speed") }} :</div>
        <select
          id="speed"
          @change="changeSpeed($event)"
          v-model="speedUnitSelected"
        >
          <option value="metric">{{ $t("metric") }}</option>
          <option value="imperial">{{ $t("imperial") }}</option>
        </select>
      </div>

      <div class="row">
        <div>{{ $t("language") }} :</div>
        <select
          id="lang"
          @change="changeLanguage($event)"
          v-model="languageSelected"
        >
          <option value="en">English</option>
          <option value="fr">Français</option>
        </select>
      </div>

      <div class="row">
        Dark Theme
        <div class="toggle-icon" @click="toggleDarkTheme">
          <toggle-icon :isOn="toggleOn" />
        </div>
      </div>

      <div class="row">
        <button @click="resetLocalStorage">Reset</button>
      </div>
    </div>
  </div>
</template>

<script>
import ToggleIcon from "./icons/ToggleIcon.vue";

export default {
  components: { ToggleIcon },
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
    this.languageSelected = localStorage.getItem("language")
      ? localStorage.getItem("language")
      : "en";
    this.toggleOn = localStorage.getItem("darktheme")
      ? localStorage.getItem("darktheme") === "true" //localStorage accepts only string
      : false;
  },

  data() {
    return {
      tempUnitSelected: "celsius",
      pressureUnitSelected: "hectopascal",
      lengthUnitSelected: "metric",
      speedUnitSelected: "metric",
      languageSelected: "en",
      toggleOn: false,
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
    changeLanguage(e) {
      localStorage.setItem("language", this.languageSelected);
      this.$i18n.locale = e.target.value;
    },
    toggleDarkTheme() {
      this.$store.commit("TOGGLE_DARK_THEME");
      this.toggleOn = !this.toggleOn;
      localStorage.setItem("darktheme", this.toggleOn);
    },
    resetLocalStorage() {
      this.$store.commit("RESET_LOCAL_STORAGE");
      this.$i18n.locale = "en";
      this.tempUnitSelected = "celsius";
      this.pressureUnitSelected = "hectopascal";
      this.lengthUnitSelected = "metric";
      this.speedUnitSelected = "metric";
      this.languageSelected = "en";
      this.toggleOn = false;
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
  text-transform: capitalize;

  &-form {
    display: flex;
    flex-direction: column;
    justify-content: left;

    & .row {
      display: flex;
      padding: 1em;
    }
  }
  & .toggle-icon {
    width: 2.5vw;
  }
}
</style>