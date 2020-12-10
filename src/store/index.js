import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    temperatures: {
      currentTemp: -15,
      feelsLikeTemp: -10,
      minTemp: -11,
      maxTemp: -9,
    },
    tempUnit: "°C",
    city: "City Name",
    time: "11:54",
    weather: "Current Weather",
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
  mutations: {
    MEASUREMENT_UNIT_CONVERTER(state, payload) {
      if (payload == 'celsius') {
        if (state.tempUnit == "°F") {
          for (let n in state.temperatures) {
            state.temperatures[n] = (state.temperatures[n] - 32) / 1.8;
          }
          state.tempUnit = '°C'
        } else if (state.tempUnit == "K") {
          for (let n in state.temperatures) {
            state.temperatures[n] = state.temperatures[n] - 273.15;
          }
          state.tempUnit = '°C'
        }
      } else if (payload == 'fahrenheit') {
        if (state.tempUnit == "°C") {
          for (let n in state.temperatures) {
            state.temperatures[n] = state.temperatures[n] * 1.8 + 32;
          }
          state.tempUnit = '°F'
        } else if (state.tempUnit == "K") {
          for (let n in state.temperatures) {
            state.temperatures[n] = (state.temperatures[n] - 273.15) * 1.8 + 32;
          }
          state.tempUnit = '°F'
        }
      } else if (payload == 'kelvin') {
        if (state.tempUnit == "°F") {
          for (let n in state.temperatures) {
            state.temperatures[n] = (state.temperatures[n] - 32) / 1.8 + 273.15;
          }
          state.tempUnit = 'K'
        } else if (state.tempUnit == "°C") {
          for (let n in state.temperatures) {
            state.temperatures[n] = state.temperatures[n] + 273.15;
          }
          state.tempUnit = 'K'
        }
      }
    }
  },
  actions: {},
  modules: {}
})