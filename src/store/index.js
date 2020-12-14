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
    lengthUnit: 'm',
    speedUnit: 'km/h',
    city: "City Name",
    time: "11:54",
    weather: "Current Weather",
    pressureDefault: 1023, //value never change, used as reference to convert without worrying about round up mess
    pressureConverted: 1023,
    humidity: 100,
    visibilityDefault: 16093,
    visibilityConverted: 16093,
    windSpeedDefault: 1.5, // in m/s
    windSpeedConverted: 1.5,
    windDeg: 350,
    windGustDefault: 3, // in m/s
    windGustConverted: 3,
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
        } else if (state.tempUnit == "K") { //Kelvin -> Celsius
          for (let n in state.temperatures) {
            state.temperatures[n] = state.temperatures[n] - 273.15;
          }
        }
        state.tempUnit = '°C'
      } else if (payload == 'fahrenheit') {
        if (state.tempUnit == "°C") { //Celsius -> Fahrenheit
          for (let n in state.temperatures) {
            state.temperatures[n] = state.temperatures[n] * 1.8 + 32;
          }
        } else if (state.tempUnit == "K") { //Kelvin -> Fahrenheit
          for (let n in state.temperatures) {
            state.temperatures[n] = (state.temperatures[n] - 273.15) * 1.8 + 32;
          }
        }
        state.tempUnit = '°F'
      } else if (payload == 'kelvin') {
        if (state.tempUnit == "°F") { //Fahrenheit -> Kelvin
          for (let n in state.temperatures) {
            state.temperatures[n] = (state.temperatures[n] - 32) / 1.8 + 273.15;
          }
        } else if (state.tempUnit == "°C") { //Celsius -> Kelvin
          for (let n in state.temperatures) {
            state.temperatures[n] = state.temperatures[n] + 273.15;
          }
        }
        state.tempUnit = 'K'
      }
    },

    PRESSURE_CONVERTER(state, payload) {

      if (payload == 'atmosphere') {
        state.pressureConverted = state.pressureDefault / 1013.25;
        state.pressureUnit = 'atm';
      } else if (payload == 'bar') {
        state.pressureConverted = state.pressureDefault / 1000;
        state.pressureUnit = 'bar';
      } else if (payload == 'hectopascal') {
        state.pressureConverted = state.pressureDefault;
        state.pressureUnit = 'hPa';
      } else if (payload == 'pascal') {
        state.pressureConverted = state.pressureDefault * 100;
        state.pressureUnit = 'Pa';
      } else if (payload == 'psi') {
        state.pressureConverted = state.pressureDefault / 68.948;
        state.pressureUnit = 'psi';
      } else if (payload == 'torr') {
        state.pressureConverted = state.pressureDefault / 1.333;
        state.pressureUnit = 'Torr';
      }
      state.pressureConverted = (Math.round(state.pressureConverted * 1000)) / 1000;
    },

    LENGTH_CONVERTER(state, payload) {
      if (payload == "metric") {
        state.visibilityConverted = state.visibilityDefault;
        state.lengthUnit = 'm'
      } else if (payload == "imperial") {
        state.visibilityConverted = state.visibilityDefault / 1609.344;
        state.lengthUnit = 'mi'
      }
      state.visibilityConverted = (Math.round(state.visibilityConverted * 1000)) / 1000;
    },
    SPEED_CONVERTER(state, payload) {
      if (payload == "metric") {
        state.windSpeedConverted = state.windSpeedDefault * 3.6;
        state.windGustConverted = state.windGustDefault * 3.6;
        state.speedUnit = "km/h";
      } else if (payload == "imperial") {
        state.windSpeedConverted = state.windSpeedDefault * 2.237;
        state.windGustConverted = state.windGustDefault * 2.237;
        state.speedUnit = "mi/h";
      }
      state.windSpeedConverted = (Math.round(state.windSpeedConverted * 1000)) / 1000;
      state.windGustConverted = (Math.round(state.windGustConverted * 1000)) / 1000;
    }
  },
  actions: {},
  modules: {}
})