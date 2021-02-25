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
    tempUnit: "°C",
    pressureUnit: 'hPa',
    lengthUnit: 'm',
    speedUnit: 'km/h',
    city: {},
    timeShift: 0,
    current: {},
    forecast: [],
  },

  getters: {
    getTitle: state => {
      return `${state.city.name[localStorage.getItem("language") || "en"]}, ${state.city.country}`
    }
  },

  mutations: {

    SWITCH_PAGE(state, payload) {
      state.currentView = payload;
    },

    LOAD_CURRENT_WEATHER(state, payload) {
      state.city = {
        name: {
          en: payload.name,
          fr: ""
        },
        country: payload.sys.country,
        id: payload.id,
        lon: payload.coord.lon,
        lat: payload.coord.lat,
      };

      state.timeShift = payload.timezone;

      state.current = {
        sunrise: payload.sys.sunrise,
        sunset: payload.sys.sunset,
        temperatures: {
          current: payload.main.temp,
          feelsLike: payload.main.feels_like,
          min: payload.main.temp_min,
          max: payload.main.temp_max,
        },
        pressure: payload.main.pressure,
        visibility: payload.visibility,
        humidity: payload.main.humidity,
        wind: {
          speed: payload.wind.speed,
          deg: payload.wind.deg,
        },
        cloudiness: payload.clouds.all,
        weather: {
          id: payload.weather[0].id,
          main: payload.weather[0].main,
          detailed: {
            en: payload.weather[0].description,
            fr: ""
          },
        }
      };
      state.current.time = Date.now() / 1000; //time provided by api is inaccurate
    },

    LOAD_FRENCH_CURRENT_WEATHER(state, payload) {
      state.city.name.fr = payload.name;
      state.current.weather.detailed.fr = payload.weather[0].description;
    },

    LOAD_FORECAST_WEATHER(state, payload) {
      for (let i = 0; i < payload.daily.length; i++) {
        state.forecast[i] = {
          time: payload.daily[i].dt,
          sunrise: payload.daily[i].sunrise,
          sunset: payload.daily[i].sunset,
          temperatures: {
            day: payload.daily[i].temp.day,
            night: payload.daily[i].temp.night,
            min: payload.daily[i].temp.min,
            max: payload.daily[i].temp.max,
            feelsLike: {
              day: payload.daily[i].feels_like.day,
              night: payload.daily[i].feels_like.night,
            },
          },
          pressure: payload.daily[i].pressure,
          humidity: payload.daily[i].humidity,
          wind: {
            speed: payload.daily[i].wind_speed,
            deg: payload.daily[i].wind_deg,
          },
          cloudiness: payload.daily[i].clouds,
          weather: {
            id: payload.daily[i].weather[0].id,
            main: payload.daily[i].weather[0].main,
            detailed: {
              en: payload.daily[i].weather[0].description,
              fr: "",
            },
          }
        }
      }
    },

    LOAD_FRENCH_FORECAST_WEATHER(state, payload) {
      if (state.forecast.length === 8) {
        for (let i = 0; i < payload.daily.length; i++) {
          state.forecast[i].weather.detailed.fr = payload.daily[i].weather[0].description;
        }
      }
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
      await dispatch('getFrenchCurrentWeather', payload);
      await dispatch('getForecastWeather', payload);
      await dispatch('getFrenchForecastWeather', payload);
      dispatch('switchPage', 'Weather')
    },

    getCurrentWeather({
      commit,
      state
    }, payload) {
      return axios
        .get(`https://api.openweathermap.org/data/2.5/weather?id=${payload.id}&appid=${state.apiKey}&units=metric&lang=en`)
        .then(result => {
          commit('LOAD_CURRENT_WEATHER', result.data);
        });
    },

    getFrenchCurrentWeather({
      commit,
      state
    }, payload) {
      return axios
        .get(`https://api.openweathermap.org/data/2.5/weather?id=${payload.id}&appid=${state.apiKey}&units=metric&lang=fr`)
        .then(result => {
          commit('LOAD_FRENCH_CURRENT_WEATHER', result.data);
        })
    },

    getForecastWeather({
      commit,
      state
    }, payload) {
      return axios
        .get(`https://api.openweathermap.org/data/2.5/onecall?appid=${state.apiKey}&units=metric&lat=${payload.latitude}&lon=${payload.longitude}&exclude=current,minutely,hourly,alerts&lang=en`)
        .then(result => {
          commit('LOAD_FORECAST_WEATHER', result.data);
        });
    },

    getFrenchForecastWeather({
      commit,
      state
    }, payload) {
      return axios
        .get(`https://api.openweathermap.org/data/2.5/onecall?appid=${state.apiKey}&units=metric&lat=${payload.latitude}&lon=${payload.longitude}&exclude=current,minutely,hourly,alerts&lang=fr`)
        .then(result => {
          commit('LOAD_FRENCH_FORECAST_WEATHER', result.data);
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