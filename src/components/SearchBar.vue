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
        {{ city.text }}
      </li>
    </ul>
  </div>
</template>

<script>
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
      citiesList: [
        { value: "paris_france", text: "Paris, France" },
        { value: "tokyo_japan", text: "Tokyo, Japan" },
        { value: "beijing_china", text: "Beijing, China" },
        {
          value: "abu-dhabi_united_arab_emirates",
          text: "Abu Dhabi, United Arab Emirates",
        },
        { value: "athens_greece", text: "Athens, Greece" },
        { value: "bangkok_thailand", text: "Bangkok, Thailand" },
        { value: "belgrade_serbia", text: "Belgrade, Serbia" },
        { value: "brussels_belgium", text: "Brussels, Belgium" },
        { value: "cairo_egypt", text: "Cairo, Egypt" },
      ],
    };
  },
  methods: {
    getCities(event) {
      if (event.key == "Shift" || event.keyCode == 16) {
        return;
      }
      this.filteredCities = [];
      this.filteredCities = this.citiesList.filter((x) =>
        x.text.toLowerCase().startsWith(this.searchCity.toLowerCase())
      );
      if (this.filteredCities.length > 0) {
        this.isActive = true;
      } else if (this.filteredCities.length < 1) {
        this.isActive = false;
      }
      if (this.searchCity.length == 0) {
        this.isActive = false;
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
    & li:hover {
      color: black;
      background: lightgreen;
    }
  }
  &-input {
    margin: 0.25vw 0 0 0;
    width: 100%;
    font-size: 1em;
    border-radius: 10vw;
    text-align: center;
  }
  &-ul {
    display: none;
    margin: 0;
    padding: 0;
    width: 20vw;
    max-height: 5em;
    font-size: 1em;
    list-style: none;
    background: #fff;
    overflow: hidden;
    overflow-y: auto;
    & li {
      display: block;
      text-align: left;
      color: #999;
      cursor: pointer;
    }
  }
  & > p {
    margin: 0.5vw 0 0 0;
    font-size: 1em;
  }
}
</style>