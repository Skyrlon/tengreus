<template>
  <div
    id="searchbar"
    :class="{ active: isActive, loading: isLoading, error: gotError.status }"
    v-on-clickaway="hideCityDatalistUl"
  >
    <input
      v-model="searchCity"
      v-debounce:1000="getCities"
      debounce-events="keyup"
      @focusin="showDropdown($event)"
      @focusout="getPlaceholder($event)"
      id="searchbar-input"
      type="text"
      :placeholder="$t('placeholder')"
    />
    <div id="searchbar-dropdown">
      <div class="loading-icon" v-if="isLoading"></div>
      <div
        class="error-text"
        v-if="isLoading === false && gotError.status === true"
      >
        {{ gotError.message }}
      </div>
      <div id="searchbar-dropdown-list">
        <div
          :key="city.key"
          v-for="city in citiesList"
          :id="city.id"
          @click="selectCity($event, city.id, city.longitude, city.latitude)"
        >
          {{ city.name }}, {{ city.subdivision }}, {{ city.country }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import { mixin as clickaway } from "vue-clickaway";

export default {
  name: "SearchBar",
  mixins: [clickaway],

  data() {
    return {
      isActive: undefined,
      isLoading: false,
      gotError: {
        status: false,
        message: "",
      },
      searchCity: "",
      apiData: null,
      citiesList: [],
      userName: process.env.VUE_APP_USER_NAME,
    };
  },

  methods: {
    getPlaceholder(e) {
      e.target.placeholder = this.$t("placeholder");
    },

    getCities(val, e) {
      if (this.searchCity.length >= 3) {
        this.gotError.status = false;
        this.gotError.message = "";
        this.citiesList = [];
        this.isLoading = true;
        if (e.key == "Shift" || e.keyCode == 16) {
          this.isLoading = false;
        }
        axios
          .get(
            `http://api.geonames.org/searchJSON?name_startsWith="${
              this.searchCity
            }"&maxRows=1000&username=${this.userName}&cities=cities1000&lang=${
              localStorage.getItem("language") || "en"
            }&searchlang=${
              localStorage.getItem("language") || "en"
            }&orderby=revelence`
          )
          .then((response) => {
            this.apiData = response.data["geonames"];
          })
          .then(this.fillCitiesList)
          .then(() => (this.isLoading = false));
      }
    },

    fillCitiesList() {
      if (this.apiData.length === 0) {
        this.gotError.status = true;
        this.gotError.message = "No city found";
      } else {
        for (let i = 0; i < this.apiData.length; i++) {
          let cityId = this.apiData[i]["geonameId"];
          let cityName = this.apiData[i]["name"];
          let adminSubdivision = this.apiData[i]["adminName1"];
          let countryName = this.apiData[i]["countryName"];
          let longitude = this.apiData[i]["lng"];
          let latitude = this.apiData[i]["lat"];

          this.citiesList.push({
            id: cityId,
            name: cityName,
            subdivision: adminSubdivision,
            country: countryName,
            longitude: longitude,
            latitude: latitude,
          });
        }
      }
      //citiesList transformed in an array [id, citiesList], id become key and citiesList become value
      //Map accept only unqiue keys, filtering duplicate cities
      //values() takes only citiesList values
      //and [...] makes an array
      this.citiesList = [
        ...new Map(this.citiesList.map((item) => [item.id, item])).values(),
      ];
      this.showDropdown(event);
    },

    selectCity(e, id, longitude, latitude) {
      this.$emit("selected-city");
      this.searchCity = e.target.textContent.replace(/\s+/g, " ").trim();
      this.isActive = false;
      this.$store.dispatch("getCurrentWeather", { id: id });
      this.$store.dispatch("getForecastWeather", {
        longitude: longitude,
        latitude: latitude,
      });
      this.$store.state.currentView = "Weather";
    },

    showDropdown(e) {
      if (this.citiesList.length > 0) {
        this.isActive = true;
      } else if (this.citiesList.length == 0) {
        this.isActive = false;
      }
      if (this.searchCity.length == 0) {
        this.isActive = false;
        e.target.placeholder = "";
      }
    },

    hideCityDatalistUl: function () {
      this.isActive = false;
    },
  },
};
</script>

<style lang="scss">
#searchbar {
  width: 100%;
  &.active #searchbar-dropdown {
    display: block;
    box-sizing: border-box;
    border: 1px solid black;
    border-top-style: none;

    &-list div:hover {
      color: black;
      background: lightgreen;
    }
  }

  &.loading #searchbar-dropdown {
    display: block;
    box-sizing: border-box;
    border: 1px solid black;
    border-top-style: none;
  }

  &.error #searchbar-dropdown {
    display: block;
    box-sizing: border-box;
    border: 1px solid black;
    border-top-style: none;
    & div {
      margin-top: 1em;
    }
  }

  &-input {
    position: relative;
    z-index: 10;
    box-sizing: border-box;
    width: 100%;
    font-size: 1em;
    border-radius: 10% / 100%;
    text-align: center;
    border: 1px solid black;
  }

  &-dropdown {
    display: none;
    position: relative;
    z-index: 5;
    margin-top: -0.75em;
    padding: 0;
    width: inherit;
    max-height: 20.5em;
    list-style: none;
    background: #fff;
    border-bottom-left-radius: 0.5em;
    border-bottom-right-radius: 0.5em;
    overflow: hidden;

    &-list {
      margin-top: 0.75em;

      & div {
        display: block;
        border-bottom: 1px solid grey;
        padding: 0.5em;
        text-align: left;
        color: #999;
        font-size: 1em;
        cursor: pointer;
        & a {
          text-decoration: none;
          color: #999;
        }
      }
    }
    & .loading-icon {
      display: block;
      margin-top: 1em;
      margin-left: auto;
      margin-right: auto;
      width: 1em;
      height: 1em;
      border: 0.5em solid #f3f3f3;
      border-radius: 50%;
      border-top: 0.5em solid #3498db;
      animation: spin 2s linear infinite;
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>