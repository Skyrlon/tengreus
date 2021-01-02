import Vue from 'vue'
import Vuex from 'vuex'
const axios = require("axios");
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiKey: process.env.VUE_APP_API_KEY,
    temperatures: {
      current: -15,
      feelsLike: -10,
      min: -11,
      max: -9,
    },
    tempUnit: "°C",
    pressureUnit: 'hPa',
    lengthUnit: 'm',
    speedUnit: 'km/h',
    city: {
      name: "Paris",
      id: 2988507
    },
    time: 1609340400,
    weather: {
      main: '',
      detailed: '',
    },
    pressure: {
      default: 1023, //value never change, used as reference to convert without worrying about round up mess
      converted: 1023,
    },
    humidity: 100,
    visibility: {
      default: 16093,
      converted: 16093,
    },
    wind: {
      speedDefault: 1.5, // in m/s
      speedConverted: 1.5,
      deg: 350,
      gustDefault: 3, // in m/s
      gustConverted: 3,
    },
    cloudiness: 1,
    precipitation: {
      rainLast1H: 0,
      rainLast3H: 0,
      snowLast1H: 0,
      snowLast3H: 0,
    },
    sunrise: 1609311600,
    sunset: 1609347600,
  },
  getters: {
    getMoonPhase: state => {
      let time = new Date(state.time * 1000);
      var year = time.getFullYear(),
        month = time.getMonth(),
        day = time.getDate();
      if (month < 3) {
        year--;
        month += 12;
      }
      ++month;
      let jd = 365.25 * year + 30.6 * month + day - 694039.09; // jd is total days elapsed
      jd /= 29.53; // divide by the moon cycle (29.53 days)
      let phase = parseInt(jd, 10); // int(jd) -> phase, take integer part of jd
      jd -= phase; // subtract integer part to leave fractional part of original jd
      phase = Math.ceil(jd * 8); // scale fraction from 0-8 and round by adding 0.5
      phase = phase & 7; // 0 and 8 are the same so turn 8 into 0
      switch (phase) {
        case 0:
          phase = "New Moon";
          break;
        case 1:
          phase = "waxing Crescent";
          break;
        case 2:
          phase = "First Quarter";
          break;
        case 3:
          phase = "Waxing Gibbous";
          break;
        case 4:
          phase = "Full Moon";
          break;
        case 5:
          phase = "Waning Gibbous";
          break;
        case 6:
          phase = "Last Quarter";
          break;
        case 7:
          phase = "Waning Crescent";
          break;
      }
      return phase;
    },
  },
  mutations: {
    LOAD_WEATHER(state, payload) {
      state.temperatures = {
        current: Math.ceil(payload.main.temp),
        feelsLike: Math.ceil(payload.main.feels_like),
        min: Math.ceil(payload.main.temp_min),
        max: Math.ceil(payload.main.temp_max),
      };
      state.pressure = {
        default: payload.main.pressure,
        converted: payload.main.pressure,
      };
      state.visibility = {
        default: payload.visibility,
        converted: payload.visibility,
      };
      state.humidity = payload.main.humidity;
      state.wind = {
        speedDefault: payload.wind.speed,
        speedConverted: payload.wind.speed,
        deg: payload.wind.deg,
        gustDefault: payload.wind.gust,
        gustConverted: payload.wind.gust,
      };
      state.cloudiness = payload.clouds.all;
      state.weather = {
        main: payload.weather[0].main,
        detailed: payload.weather[0].description,
      }
    },

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
        state.pressure.converted = state.pressure.default / 1013.25;
        state.pressureUnit = 'atm';
      } else if (payload == 'bar') {
        state.pressure.converted = state.pressure.default / 1000;
        state.pressureUnit = 'bar';
      } else if (payload == 'hectopascal') {
        state.pressure.converted = state.pressure.default;
        state.pressureUnit = 'hPa';
      } else if (payload == 'pascal') {
        state.pressure.converted = state.pressure.default * 100;
        state.pressureUnit = 'Pa';
      } else if (payload == 'psi') {
        state.pressure.converted = state.pressure.default / 68.948;
        state.pressureUnit = 'psi';
      } else if (payload == 'torr') {
        state.pressure.converted = state.pressure.default / 1.333;
        state.pressureUnit = 'Torr';
      }
      state.pressure.converted = (Math.round(state.pressure.converted * 1000)) / 1000;
    },

    LENGTH_CONVERTER(state, payload) {
      if (payload == "metric") {
        state.visibility.converted = state.visibility.default;
        state.lengthUnit = 'm'
      } else if (payload == "imperial") {
        state.visibility.converted = state.visibility.default / 1609.344;
        state.lengthUnit = 'mi'
      }
      state.visibility.converted = (Math.round(state.visibility.converted * 1000)) / 1000;
    },

    SPEED_CONVERTER(state, payload) {
      if (payload == "metric") {
        state.wind.speedConverted = state.wind.speedDefault * 3.6;
        state.wind.gustConverted = state.wind.gustDefault * 3.6;
        state.speedUnit = "km/h";
      } else if (payload == "imperial") {
        state.wind.speedConverted = state.wind.speedDefault * 2.237;
        state.wind.gustConverted = state.wind.gustDefault * 2.237;
        state.speedUnit = "mi/h";
      }
      state.wind.speedConverted = (Math.round(state.wind.speedConverted * 1000)) / 1000;
      state.wind.gustConverted = (Math.round(state.wind.gustConverted * 1000)) / 1000;
    }
  },
  actions: {
    getWeather({
      commit,
      state
    }) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?id=${state.city.id}&appid=${state.apiKey}&units=metric`)
        .then(result => {
          commit('LOAD_WEATHER', result.data);
        })
    }
  },
  modules: {}
})