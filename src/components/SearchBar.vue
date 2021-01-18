<template>
  <div
    id="searchbar"
    :class="{ active: isActive, loading: isLoading }"
    v-clickOutside="hideCityDatalistUl"
  >
    <input
      v-model="searchCity"
      @keyup="getCities($event)"
      @focusin="showDropdown($event)"
      onblur="this.placeholder = 'Entrez le nom d\'une ville'"
      id="searchbar-input"
      type="text"
      placeholder="Entrez le nom d'une ville"
    />
    <div id="searchbar-dropdown">
      <div class="loading-icon" v-if="isLoading"></div>
      <div id="searchbar-dropdown-list">
        <div
          :key="city.key"
          v-for="city in citiesList"
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
      isLoading: false,
      searchCity: "",
      apiData: null,
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
        this.isLoading = true;
        if (event.key == "Shift" || event.keyCode == 16) {
          return;
        }
        axios
          .get(
            `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q='"${this.searchCity}'&rows=1000&sort=population`
          )
          .then(
            (response) =>
              (this.apiData = response.data.records.filter((data) =>
                data["fields"]["name"]
                  .toLowerCase()
                  .startsWith(this.searchCity.toLowerCase())
              ))
          )
          .then(() => {
            this.citiesList = [];
            for (let i = 0; i < this.apiData.length; i++) {
              let cityId = this.apiData[i]["fields"]["geoname_id"];
              let cityName = this.apiData[i]["fields"]["name"];
              let adminSubdivision;
              for (let j = 0; j < this.admin1CodesListOrganized.length; j++) {
                if (
                  this.apiData[i]["fields"]["country_code"] ==
                    this.admin1CodesListOrganized[j].country &&
                  this.apiData[i]["fields"]["admin1_code"] ==
                    this.admin1CodesListOrganized[j].admin1code
                ) {
                  adminSubdivision = this.admin1CodesListOrganized[j].name;
                }
              }
              let countryName = this.apiData[i]["fields"]["country"];

              this.citiesList.push({
                id: cityId,
                name: cityName,
                subdivision: adminSubdivision,
                country: countryName,
              });
            }
            this.showDropdown(event);
          })
          .then(() => {
            this.isLoading = false;
          });
      }
    },

    selectCity(e) {
      this.searchCity = e.target.textContent.replace(/\s+/g, " ").trim();
      this.isActive = false;
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

<style lang="scss" scoped>
#searchbar {
  margin: auto;
  margin-top: 1%;
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

  &.loading #searchbar-dropdown {
    display: block;
    box-sizing: border-box;
    border: 1px solid black;
    border-top-style: none;
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
    & .loading-icon {
      border: 16px solid #f3f3f3;
      border-radius: 50%;
      border-top: 16px solid #3498db;
      width: 120px;
      height: 120px;
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