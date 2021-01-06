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
    time: {
      unix: 0,
      hour: 0,
      minutes: 0,

    },
    weather: {
      main: '',
      detailed: '',
    },
    pressure: 0,
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
      let time = new Date(state.time.unix * 1000);
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
      function convertDate(time) {
        let dt = new Date((time + state.timeShift) * 1000);
        let hour = dt.getUTCHours();
        let minutes = (dt.getUTCMinutes() < 10 ? '0' : '') + dt.getUTCMinutes();
        let array = [time, hour, minutes];
        return array;
      }

      state.timeShift = payload.timezone;
      state.time = {
        unix: convertDate(Date.now() / 1000)[0],
        hour: convertDate(Date.now() / 1000)[1],
        minutes: convertDate(Date.now() / 1000)[2],
      };
      state.sunrise = {
        unix: convertDate(payload.sys.sunrise)[0],
        hour: convertDate(payload.sys.sunrise)[1],
        minutes: convertDate(payload.sys.sunrise)[2],
      };
      state.sunset = {
        unix: convertDate(payload.sys.sunset)[0],
        hour: convertDate(payload.sys.sunset)[1],
        minutes: convertDate(payload.sys.sunset)[2],
      };
      state.temperatures = {
        current: Math.ceil(payload.main.temp),
        feelsLike: Math.ceil(payload.main.feels_like),
        min: Math.ceil(payload.main.temp_min),
        max: Math.ceil(payload.main.temp_max),
      };
      state.pressure = payload.main.pressure;
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