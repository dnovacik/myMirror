<template>
  <div id="app">
    <div v-if="isLoadingApp" class="loading-overlay">
      <bounce-loader :size="100" :color="'#aaa'" class="spinner" />
    </div>
    <div v-else class="main-container">
      <div class="row-container">
        <div class="left-container">
          <clock-module />
        </div>
        <div class="right-container">
          <weather-module />
          <blockchain-module />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import weatherModule from "@/components/modules/weather";
import clockModule from "@/components/modules/clock";
import blockchainModule from "@/components/modules/blockchain";

import { mapState } from "vuex";

export default {
  name: "myMirror",
  components: {
    weatherModule,
    clockModule,
    blockchainModule
  },
  mounted() {
    this.$store.dispatch("weather/updateWeather");
    this.$store.dispatch("weather/updateForecast");
    this.$store.dispatch("blockchain/updateCryptoPrice");
  },
  computed: {
    ...mapState(["weather"]),
    ...mapState(["blockchain"]),
    ...mapState(["clock"]),

    isLoadingApp() {
      return this.weather.isGettingWeatherData && this.blockchain.isGettingPriceData && this.clock.isGettingClockData;
    }
  }
};
</script>

<style lang="scss">
html,
body,
#app {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
}

body {
  margin: 0;
  background-color: #000;
  color: #aaa;
  font-family: "Roboto Condensed", sans-serif;
  font-weight: 400;
  font-size: 18px;
  -webkit-font-smoothing: antialiased;

  #app {
    .loading-overlay {
      background: transparent;
      width: 100vw;
      height: 100vh;
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
      align-self: center;

      .spinner {
        display: flex;
        width: 100px;
        height: 100px;
      }
    }

    .main-container {
      display: flex;
      flex-direction: column;
      padding: 10px;

      .row-container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
}
</style>
