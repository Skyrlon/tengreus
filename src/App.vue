<template>
  <div id="app" @beforeunload="window.sessionStorage.clear()">
    <home v-if="this.$store.state.currentView === 'Home'" />
    <weather v-if="this.$store.state.currentView === 'Weather'" />
    <transition name="show-settings">
      <settings v-if="showSettings" v-on-clickaway="clickOutsideSettings" />
    </transition>
    <div class="settings-icon" :class="{ active: showSettings }">
      <settings-icon
        @click.native="showSettings = !showSettings"
        :isActive="showSettings"
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
  },

  data() {
    return {
      showSettings: false,
    };
  },

  methods: {
    clickOutsideSettings() {
      this.showSettings = false;
    },
  },
};
</script>

<style lang="scss">
body {
  margin: 0 auto;
  width: 100%;
  height: 100%;
}

#app {
  position: absolute;
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  overflow-x: hidden;
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
  width: 3.5%;
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
