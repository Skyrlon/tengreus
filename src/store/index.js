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
    time: 1609340400,
    weather: "Tornado",
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