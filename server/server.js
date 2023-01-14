require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
var qs = require("qs");
var cors = require("cors");
const axios = require("axios");

const citiesApiKey = process.env.CITIES_API_KEY;
const weatherApiKey = process.env.WEATHER_API_KEY;

const citiesUrl = "http://api.geonames.org/searchJSON";
const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall";

app.use(cors());

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/cities", (request, response) => {
  let query = request.query;
  query.username = citiesApiKey;
  let queryString = qs.stringify(query);
  axios.get(`${citiesUrl}?${queryString}`).then((res) => {
    response.send(res.data);
  });
});

app.get("/api/currentWeather", (request, response) => {
  let query = request.query;
  query.appid = weatherApiKey;
  let queryString = qs.stringify(query);
  axios.get(`${currentWeatherUrl}?${queryString}`).then((res) => {
    response.send(res.data);
  });
});

app.get("/api/forecastWeather", (request, response) => {
  let query = request.query;
  query.appid = weatherApiKey;
  let queryString = qs.stringify(query);
  axios.get(`${forecastWeatherUrl}?${queryString}`).then((res) => {
    response.send(res.data);
  });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
