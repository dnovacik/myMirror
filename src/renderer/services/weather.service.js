import axios from "axios";
import qs from "qs";
import moment from "moment";
import config from "./../config.json";
import forecastModel from "../models/weather/forecast.model.js";

const apiBase = "https://api.openweathermap.org/data/2.5";
const req = {
  id: config.modules.weather.locationID,
  appid: config.modules.weather.appid,
  units: config.modules.weather.units
};

export const weatherService = {
  updateWeather,
  updateForecast
}

function updateWeather() {
  moment.locale(config.config.language);

  return axios.get(`${apiBase}/weather?${qs.stringify(req)}`)
    .then(response => {
      return parseWeatherResponse(response.data);
    });
}

function updateForecast() {
  moment.locale(config.config.language);

  return axios.get(`${apiBase}/forecast?${qs.stringify(req)}`)
    .then(response => {
      return parseForecastResponse(response.data);
    });
}

function parseWeatherResponse(data) {
  if (!data || !data.main || typeof data.main.temp === "undefined") {
    throw 'Bad weather data response';
  }

  const locationName = `${data.name}, ${data.sys.country}`;
  const humidity = parseFloat(data.main.humidity);
  const temperature = `${parseFloat(data.main.temp).toFixed(1)}${config.modules.weather.units === 'metric' ? '°C' : '°F'}`;
  const windSpeed = parseFloat((data.wind.speed * 60 * 60) / 1000).toFixed(1);
  const windDirection = degreesToDirectional(data.wind.deg);
  const weatherType = config.modules.weather.icons[data.weather[0].icon];
  const { sunriseSunsetTime, sunriseSunsetIcon } = getSunriseSunsetData(new Date(), new Date(data.sys.sunrise * 1000), new Date(data.sys.sunset * 1000));
  const feelsLike = getFeelsLikeTemperature(data.wind.speed, data.main.temp, humidity);

  return {
    locationName: locationName,
    humidity: humidity,
    temperature: temperature,
    windSpeed: windSpeed,
    windDirection: windDirection,
    weatherType: weatherType,
    feelsLike: feelsLike,
    sunriseSunsetTime: sunriseSunsetTime,
    sunriseSunsetIcon: sunriseSunsetIcon
  };
}

function parseForecastResponse(data) {
  if (!data || !data.city || data.list.length < 1) {
    throw 'Bad forecast data response';
  }

  let forecastDays = [];
  let lastDay = null;
  let forecastData = {};

  for (var i = 0; i < data.list.length; i++) {
    let forecast = data.list[i];

    let day, hour;

    if (!!forecast.dt_txt) {
      day = moment(forecast.dt_txt, "YYYY-MM-DD hh:mm:ss").format("ddd");
      hour = moment(forecast.dt_txt, "YYYY-MM-DD hh:mm:ss").format("H");
    } else {
      day = moment(forecast.dt, "X").format("ddd");
      hour = moment(forecast.dt, "X").format("H");
    }

    if (day !== lastDay) {
      let forecastData = {
        day: day,
        icon: config.modules.weather.icons[forecast.weather[0].icon],
        minTemp: `${parseFloat(forecast.main.temp_min).toFixed(0)}${config.modules.weather.units === 'metric' ? '°C' : '°F'}`,
        maxTemp: `${parseFloat(forecast.main.temp_max).toFixed(0)}${config.modules.weather.units === 'metric' ? '°C' : '°F'}`
      };

      forecastDays.push(forecastData);
      lastDay = day;

      if (forecastDays.length === config.modules.weather.forecastDays) {
        break;
      }
    } else {
      forecastData.minTemp = forecast.main.temp_min < parseFloat(forecastData.minTemp)
        ? `${forecastModel.main.temp_min.toFixed(1)}${config.modules.weather.units === 'metric' ? '°C' : '°F'}`
        : `${forecastData.minTemp}${config.modules.weather.units === 'metric' ? '°C' : '°F'}`;
      forecastData.maxTemp = forecast.main.temp_max < parseFloat(forecastData.maxTemp)
        ? `${forecastModel.main.temp_max.toFixed(1)}${config.modules.weather.units === 'metric' ? '°C' : '°F'}`
        : `${forecastData.maxTemp}${config.modules.weather.units === 'metric' ? '°C' : '°F'}`;

      if (hour >= 8 && hour <= 17) {
        forecastData.icon = config.modules.weather.icons[forecast.weather[0].icon];
      }
    }
  }

  return {
    locationName: `${data.city.name}, ${data.city.country}`,
    forecastDays: forecastDays
  };
}

