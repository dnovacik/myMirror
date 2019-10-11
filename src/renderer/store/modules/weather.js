import { weatherService } from "./../../services/weather.service";
import weatherModel from "../../models/weather/weather.model";
import forecast from "../../models/weather/forecast.model";

const state = {
  weather: weatherModel,
  forecast: forecast,
  errorMessage: null,
  isGettingWeatherData: true
};

const getters = {
  gettingWeatherData() {
    return state.isGettingWeatherData;
  },

  weather() {
    return state.weather;
  },

  forecast() {
    return state.forecast;
  }
};

const actions = {
  updateWeather({ commit }) {
    commit('updateWeatherInitiated');
    weatherService.updateWeather()
      .then(model => {
        commit('updateWeatherSuccess', model);
      })
      .catch(err => {

      });
  },

  updateForecast({ commit }) {
    commit('updateForecastInitiated');
    weatherService.updateForecast()
      .then(model => {
        commit('updateForecastSuccess', model);
      })
      .catch(err => {

      });
  }
};

const mutations = {
  updateWeatherInitiated(state) {
    state.isGettingWeatherData = true;
  },

  updateWeatherSuccess(state, model) {
    state.weather = model;
    state.isGettingWeatherData = false;
  },

  updateWeatherFailure(state, err) {
    state.weather = weatherModel;
    state.isGettingWeatherData = false;
    state.errorMessage = err;
  },

  updateForecastInitiated(state) {
    state.isGettingWeatherData = true;
  },

  updateForecastSuccess(state, model) {
    state.forecast = model;
    state.isGettingWeatherData = false;
  },

  updateForecastFailure(state, err) {
    state.forecase = forecase;
    state.isGettingWeatherData = false;
    state.errorMessage = err;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};