<template>
  <div class="wrapper">
    <div class="wrapper-header">
      <span class="heading">{{ weather.weather.locationName }}</span>
    </div>
    <div class="weather-content-wrapper">
      <div class="row">
        <i class="wi wi-strong-wind weathericon"></i>
        <span class="wind-speed">{{ weather.weather.windSpeed }}</span>
        <span class="wind-direction">{{ weather.weather.windDirection }}</span>
        <span class="humidity">{{ weather.weather.humidity }}</span>
        <i class="wi wi-humidity weathericon humidity-icon"></i>
        <i :class="weather.weather.sunriseSunsetIcon" class="weathericon"></i>
        <span class="sunrise-sunset">{{ weather.weather.sunriseSunsetTime }}</span>
      </div>
      <div class="row temperature-row">
        <i :class="weather.weather.weatherType" class="weathericon weather"></i>
        <span class="temperature">{{ weather.weather.temperature }}</span>
      </div>
      <div class="row feels-like">{{ 'Feels ' }}{{ weather.weather.feelsLike }}</div>
    </div>
    <div class="wrapper-header over"></div>
    <div class="weather-content-wrapper">
      <div
        v-for="(forecastDay, i) in weather.forecast.forecastDays"
        :key="`fday_${i}`"
        class="row forecast-row"
      >
        <span class="forecast-day-name">{{ forecastDay.day }}</span>
        <i :class="forecastDay.icon" class="weathericon"></i>
        <span class="min-temp">{{ forecastDay.minTemp }}</span>
        <span class="max-temp">{{ forecastDay.maxTemp }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import weatherModel from "@/models/weather/weather.model";
import { mapState } from "vuex";

export default {
  name: "WeatherModule",
  computed: {
    ...mapState(["weather"])
  }
};
</script>

<style lang="scss" scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-bottom: 50px;

  .wrapper-header {
    display: flex;
    justify-content: flex-end;
    min-width: 270px;
    color: rgb(145, 145, 145);
    padding-bottom: 5px;
    border-bottom: 1px solid rgb(145, 145, 145);
    border-image: linear-gradient(to right, #000 5%, #aaa 20%);
    border-image-slice: 1;

    &.over {
      border-bottom: none;
      border-top: 1px solid rgb(145, 145, 145);
      border-image: linear-gradient(to right, #000 25%, #aaa 60%);
      border-image-slice: 1;
    }

    .heading {
      display: flex;
      align-self: center;
      text-transform: uppercase;
      font-size: 20px;
    }
  }

  .weather-content-wrapper {
    display: flex;
    flex-direction: column;

    .row {
      padding-top: 10px;
      display: flex;
      flex-direction: row;
      font-size: 30px;
      align-items: center;
      justify-content: flex-end;

      &.forecast-row {
        padding-top: 0;
        font-size: 20px;
        justify-content: space-between;

        .weathericon {
          display: flex;
          flex-direction: column;
          justify-content: center;
          height: 20px;
          width: 50px;
          align-items: center;
        }

        span {
          display: flex;
          height: 20px;
          width: 50px;
          align-items: center;
          justify-content: flex-end;
        }
      }

      &.temperature-row {
        align-items: flex-end;
      }

      .weathericon {
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 30px;
        align-items: center;
        padding: 0 5px;

        &.weather {
          height: 60px;
          font-size: 50px;
          padding: 0 10px;
        }

        &.humidity-icon {
          font-size: 16px;
          justify-content: flex-start;
        }
      }

      span {
        display: flex;
        padding: 0 0 0 5px;
        height: 30px;
        align-items: center;

        &.wind-speed {
          color: #fff;
        }

        &.wind-direction {
          flex-direction: column;
          font-size: 16px;
          align-items: flex-start;
        }

        &.sunrise-sunset {
          color: #fff;
        }

        &.temperature {
          height: 60px;
          font-size: 60px;
          color: #fff;
        }
      }
    }
  }
}
</style>