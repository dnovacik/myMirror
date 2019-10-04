import { weatherService } from "./../../services/weather.service";
import weatherModel from "../../models/weather/weather.model";
import forecast from "../../models/weather/forecast.model";

const state = {
  weather: weatherModel,
  forecast: forecast,
  errorMessage: null,
  isGettingData: false
};

const getters = {
  gettingData() {
    return state.isGettingData;
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
    state.isGettingData = true;
  },

  updateWeatherSuccess(state, model) {
    state.weather = model;
    state.isGettingData = false;
  },

  updateWeatherFailure(state, err) {
    state.weather = weatherModel;
    state.isGettingData = false;
    state.errorMessage = err;
  },

  updateForecastInitiated(state) {
    state.isGettingData = true;
  },

  updateForecastSuccess(state, model) {
    state.forecast = model;
    state.isGettingData = false;
  },

  updateForecastFailure(state, err) {
    state.forecase = forecase;
    state.isGettingData = false;
    state.errorMessage = err;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};