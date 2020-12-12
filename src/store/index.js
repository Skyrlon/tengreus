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
    pressureUnit: 'hPa',
    city: "City Name",
    time: "11:54",
    weather: "Current Weather",
    pressureDefault: 1023, //value never change, used as reference to convert without worrying about round up mess
    pressureConverted: 1023,
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
    TEMPERATURE_CONVERTER(state, payload) {
      if (payload == 'celsius') {
        if (state.tempUnit == "°F") { //Fahrenheit -> Celsius
          for (let n in state.temperatures) {
            state.temperatures[n] = (state.temperatures[n] - 32) / 1.8;
          }
          state.tempUnit = '°C'
        } else if (state.tempUnit == "K") { //Kelvin -> Celsius
          for (let n in state.temperatures) {
            state.temperatures[n] = state.temperatures[n] - 273.15;
          }
          state.tempUnit = '°C'
        }
      } else if (payload == 'fahrenheit') {
        if (state.tempUnit == "°C") { //Celsius -> Fahrenheit
          for (let n in state.temperatures) {
            state.temperatures[n] = state.temperatures[n] * 1.8 + 32;
          }
          state.tempUnit = '°F'
        } else if (state.tempUnit == "K") { //Kelvin -> Fahrenheit
          for (let n in state.temperatures) {
            state.temperatures[n] = (state.temperatures[n] - 273.15) * 1.8 + 32;
          }
          state.tempUnit = '°F'
        }
      } else if (payload == 'kelvin') {
        if (state.tempUnit == "°F") { //Fahrenheit -> Kelvin
          for (let n in state.temperatures) {
            state.temperatures[n] = (state.temperatures[n] - 32) / 1.8 + 273.15;
          }
          state.tempUnit = 'K'
        } else if (state.tempUnit == "°C") { //Celsius -> Kelvin
          for (let n in state.temperatures) {
            state.temperatures[n] = state.temperatures[n] + 273.15;
          }
          state.tempUnit = 'K'
        }
      }
    },

    PRESSURE_CONVERTER(state, payload) {

      if (payload == 'atmosphere') {
        state.pressureConverted = state.pressureDefault / 1013.25;
        state.pressureUnit = 'atm';
      }
      else if (payload == 'bar') {
        state.pressureConverted = state.pressureDefault / 1000;
        state.pressureUnit = 'bar';
      }
      else if (payload == 'hectopascal') {
        state.pressureConverted = state.pressureDefault;
        state.pressureUnit = 'hPa';
      }
      else if (payload == 'pascal') {
        state.pressureConverted = state.pressureDefault * 100;
        state.pressureUnit = 'Pa';
      }
      else if (payload == 'psi') {
        state.pressureConverted = state.pressureDefault / 68.948;
        state.pressureUnit = 'psi';
      }
      else if (payload == 'torr') {
        state.pressureConverted = state.pressureDefault / 1.333;
        state.pressureUnit = 'Torr';
      }
    }
  },
  actions: {},
  modules: {}
})