function degreesToDirectional(deg) {
  switch (deg) {
    case deg > 11.25 && deg <= 33.75:
      return "NNE";
    case deg > 33.75 && deg <= 78.75:
      return "NE";
    case deg > 56.25 && deg <= 78.75:
      return "ENE";
    case deg > 78.75 && deg <= 101.25:
      return "E";
    case deg > 101.25 && deg <= 123.75:
      return "ESE";
    case deg > 123.75 && deg <= 146.25:
      return "SE";
    case deg > 146.25 && deg <= 168.75:
      return "SSE";
    case deg > 168.75 && deg <= 191.25:
      return "S";
    case deg > 191.25 && deg <= 213.75:
      return "SSW";
    case deg > 213.75 && deg <= 236.25:
      return "SW";
    case deg > 236.25 && deg <= 258.75:
      return "WSW";
    case deg > 258.75 && deg <= 281.25:
      return "W";
    case deg > 281.25 && deg <= 303.75:
      return "WNW";
    case deg > 303.75 && deg <= 326.25:
      return "NW";
    case deg > 326.25 && deg <= 348.75:
      return "NNW";
    default:
      return "N";
  }
}

function getSunriseSunsetData(now, sunrise, sunset) {
  const sunriseSunsetDateObject = (sunrise < now && sunset > now)
    ? sunset
    : sunrise;
  const timeString = moment(sunriseSunsetDateObject).format("HH:mm");

  const sunriseSunsetTime = timeString;
  const sunriseSunsetIcon = (sunrise < now && sunset > now)
    ? "wi wi-sunset"
    : "wi wi-sunrise";

  return {
    sunriseSunsetTime,
    sunriseSunsetIcon
  };
}

function getFeelsLikeTemperature(windSpeed, temperature, humidity) {
  const windInMph = parseFloat(windSpeed * 2.23694);
  let tempInF = config.config.units === "metric"
    ? 1.8 * temperature + 32
    : temperature;

  if (windInMph > 3 && tempInF < 50) {
    const windChillInF = Math.round(35.74 + 0.6215 * tempInF - 35.75 * Math.pow(windInMph, 0.16) + 0.4275 * tempInF * Math.pow(windInMph, 0.16));
    const windChillInC = (windChillInF - 32) * (5 / 9);

    return config.config.units === "metric"
      ? `${windChillInC.toFixed(1)}°C`
      : `${windChillInF.toFixed(1)}°F`;
  } else if (tempInF > 80 && humidity > 40) {
    const hIndex = -42.379 + 2.04901523 * tempInF + 10.14333127 * humidity
      - 0.22475541 * tempInF * humidity - 6.83783 * Math.pow(10, -3) * tempInF * tempInF
      - 5.481717 * Math.pow(10, -2) * humidity * humidity
      + 1.22874 * Math.pow(10, -3) * tempInF * tempInF * humidity
      + 8.5282 * Math.pow(10, -4) * tempInF * humidity * humidity
      - 1.99 * Math.pow(10, -6) * tempInF * tempInF * humidity * humidity;

    return config.config.units === "metric"
      ? `${parseFloat((hIndex - 32) / 1.8).toFixed(1)}°C`
      : `${hIndex.toFixed(1)}°F`;
  } else {
    return `${parseFloat(temperature).toFixed(1)}°C`;
  }
}