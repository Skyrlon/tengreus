<template>
  <div class="settings">
    <div class="settings-form">
      <div class="row">{{ $t("settings") }} :</div>
      <div class="row">
        <div>{{ $t("temperature") }} :</div>
        <custom-select
          :optionValue="tempValuesArray"
          :optionText="tempTextArray"
          :selectOption="changeTemperature"
          :optionSelected="tempUnitSelected"
        />
      </div>

      <div class="row">
        <div>{{ $t("pressure") }} :</div>
        <custom-select
          :optionValue="pressureValuesArray"
          :optionText="pressureTextArray"
          :selectOption="changePressure"
          :optionSelected="pressureUnitSelected"
        />
      </div>

      <div class="row">
        <div>{{ $t("distance") }} :</div>
        <custom-select
          :optionValue="measurementSystemValuesArray"
          :optionText="measurementSystemTextArray"
          :selectOption="changeLength"
          :optionSelected="lengthUnitSelected"
        />
      </div>

      <div class="row">
        <div>{{ $t("speed") }} :</div>
        <custom-select
          :optionValue="measurementSystemValuesArray"
          :optionText="measurementSystemTextArray"
          :selectOption="changeSpeed"
          :optionSelected="speedUnitSelected"
        />
      </div>

      <div class="row">
        <div>{{ $t("language") }} :</div>
        <custom-select
          :optionValue="languageValuesArray"
          :optionText="languageTextArray"
          :selectOption="changeLanguage"
          :optionSelected="languageSelected"
        />
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
import CustomSelect from "./CustomSelect.vue";

export default {
  components: { ToggleIcon, CustomSelect },
  name: "Settings",
  created() {
    this.tempUnitSelected = localStorage.getItem("tempUnit")
      ? localStorage.getItem("tempUnit")
      : "°C";
    this.pressureUnitSelected = localStorage.getItem("pressureUnit")
      ? localStorage.getItem("pressureUnit")
      : "hPa";
    this.lengthUnitSelected = localStorage.getItem("lengthUnit")
      ? localStorage.getItem("lengthUnit")
      : this.$i18n.messages[this.$i18n.locale].metric;
    this.speedUnitSelected = localStorage.getItem("speedUnit")
      ? localStorage.getItem("speedUnit")
      : this.$i18n.messages[this.$i18n.locale].metric;
    this.languageSelected = localStorage.getItem("language")
      ? localStorage.getItem("language")
      : "english";
    this.toggleOn = localStorage.getItem("darktheme")
      ? localStorage.getItem("darktheme")
      : "off";
  },

  data() {
    return {
      tempValuesArray: ["celsius", "fahrenheit", "kelvin"],
      tempTextArray: ["°C", "°F", "K"],
      tempUnitSelected: "°C",
      pressureValuesArray: [
        "atmosphere",
        "bar",
        "hectopascal",
        "pascal",
        "psi",
        "torr",
      ],
      pressureTextArray: ["atm", "bar", "hPa", "Pa", "psi", "Torr"],
      pressureUnitSelected: "hPa",
      measurementSystemValuesArray: ["metric", "imperial"],
      measurementSystemTextArray: [
        this.$i18n.messages[this.$i18n.locale].metric,
        this.$i18n.messages[this.$i18n.locale].imperial,
      ],
      lengthUnitSelected: this.$i18n.messages[this.$i18n.locale].metric,
      speedUnitSelected: this.$i18n.messages[this.$i18n.locale].metric,
      languageValuesArray: ["en", "fr"],
      languageTextArray: ["english", "français"],
      languageSelected: "en",
      toggleOn: "off",
    };
  },

  methods: {
    changeTemperature(value, text) {
      this.tempUnitSelected = text;
      this.$store.commit("CHANGE_TEMPERATURE_UNIT", value);
    },
    changePressure(value, text) {
      this.pressureUnitSelected = text;

      this.$store.commit("CHANGE_PRESSURE_UNIT", value);
    },
    changeLength(value, text) {
      this.lengthUnitSelected = text;
      this.$store.commit("CHANGE_LENGTH_UNIT", value);
    },
    changeSpeed(value, text) {
      this.speedUnitSelected = text;
      this.$store.commit("CHANGE_SPEED_UNIT", value);
    },
    changeLanguage(value, text) {
      this.languageSelected = text;
      localStorage.setItem("language", value);
      this.$i18n.locale = value;
    },
    toggleDarkTheme() {
      this.toggleOn = this.toggleOn === "on" ? "off" : "on";
      this.$emit("toggle-dark-theme", this.toggleOn);
      localStorage.setItem("darktheme", this.toggleOn);
    },
    resetLocalStorage() {
      this.$store.commit("RESET_LOCAL_STORAGE");
      this.$i18n.locale = "en";
      this.tempUnitSelected = "°C";
      this.pressureUnitSelected = "hPa";
      this.lengthUnitSelected = "metric";
      this.speedUnitSelected = "metric";
      this.languageSelected = "english";
      this.toggleOn = "off";
      this.$emit("toggle-dark-theme", this.toggleOn);
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