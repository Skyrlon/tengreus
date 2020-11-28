<template>
  <div
    id="cities-datalist"
    :class="{ active: isActive }"
    v-clickOutside="hideCityDatalistUl"
  >
    <input
      v-model="searchCity"
      @keyup="getCities($event)"
      @focusin="isFocus($event)"
      onblur="this.placeholder = 'Entrez le nom d\'une ville'"
      id="cities-datalist-input"
      type="text"
      placeholder="Entrez le nom d'une ville"
    />
    <ul id="cities-datalist-ul">
      <li
        :key="city.key"
        v-for="city in filteredCities"
        :id="city.value"
        @click="selectCity($event)"
      >
        {{ city }}
      </li>
    </ul>
  </div>
</template>

<script>
const axios = require("axios");

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
      el: "#cities-datalist",
      isActive: undefined,
      searchCity: "",
      filteredCities: [],
      citiesList: null,
    };
  },
  methods: {
    getCities(event) {
      if (this.searchCity.length >= 3) {
        if (event.key == "Shift" || event.keyCode == 16) {
          return;
        }
        axios
          .get(
            `https://public.opendatasoft.com/api/records/1.0/search/?dataset=geonames-all-cities-with-a-population-1000&q=${this.searchCity}`
          )
          .then((response) => (this.citiesList = response.data.records))
          .then(() => {
            this.filteredCities = [];
            console.log(this.citiesList.length);
            for (let i = 0; i < this.citiesList.length; i++) {
              if (
                this.citiesList[i].fields.name
                  .toLowerCase()
                  .startsWith(this.searchCity.toLowerCase()) == true
              ) {
                console.log(this.citiesList[i].fields.name);
                this.filteredCities.push(this.citiesList[i].fields.name);
              }
            }
          });

        if (this.filteredCities.length > 0) {
          this.isActive = true;
        } else if (this.filteredCities.length < 1) {
          this.isActive = false;
        }
        if (this.searchCity.length == 0) {
          this.isActive = false;
        }
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
#cities-datalist {
  margin: auto;
  margin-top: 10%;
  width: 20vw;
  &.active #cities-datalist-ul {
    display: block;
    box-sizing: border-box;
    border: 1px solid black;
    border-top-style: none;

    & li:hover {
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
  &-ul {
    display: none;
    position: relative;
    margin-top: -0.75em;
    padding: 0;
    width: 20vw;
    max-height: 5em;
    list-style: none;
    background: #fff;
    border-bottom-left-radius: 0.5vw;
    border-bottom-right-radius: 0.5vw;
    overflow: hidden;
    overflow-y: auto;
    & li:nth-child(1) {
      margin-top: 0.75em;
    }

    & li {
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
</style>