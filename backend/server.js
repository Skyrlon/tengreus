require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
var qs = require("qs");
const axios = require("axios");
const cors = require('cors');
app.use(cors());

const citiesApiKey = process.env.VUE_APP_CITIES_API_KEY;
const weatherApiKey = process.env.VUE_APP_WEATHER_API_KEY;

const citiesUrl = "http://api.geonames.org/searchJSON";
const currentWeatherUrl = "https://api.openweathermap.org/data/2.5/weather";
const forecastWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall";

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/cities", (request, response) => {
    response.set('Access-Control-Allow-Origin', '*')
    let query = request.query;
    query.username = citiesApiKey;
    let queryString = qs.stringify(query);
    axios.get(`${citiesUrl}?${queryString}`).then((res) => {
        response.send(res.data);
    });
});

app.get("/currentWeather", (request, response) => {
    response.set('Access-Control-Allow-Origin', '*')
    let query = request.query;
    query.appid = weatherApiKey;
    let queryString = qs.stringify(query);
    axios.get(`${currentWeatherUrl}?${queryString}`).then((res) => {
        response.send(res.data);
    });
});

app.get("/forecastWeather", (request, response) => {
    response.set('Access-Control-Allow-Origin', '*')
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