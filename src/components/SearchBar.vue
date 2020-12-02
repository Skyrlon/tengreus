<template>
  <div
    id="searchbar"
    :class="{ active: isActive }"
    v-clickOutside="hideCityDatalistUl"
  >
    <input
      v-model="searchCity"
      @keyup="getCities($event)"
      @focusin="isFocus($event)"
      onblur="this.placeholder = 'Entrez le nom d\'une ville'"
      id="searchbar-input"
      type="text"
      placeholder="Entrez le nom d'une ville"
    />
    <div id="searchbar-dropdown">
      <div id="searchbar-dropdown-list">
        <div
          :key="city.key"
          v-for="city in filteredCities"
          :id="city.id"
          @click="selectCity($event)"
        >
          {{ city.name }}, {{ city.subdivision }}, {{ city.country }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require("axios");
import Admin1Codes from "!!raw-loader!@/assets/admin1CodesASCII.txt";

export default {
  name: "SearchBar",
  components: {},
  directives: {
    clickOutside: {
      bind(el, binding, vnode) {
        var vm = vnode.context;
        var callback = binding.value;

        el.clickOutsideEvent = function (event) {
          if (!(el == event.target || el.contains(event.target))) {
            return callback.call(vm, event);
          }
        };
        document.body.addEventListener("click", el.clickOutsideEvent);
      },
      unbind(el) {
        document.body.removeEventListener("click", el.clickOutsideEvent);
      },
    },
  },
  data() {
    return {
      isActive: undefined,
      searchCity: "",
      apiData: null,
      filteredCities: [],
      citiesList: [],
      admin1CodesList: Admin1Codes.split(/\n/),
    };
  },
  computed: {
    admin1CodesListOrganized() {
      let admin1Array = [];
      for (let i = 0; i < this.admin1CodesList.length; i++) {
        let array = this.admin1CodesList[i].split(/\t/);
        let countryInitials = array[0].substring(0, 2);
        let admin1 = array[0].substring(3, array[0].length);
        let name = array[1];
        admin1Array.push({
          country: countryInitials,
          admin1code: admin1,
          name: name,
        }); 
      }
      return admin1Array;
    },
  },
  methods: {
    getCities(event) {
      if (this.searchCity.length >= 3) {
        if (event.key == "Shift" || event.keyCode == 16) {
          return;
        }
        axios
          .get(
            `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q='"${this.searchCity}'&rows=1000&sort=population`
          )
          .then((response) => (this.apiData = response.data.records))
          .then(() => {
            this.citiesList = [];
            for (let i = 0; i < this.apiData.length; i++) {
              let cityId = this.apiData[i]["fields"]["geoname_id"];
              let cityName = this.apiData[i]["fields"]["name"];
              let adminSubdivision = this.apiData[i]["fields"]["admin1_code"];
              let countryName = this.apiData[i]["fields"]["country"];

              this.citiesList.push({
                id: cityId,
                name: cityName,
                subdivision: adminSubdivision,
                country: countryName,
              });
            }
            this.filteredCities = [];
            for (let i = 0; i < this.citiesList.length; i++) {
              if (
                this.citiesList[i].name
                  .toLowerCase()
                  .startsWith(this.searchCity.toLowerCase()) == true
              ) {
                this.filteredCities.push(this.citiesList[i]);
              }
            }
            if (this.filteredCities.length > 0) {
              this.isActive = true;
            } else if (this.filteredCities.length < 1) {
              this.isActive = false;
            }
            if (this.searchCity.length == 0) {
              this.isActive = false;
            }
          });
      }
    },

    selectCity(e) {
      this.searchCity = e.target.textContent.replace(/\s+/g, " ").trim();
      this.isActive = false;
    },

    isFocus(e) {
      if (this.filteredCities.length > 0) {
        this.isActive = true;
      } else if (this.filteredCities.length == 0) {
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

<style lang="scss" scoped>
#searchbar {
  margin: auto;
  margin-top: 10%;
  width: 20vw;

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

  &-input {
    position: relative;
    z-index: 10;
    box-sizing: border-box;
    width: 20vw;
    font-size: 1em;
    border-radius: 20vw;
    text-align: center;
    border: 1px solid black;
  }

  &-dropdown {
    display: none;
    position: relative;
    margin-top: -0.75em;
    padding: 0;
    width: 20vw;
    max-height: 20.5em;
    list-style: none;
    background: #fff;
    border-bottom-left-radius: 0.5vw;
    border-bottom-right-radius: 0.5vw;
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
      }
    }
  }
}
</style>