<template>
  <div
    id="app"
    :class="{ dark: darkTheme }"
    @beforeunload="window.sessionStorage.clear()"
  >
    <home v-if="this.$store.state.currentView === 'Home'" />
    <weather v-if="this.$store.state.currentView === 'Weather'" />
    <transition name="show-settings">
      <settings
        v-if="showSettings"
        v-on-clickaway="clickOutsideSettings"
        @toggle-dark-theme="toggleDarkTheme"
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
import SettingsIcon from "@/components/icons/SettingsIcon.vue";
import { mixin as clickaway } from "vue-clickaway";

export default {
  mixins: [clickaway],

  components: {
    Home,
    Weather,
    Settings,
    SettingsIcon,
  },
  created() {
    if (localStorage.getItem("language")) {
      this.$i18n.locale = localStorage.getItem("language");
    }
    if (localStorage.getItem("darktheme")) {
      this.darkTheme =
        localStorage.getItem("darktheme") === "on" ? true : false;
    }
  },

  data() {
    return {
      showSettings: false,
      darkTheme: false,
    };
  },

  computed: {
    getSettingsIconColor() {
      let color;
      if (
        this.$store.state.weather.main === "Drizzle" ||
        this.$store.state.weather.main === "Rain" ||
        this.$store.state.weather.main === "Clouds" ||
        (this.$store.state.weather.main === "Clear" &&
          (this.$store.state.time < this.$store.state.sunrise ||
            this.$store.state.time > this.$store.state.sunset))
      ) {
        color = "white";
      } else if (
        this.$store.state.currentView === "Home" &&
        this.darkTheme === true
      ) {
        color = "white";
      } else {
        color = "black";
      }
      return color;
    },
  },

  methods: {
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
  position: absolute;
  width: 100%;
  height: 100%;
  font-family: LexendMega, Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  background: #f7f7f7;
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
  width: 2.5em;
  height: auto;
  transform: rotate(0deg);
  transition: 0.7s;
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
