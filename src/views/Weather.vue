<template>
  <div class="weather">
    <weather-banner />
    <div class="searchbar-container">
      <div class="search-icon" v-if="!showSearchBar" @click="toggleSearchBar">
        <search-icon />
      </div>
      <transition name="show-searchbar">
        <div class="searchbar" v-if="showSearchBar">
          <search-bar
            @selected-city="
              showSearchBar = false;
              selectedCity();
            "
          />
        </div>
      </transition>
    </div>
    <weather-details />
  </div>
</template>

<script>
import WeatherBanner from "@/components/WeatherBanner.vue";
import WeatherDetails from "../components/WeatherDetails.vue";
import { mapState } from "vuex";
import SearchIcon from "../components/icons/SearchIcon.vue";
import SearchBar from "@/components/SearchBar.vue";

export default {
  name: "Weather",

  created() {
    if (localStorage.getItem("tempUnit")) {
      this.$store.commit(
        "CHANGE_TEMPERATURE_UNIT",
        localStorage.getItem("tempUnit")
      );
    }
    if (localStorage.getItem("pressureUnit")) {
      this.$store.commit(
        "CHANGE_PRESSURE_UNIT",
        localStorage.getItem("pressureUnit")
      );
    }
    if (localStorage.getItem("lengthUnit")) {
      this.$store.commit(
        "CHANGE_LENGTH_UNIT",
        localStorage.getItem("lengthUnit")
      );
    }
    if (localStorage.getItem("speedUnit")) {
      this.$store.commit(
        "CHANGE_SPEED_UNIT",
        localStorage.getItem("speedUnit")
      );
    }
  },

  components: {
    WeatherBanner,
    WeatherDetails,
    SearchBar,
    SearchIcon,
  },

  computed: {
    ...mapState(["city"]),
  },

  data() {
    return {
      showSearchBar: false,
    };
  },

  methods: {
    selectedCity() {
      this.$emit("selected-city");
    },

    toggleSearchBar() {
      setTimeout(() => {
        this.showSearchBar = true;
      }, 450);
    },
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
  text-transform: capitalize;
}

.searchbar-container {
  position: relative;
  margin: auto;
  height: 2em;
  margin-top: -1em;
  margin-bottom: 0em;
  display: flex;
  flex-direction: row;
  justify-content: center;
  & .searchbar {
    position: absolute;
    margin-top: 0.25em;
    width: 20em;
  }
}

.show-searchbar-enter-active {
  animation: extend-showbar 1s;
}

.search-icon {
  width: 1.75em;
  height: 1.75em;
  border-radius: 100%;
  border: 2px solid black;
  background: white;
  transition: 200ms;
  &:active {
    transition: 200ms;
    transform: scale(0.75);
  }
  & svg {
    margin-top: 15%;
    margin-left: 5%;
    width: 65%;
  }
}

#app.dark {
  & .arrow {
    & path {
      fill: var(--darktheme-font-color);
    }
  }
}

@keyframes extend-showbar {
  0% {
    transform: scaleX(0);
  }
  100% {
    transform: scaleX(1);
  }
}
</style>