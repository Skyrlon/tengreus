<template>
  <div class="settings">
    <div class="settings-form">
      <div class="row">{{ $t("settings") }} :</div>
      <div class="row">
        <div>{{ $t("temperature") }} :</div>
        <div class="select-container">
          <custom-select
            :optionArray="tempArray"
            :selectOption="changeTemperature"
            :optionSelected="tempUnitSelected"
          />
        </div>
      </div>

      <div class="row">
        <div>{{ $t("pressure") }} :</div>
        <div class="select-container">
          <custom-select
            :optionArray="pressureArray"
            :selectOption="changePressure"
            :optionSelected="pressureUnitSelected"
          />
        </div>
      </div>

      <div class="row">
        <div>{{ $t("distance") }} :</div>
        <div class="select-container">
          <custom-select
            :optionArray="measurementSystemArray"
            :selectOption="changeLength"
            :optionSelected="$t(lengthUnitSelected)"
          />
        </div>
      </div>

      <div class="row">
        <div>{{ $t("speed") }} :</div>
        <div class="select-container">
          <custom-select
            :optionArray="measurementSystemArray"
            :selectOption="changeSpeed"
            :optionSelected="$t(speedUnitSelected)"
          />
        </div>
      </div>

      <div class="row">
        <div>{{ $t("language") }} :</div>
        <div class="select-container">
          <custom-select
            :optionArray="languageArray"
            :selectOption="changeLanguage"
            :optionSelected="languageSelected"
          />
        </div>
      </div>

      <div class="row">
        {{ $t("dark_theme") }}
        <div class="toggle-icon" @click="toggleDarkTheme">
          <toggle-icon :isOn="toggleOn" />
        </div>
      </div>

      <div class="row">
        <div @click="resetLocalStorage" class="reset-button">
          {{ $t("reset") }}
        </div>
        <div class="about-link" @click="goToAboutPage">{{ $t("about") }}</div>
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
      tempArray: ["°C", "°F", "K"],
      tempUnitSelected: "°C",
      pressureArray: ["atm", "bar", "hPa", "Pa", "psi", "Torr"],
      pressureUnitSelected: "hPa",
      languageArray: ["english", "français"],
      languageSelected: "en",
      toggleOn: "off",
    };
  },
  computed: {
    //data doesn't refresh value, unlike computed
    measurementSystemArray() {
      return [this.$t("metric"), this.$t("imperial")];
    },
  },

  methods: {
    changeTemperature(value) {
      this.tempUnitSelected = value;
      this.$store.commit("CHANGE_TEMPERATURE_UNIT", value);
    },

    changePressure(value) {
      this.pressureUnitSelected = value;
      this.$store.commit("CHANGE_PRESSURE_UNIT", value);
    },

    changeLength(value) {
      let valueNotTranslated;
      if (value === "métrique" || value === "impérial") {
        valueNotTranslated = value === "métrique" ? "metric" : "imperial";
      } else {
        valueNotTranslated = value;
      }
      this.lengthUnitSelected = value;
      this.$store.commit("CHANGE_LENGTH_UNIT", valueNotTranslated);
    },

    changeSpeed(value) {
      let valueNotTranslated;
      if (value === "métrique" || value === "impérial") {
        valueNotTranslated = value === "métrique" ? "metric" : "imperial";
      } else {
        valueNotTranslated = value;
      }
      this.speedUnitSelected = value;
      this.$store.commit("CHANGE_SPEED_UNIT", valueNotTranslated);
    },

    changeLanguage(value) {
      let language = value === "english" ? "en" : "fr";
      this.languageSelected = value;
      localStorage.setItem("language", language);
      this.$i18n.locale = language;
      this.$store.dispatch("switchPage", {
        page: this.$store.state.currentView,
      });
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
    goToAboutPage() {
      this.$store.dispatch("switchPage", {
        previous: this.$store.state.currentView,
        page: "About",
      });
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
  @media (min-width: 1025px) {
    width: 30%;
    height: 60%;
  }
  @media (max-width: 1024px) and (min-width: 601px) {
    width: 50%;
    height: 50%;
  }
  @media (max-width: 600px) {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 1024px) and (orientation: landscape) {
    width: 100%;
    height: 100%;
  }

  &-form {
    display: flex;
    flex-direction: column;
    justify-content: left;
    width: 90%;
    justify-content: space-around;
    padding-left: 1em;
    padding-bottom: 1em;

    & .row {
      display: flex;
      width: 100%;
      justify-content: space-between;
      &:nth-child(3) .select-container {
        text-transform: none;
      }
      & .select-container {
        width: 10em;
        font-size: 0.75em;
      }
    }
  }
  & .toggle-icon {
    width: 2.5em;
    cursor: pointer;
  }
  & .reset-button {
    padding: 0.25em;
    max-width: 15em;
    border: medium solid var(--base-font-color);
    border-radius: 0.5em;
    cursor: pointer;
    user-select: none;
    &:active {
      box-shadow: 0 0 0.5em -0.1em var(--base-font-color);
      border-color: grey;
      color: grey
    }
  }
  & .about-link {
    cursor: pointer;
    user-select: none;
    &:active {
      color: grey;
    }
  }
}

#app.dark {
  & .settings {
    border: 1px solid transparent;
    border-color: transparent transparent var(--darktheme-font-color)
      var(--darktheme-font-color);
    color: var(--darktheme-font-color);
    background-color: var(--darktheme-background-color);
  }
  & .reset-button {
    border: medium solid var(--darktheme-font-color);
    &:active {
      box-shadow: 0 0 1em -0.05em var(--darktheme-font-color);
    }
  }
}
</style>