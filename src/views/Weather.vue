<template>
  <div class="weather">
    <weather-banner />
    <div class="searchbar-container">
      <div
        class="search-icon"
        v-if="!showSearchBar"
        @click="showSearchBar = true"
      >
        <search-icon />
      </div>
      <div class="searchbar" v-if="showSearchBar">
        <search-bar
          @selected-city="
            showSearchBar = false;
            setTitle;
          "
        />
      </div>
    </div>
    <weather-details />
    <transition name="show-settings">
      <settings v-if="showSettings" />
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
import WeatherBanner from "@/components/WeatherBanner.vue";
import Settings from "@/components/Settings.vue";
import SettingsIcon from "@/components/icons/SettingsIcon.vue";
import WeatherDetails from "../components/WeatherDetails.vue";
import { mapState, mapGetters } from "vuex";
import SearchIcon from "../components/icons/SearchIcon.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "Weather",

  components: {
    WeatherBanner,
    Settings,
    SettingsIcon,
    WeatherDetails,
    SearchBar,
    SearchIcon,
  },

  computed: {
    ...mapState(["city"]),
    ...mapGetters(["getTitle"]),
    setTitle() {
      return (document.title = `Tengreus - ${this.getTitle}`);
    },
  },

  data() {
    return {
      showSettings: false,
      showSearchBar: false,
    };
  },

  methods: {},
};
</script>

<style lang="scss">
.weather {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  height: 100%;
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

.searchbar-container {
  position: relative;
  margin: auto;
  margin-top: -1em;
  margin-bottom: 0em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  & .searchbar {
    position: absolute;
    margin-top: 0.25em;
    width: 20vw;
  }
}

.search-icon {
  width: 1.75em;
  height: 1.75em;
  border-radius: 100%;
  border: 2px solid black;
  background: white;
  & svg {
    margin-top: 15%;
    margin-left: 5%;
    width: 65%;
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