<template>
  <div
    id="app"
    :class="{ dark: darkTheme }"
    @beforeunload="window.sessionStorage.clear()"
  >
    <home v-if="this.currentView === 'Home'" />
    <weather
      v-if="this.currentView === 'Weather'"
      @selected-city="changeTitle"
    />
    <error-page v-if="this.currentView === 'Error'" />
    <about v-if="this.currentView === 'About'" />
    <transition name="show-settings">
      <settings
        v-if="showSettings"
        v-on-clickaway="clickOutsideSettings"
        @toggle-dark-theme="toggleDarkTheme"
        @language-changed="changeTitle"
      />
    </transition>
    <div class="settings-icon" :class="{ active: showSettings }">
      <settings-icon
        @click.native="showSettings = !showSettings"
        :isActive="showSettings"
        :isBlackOrWhite="getSettingsIconColor"
      />
    </div>
  </div>
</template>

<script>
import Home from "./views/Home.vue";
import Weather from "./views/Weather.vue";
import Settings from "@/components/Settings.vue";
import ErrorPage from "./views/ErrorPage.vue";
import About from "./views/About.vue";
import SettingsIcon from "@/components/icons/SettingsIcon.vue";
import { mixin as clickaway } from "vue-clickaway";
import { mapState } from "vuex";

const countries = require("i18n-iso-countries");
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
countries.registerLocale(require("i18n-iso-countries/langs/fr.json"));

export default {
  mixins: [clickaway],

  components: {
    Home,
    Weather,
    Settings,
    SettingsIcon,
    ErrorPage,
    About,
  },
  created() {
    if (localStorage.getItem("language")) {
      this.$i18n.locale = localStorage.getItem("language");
    }
    if (localStorage.getItem("darktheme")) {
      this.darkTheme =
        localStorage.getItem("darktheme") === "on" ? true : false;
    }
    if (sessionStorage.getItem("title")) {
      document.title = sessionStorage.getItem("title");
    }
  },

  data() {
    return {
      showSettings: false,
      darkTheme: false,
    };
  },

  watch: {
    currentView(newValue, oldValue) {
      if (oldValue === "Home" && newValue === "Weather") {
        this.setTitle;
      }
    },
  },

  computed: {
    ...mapState(["currentView", "city"]),

    setTitle() {
      let country = countries.getName(
        this.city.country,
        localStorage.getItem("language") || "en",
        {
          select: "official",
        }
      );
      let title = `Tengreus - ${
        this.city.name[localStorage.getItem("language") || "en"]
      }, ${country}`;
      sessionStorage.setItem("title", title);
      return (document.title = title);
    },

    getSettingsIconColor() {
      let color;

      if (this.$store.state.currentView === "Weather") {
        if (
          this.$store.state.current.weather.main === "Drizzle" ||
          this.$store.state.current.weather.main === "Rain" ||
          this.$store.state.current.weather.main === "Clouds" ||
          (this.$store.state.current.weather.main === "Clear" &&
            (this.$store.state.current.time <
              this.$store.state.current.sunrise ||
              this.$store.state.current.time >
                this.$store.state.current.sunset))
        ) {
          color = "white";
        } else {
          color = "black";
        }
      } else if (
        (this.$store.state.currentView === "Home" && this.darkTheme === true) ||
        (this.$store.state.currentView === "Error" && this.darkTheme === true)
      ) {
        color = "white";
      } else {
        color = "black";
      }

      if (this.showSettings === true) {
        if (this.darkTheme === true) {
          color = "white";
        } else {
          color = "black";
        }
      }
      return color;
    },
  },

  methods: {
    changeTitle() {
      let country = countries.getName(
        this.city.country,
        localStorage.getItem("language") || "en",
        {
          select: "official",
        }
      );
      let title = `Tengreus - ${
        this.city.name[localStorage.getItem("language") || "en"]
      }, ${country}`;
      sessionStorage.setItem("title", title);
      document.title = title;
    },

    clickOutsideSettings() {
      this.showSettings = false;
    },

    toggleDarkTheme(value) {
      this.darkTheme = value === "on" ? true : false;
    },
  },
};
</script>

<style lang="scss">
@font-face {
  font-family: "LexendMega";
  src: url("./assets/LexendMega-Regular.ttf") format("truetype");
}
body {
  margin: 0 auto;
  width: 100%;
  height: 100%;
}

#app {
  --darktheme-font-color: #dddddd;
  --darktheme-background-color: #21242c;
  --base-font-color: #2c3e50;
  --base-background-color: #f7f7f7;
  position: absolute;
  width: 100%;
  height: 100%;
  font-family: LexendMega, Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: var(--base-font-color);
  background: var(--base-background-color);
  overflow-x: hidden;
  &.dark {
    background: var(--darktheme-background-color);
    color: var(--darktheme-font-color);
  }
}

.show-settings-enter-active {
  transform-origin: 100% 0%;
  animation: show-up 0.7s linear;
}

.show-settings-leave-active {
  transform-origin: 100% 0%;
  animation: show-up 0.7s linear reverse;
}

.settings-icon {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 98;
  width: 2.5em;
  height: auto;
  transform: rotate(0deg);
  transition: 0.7s;
  cursor: pointer;
  &.active {
    transform: rotate(-180deg);
  }
}

@keyframes show-up {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
</style>
