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
      id: 2988507,
    },
    timeShift: 0,
    time: 0,
    weather: {
      main: '',
      detailed: '',
    },
    pressure: 0,
    humidity: 100,
    visibility: 16093,
    wind: {
      speed: 1.5, // in m/s
      deg: 350,
      gust: 3, // in m/s
    },
    cloudiness: 1,
    precipitation: {
      rainLast1H: 0,
      rainLast3H: 0,
      snowLast1H: 0,
      snowLast3H: 0,
    },
    sunrise: {
      unix: 0,
      hour: 0,
      minutes: 0,
    },
    sunset: {
      unix: 0,
      hour: 0,
      minutes: 0,

    },
  },
  getters: {
    getMoonPhase: state => {
      let time = new Date(state.time * 1000);
      var year = time.getUTCFullYear(),
        month = time.getUTCMonth(),
        day = time.getUTCDate();
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
      state.timeShift = payload.timezone;
      state.time = Date.now() / 1000;
      state.sunrise = payload.sys.sunrise;
      state.sunset = payload.sys.sunset;
      state.temperatures = {
        current: Math.ceil(payload.main.temp),
        feelsLike: Math.ceil(payload.main.feels_like),
        min: Math.ceil(payload.main.temp_min),
        max: Math.ceil(payload.main.temp_max),
      };
      state.pressure = payload.main.pressure;
      state.visibility = payload.visibility;
      state.humidity = payload.main.humidity;
      state.wind = {
        speed: payload.wind.speed,
        deg: payload.wind.deg,
        gust: payload.wind.gust,
      };
      state.cloudiness = payload.clouds.all;
      state.weather = {
        main: payload.weather[0].main,
        detailed: payload.weather[0].description,
      }
    },

    CHANGE_TEMPERATURE_UNIT(state, payload) {
      if (payload === "celsius") {
        state.tempUnit = "°C";
      } else if (payload === "fahrenheit") {
        state.tempUnit = "°F";
      } else if (payload === "kelvin") {
        state.tempUnit = "K";
      }
    },

    CHANGE_PRESSURE_UNIT(state, payload) {
      if (payload === 'atmosphere') {
        state.pressureUnit = 'atm';
      } else if (payload === 'bar') {
        state.pressureUnit = 'bar';
      } else if (payload === 'hectopascal') {
        state.pressureUnit = 'hPa';
      } else if (payload === 'pascal') {
        state.pressureUnit = 'Pa';
      } else if (payload === 'psi') {
        state.pressureUnit = 'psi';
      } else if (payload === 'torr') {
        state.pressureUnit = 'Torr';
      }
    },

    CHANGE_LENGTH_UNIT(state, payload) {
      if (payload == "metric") {
        state.lengthUnit = 'm'
      } else if (payload == "imperial") {
        state.lengthUnit = 'mi'
      }
    },

    CHANGE_SPEED_UNIT(state, payload) {
      if (payload == "metric") {
        state.speedUnit = "km/h";
      } else if (payload == "imperial") {
        state.speedUnit = "mi/h";
      }
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