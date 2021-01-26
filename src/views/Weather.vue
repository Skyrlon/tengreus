<template>
  <div class="weather" @load="setTitle">
    <weather-banner />
    <div class="sending-data-buttons">
      <div class="searchbar-container">
        <search-bar />
      </div>
      <div
        class="reload-icon"
        :class="{ reloading: isReloading }"
        @click="reloadData"
      >
        <reload-icon />
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
import ReloadIcon from "../components/icons/ReloadIcon.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "Weather",

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
      isReloading: false,
      clickCount: 0,
    };
  },

  methods: {
    reloadData() {
      this.clickCount++;
      if (this.clickCount < 2) {
        this.isReloading = true;
        this.$store.dispatch("getCurrentWeather", { id: this.city.id });
        this.$store.dispatch("getForecastWeather", {
          longitude: this.city.lon,
          latitude: this.city.lat,
        });
        setTimeout(() => {
          this.isReloading = false;
        }, 1000);
        setTimeout(() => {
          this.clickCount = 0;
        }, 300000);
      } else {
        return;
      }
    },
  },

  components: {
    WeatherBanner,
    Settings,
    SettingsIcon,
    WeatherDetails,
    ReloadIcon,
    SearchBar,
  },
};
</script>

<style lang="scss">
.weather {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  & .footer {
    flex: 0 1 40px;
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
  width: 3.5%;
  height: auto;
  transform: rotate(0deg);
  transition: 0.7s;
  &.active {
    transform: rotate(-180deg);
  }
}

.sending-data-buttons {
  position: relative;
  margin-top: -1em;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
}

.searchbar-container {
  position: absolute;
  width: 20vw;
}

.reload-icon {
  margin-top: -0.25em;
  margin-left: 20vw ;
  width: 2em;
  &.reloading {
    animation: infinite-spin 0.5s infinite linear;
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

@keyframes infinite-spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(180deg);
  }
}
</style>