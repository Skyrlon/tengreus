import Vue from 'vue'
import Vuex from 'vuex'
const axios = require("axios");
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex)

export default new Vuex.Store({

  plugins: [createPersistedState({
    storage: window.sessionStorage
  })],

  state: {
    currentView: "Home",
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
      lat: 48.85341,
      lon: 2.3488,
      country: "France",
    },
    timeShift: 0,
    time: 5,
    weather: {
      main: 'Clear',
      detailed: 'clear sky',
    },
    pressure: 0,
    humidity: 100,
    visibility: 16093,
    wind: {
      speed: 1.5, // in m/s
      deg: 350,
    },
    cloudiness: 1,
    sunrise: 0,
    sunset: 10,
    forecast: [],
  },

  mutations: {
    LOAD_CURRENT_WEATHER(state, payload) {
      state.city.name = payload.name;
      state.city.country = payload.sys.country;
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

    LOAD_FORECAST_WEATHER(state, payload) {
      [state.forecast] = [payload.daily]
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
    getCurrentWeather({
      commit,
      state
    }, payload) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?id=${payload.id}&appid=${state.apiKey}&units=metric`)
        .then(result => {
          commit('LOAD_CURRENT_WEATHER', result.data);
        })
    },
    getForecastWeather({
      commit,
      state
    }, payload) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/onecall?appid=${state.apiKey}&units=metric&lat=${payload.latitude}&lon=${payload.longitude}&exclude=current,minutely,hourly,alerts`)
        .then(result => {
          commit('LOAD_FORECAST_WEATHER', result.data);
        })
    }
  },

  modules: {}
})