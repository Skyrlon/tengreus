import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    city: "City Name",
    time: "11:54",
    currentTemp: -15,
    weather: "Current Weather",
    feelsLikeTemp: -10,
    minTemp: -11,
    maxTemp: -9,
    pressure: 1023,
    humidity: 100,
    visibility: 16093,
    windSpeed: 1.5,
    windDeg: 350,
    windGust: 3,
    cloudiness: 1,
    rainInLast1H: 0,
    rainInLast3H: 0,
    snowInLast1H: 0,
    snowInLast3H: 0,
    sunrise: "7:00",
    sunset: "17:00",
    moonPhase: "Waning Gibbous",
  },
  mutations: {},
  actions: {},
  modules: {}
})