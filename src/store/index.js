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

      //Convert previous temperature to Atmosphere
      if (payload == 'atmosphere') {
        if (state.pressureUnit == "bar") { //bar -> Atmosphere
          state.pressure = state.pressure / 1.013;
        } else if (state.pressureUnit == "hPa") { //HectoPascal -> Atmosphere
          state.pressure = state.pressure / 1013;
        } else if (state.pressureUnit == "Pa") { //Pascal -> Atmosphere
          state.pressure = state.pressure / 101300;
        } else if (state.pressureUnit == "psi") { //Psi -> Atmosphere
          state.pressure = state.pressure / 14.696;
        } else if (state.pressureUnit == "Torr") { //Torr -> Atmosphere
          state.pressure = state.pressure / 760;
        }
        state.pressureUnit = 'atm'
      }

      //Convert previous temperature to bar
      else if (payload == 'bar') {
        if (state.pressureUnit == "atm") { //Atmosphere -> bar
          state.pressure = state.pressure * 1.013;
        } else if (state.pressureUnit == "hPa") { //HectoPascal -> bar
          state.pressure = state.pressure / 1000;
        } else if (state.pressureUnit == "Pa") { //Pascal -> bar
          state.pressure = state.pressure / 100000;
        } else if (state.pressureUnit == "psi") { //Psi -> bar
          state.pressure = state.pressure / 14.504;
        } else if (state.pressureUnit == "Torr") { //Torr -> bar
          state.pressure = state.pressure / 750;
        }
        state.pressureUnit = 'bar'
      }

      //Convert previous temperature to HectoPascal
      else if (payload == 'hectopascal') {
        if (state.pressureUnit == "atm") { //Atmosphere -> HectoPascal
          state.pressure = state.pressure * 1013;
        } else if (state.pressureUnit == "bar") { //bar -> HectoPascal
          state.pressure = state.pressure * 1000;
        } else if (state.pressureUnit == "Pa") { //Pascal -> HectoPascal
          state.pressure = state.pressure / 100;
        } else if (state.pressureUnit == "psi") { //Psi -> HectoPascal
          state.pressure = state.pressure * 68.95;
        } else if (state.pressureUnit == "Torr") { //Torr -> HectoPascal
          state.pressure = state.pressure * 1.33;
        }
        state.pressureUnit = 'hPa'
      }

      //Convert previous temperature to Pascal
      else if (payload == 'pascal') {
        if (state.pressureUnit == "atm") { //Atmosphere -> Pascal
          state.pressure = state.pressure * 101300;
        } else if (state.pressureUnit == "bar") { //bar -> Pascal
          state.pressure = state.pressure * 100000;
        } else if (state.pressureUnit == "hPa") { //HectoPascal -> Pascal
          state.pressure = state.pressure * 100;
        } else if (state.pressureUnit == "psi") { //Psi -> Pascal
          state.pressure = state.pressure * 6895;
        } else if (state.pressureUnit == "Torr") { //Torr -> Pascal
          state.pressure = state.pressure * 133;
        }
        state.pressureUnit = 'Pa'
      }

      //Convert previous temperature to Psi
      else if (payload == 'psi') {
        if (state.pressureUnit == "atm") { //Atmosphere -> Psi
          state.pressure = state.pressure * 14.696;
        } else if (state.pressureUnit == "bar") { //bar -> Psi
          state.pressure = state.pressure * 14.504;
        } else if (state.pressureUnit == "hPa") { //HectoPascal -> Psi
          state.pressure = state.pressure / 68.95;
        } else if (state.pressureUnit == "Pa") { //Pascal -> Psi
          state.pressure = state.pressure * 6895;
        } else if (state.pressureUnit == "Torr") { //Torr -> Psi
          state.pressure = state.pressure / 51.715;
        }
        state.pressureUnit = 'psi'
      }

      //Convert previous temperature to Psi
      else if (payload == 'torr') {
        if (state.pressureUnit == "atm") { //Atmosphere -> Torr
          state.pressure = state.pressure * 760;
        } else if (state.pressureUnit == "bar") { //bar -> Torr
          state.pressure = state.pressure * 750;
        } else if (state.pressureUnit == "hPa") { //HectoPascal -> Torr
          state.pressure = state.pressure / 1.33;
        } else if (state.pressureUnit == "Pa") { //Pascal -> Torr
          state.pressure = state.pressure / 133;
        } else if (state.pressureUnit == "psi") { //Psi -> Torr
          state.pressure = state.pressure * 51.715;
        }
        state.pressureUnit = 'Torr'
      }
    }
  },
  actions: {},
  modules: {}
})