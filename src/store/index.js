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

  getters: {
    getTitle: state => {
      return `${state.city.name}, ${state.city.country}`
    }
  },

  mutations: {

    SWITCH_PAGE(state, payload) {
      state.currentView = payload;
    },

    LOAD_CURRENT_WEATHER(state, payload) {
      state.city.name = payload.name;
      state.city.country = payload.sys.country;
      state.city.id = payload.id;
      state.timeShift = payload.timezone;
      state.time = Date.now() / 1000;
      state.sunrise = payload.sys.sunrise;
      state.sunset = payload.sys.sunset;
      state.temperatures = {
        current: payload.main.temp,
        feelsLike: payload.main.feels_like,
        min: payload.main.temp_min,
        max: payload.main.temp_max,
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
        id: payload.weather[0].id,
        main: payload.weather[0].main,
        detailed: payload.weather[0].description,
      }
    },

    LOAD_FORECAST_WEATHER(state, payload) {
      [state.forecast] = [payload.daily];
    },

    CHANGE_TEMPERATURE_UNIT(state, payload) {
      localStorage.setItem('tempUnit', payload);
      return state.tempUnit = payload;
    },

    CHANGE_PRESSURE_UNIT(state, payload) {
      localStorage.setItem('pressureUnit', payload);
      return state.pressureUnit = payload;
    },

    CHANGE_LENGTH_UNIT(state, payload) {
      let unit;
      switch (payload) {
        case 'metric':
          unit = 'm';
          break;
        case 'imperial':
          unit = 'mi';
          break;
      }
      localStorage.setItem('lengthUnit', payload);
      return state.lengthUnit = unit;
    },

    CHANGE_SPEED_UNIT(state, payload) {
      let unit;
      switch (payload) {
        case 'metric':
          unit = 'km/h';
          break;
        case 'imperial':
          unit = 'mi/h';
          break;
      }
      localStorage.setItem('speedUnit', payload);
      return state.speedUnit = unit;
    },

    RESET_LOCAL_STORAGE(state) {
      localStorage.clear();
      state.tempUnit = "°C";
      state.pressureUnit = 'hPa';
      state.lengthUnit = 'm';
      state.speedUnit = 'km/h';
    }
  },

  actions: {
    async getWeather({
      dispatch
    }, payload) {
      await dispatch('getCurrentWeather', payload);
      await dispatch('getForecastWeather', payload);

    },

    getCurrentWeather({
      commit,
      state
    }, payload) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/weather?id=${payload.id}&appid=${state.apiKey}&units=metric&lang=${localStorage.getItem("language") || "en"}`)
        .then(result => {
          commit('LOAD_CURRENT_WEATHER', result.data);
        })
    },

    getForecastWeather({
      commit,
      state,
      dispatch
    }, payload) {
      axios
        .get(`https://api.openweathermap.org/data/2.5/onecall?appid=${state.apiKey}&units=metric&lat=${payload.latitude}&lon=${payload.longitude}&exclude=current,minutely,hourly,alerts&lang=${localStorage.getItem("language") || "en"}`)
        .then(result => {
          commit('LOAD_FORECAST_WEATHER', result.data);
          dispatch('switchPage', 'Weather')
        })
    },

    switchPage({
      commit
    }, payload) {
      commit("SWITCH_PAGE", payload);
    }
  },

  modules: {}
})