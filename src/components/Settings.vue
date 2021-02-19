<template>
  <div class="settings">
    <div class="settings-form">
      <div class="row">{{ $t("settings") }} :</div>
      <div class="row">
        <div>{{ $t("temperature") }} :</div>
        <div class="select-container">
          <custom-select
            :optionValue="tempValuesArray"
            :optionText="tempTextArray"
            :selectOption="changeTemperature"
            :optionSelected="tempUnitSelected"
          />
        </div>
      </div>

      <div class="row">
        <div>{{ $t("pressure") }} :</div>
        <div class="select-container">
          <custom-select
            :optionValue="pressureValuesArray"
            :optionText="pressureTextArray"
            :selectOption="changePressure"
            :optionSelected="pressureUnitSelected"
          />
        </div>
      </div>

      <div class="row">
        <div>{{ $t("distance") }} :</div>
        <div class="select-container">
          <custom-select
            :optionValue="measurementSystemValuesArray"
            :optionText="measurementSystemTextArray"
            :selectOption="changeLength"
            :optionSelected="$t(lengthUnitSelected)"
          />
        </div>
      </div>

      <div class="row">
        <div>{{ $t("speed") }} :</div>
        <div class="select-container">
          <custom-select
            :optionValue="measurementSystemValuesArray"
            :optionText="measurementSystemTextArray"
            :selectOption="changeSpeed"
            :optionSelected="$t(speedUnitSelected)"
          />
        </div>
      </div>

      <div class="row">
        <div>{{ $t("language") }} :</div>
        <div class="select-container">
          <custom-select
            :optionValue="languageValuesArray"
            :optionText="languageTextArray"
            :selectOption="changeLanguage"
            :optionSelected="languageSelected"
          />
        </div>
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
      : "metric";

    this.speedUnitSelected = localStorage.getItem("speedUnit")
      ? localStorage.getItem("speedUnit")
      : "metric";

    if (localStorage.getItem("language")) {
      if (localStorage.getItem("language") === "en") {
        this.languageSelected = "english";
      } else if (localStorage.getItem("language") === "fr") {
        this.languageSelected = "français";
      }
    } else {
      this.languageSelected = "english";
    }

    this.toggleOn = localStorage.getItem("darktheme")
      ? localStorage.getItem("darktheme")
      : "off";
  },

  data() {
    return {
      lengthUnitSelected: "metric",
      speedUnitSelected: "metric",
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
      languageValuesArray: ["en", "fr"],
      languageTextArray: ["english", "français"],
      languageSelected: "en",
      toggleOn: "off",
    };
  },
  computed: {
    //data doesn't refresh value, unlike computed
    measurementSystemTextArray() {
      return [this.$t("metric"), this.$t("imperial")];
    },
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
    // eslint-disable-next-line no-unused-vars
    changeLength(value, text) {
      this.lengthUnitSelected = value;
      this.$store.commit("CHANGE_LENGTH_UNIT", value);
    },
    // eslint-disable-next-line no-unused-vars
    changeSpeed(value, text) {
      this.speedUnitSelected = value;
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
  z-index: 97;
  top: 0;
  right: 0;
  color: var(--base-font-color);
  background: var(--base-background-color);
  border: 1px solid var(--base-font-color);
  justify-content: space-between;
  text-transform: capitalize;

  &-form {
    display: flex;
    flex-direction: column;
    justify-content: left;

    & .row {
      display: flex;
      padding: 1em;
      & .select-container {
        width: 10em;
        font-size: 0.75em;
      }
    }
  }
  & .toggle-icon {
    width: 2.5em;
  }
}
</style>