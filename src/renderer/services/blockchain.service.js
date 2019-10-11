import axios from "axios";
import qs from "qs";
import config from "./../config.json";

const apiBase = "https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest";
const req = {
  CMC_PRO_API_KEY: config.modules.cryptoPrice.coinMarketCapProApiKey,
  symbol: config.modules.cryptoPrice.coinsTickers,
  convert: config.modules.cryptoPrice.baseTicker.ticker
};

export const blockchainService = {
  updateCryptoPrice
}

function updateCryptoPrice() {
  return axios.get(`${apiBase}?${qs.stringify(req, { arrayFormat: 'comma', encode: false })}`)
    .then(response => {
      return parseCoinMarketCapResponse(response.data.data);
    });
}

function parseCoinMarketCapResponse(data) {
  let result = [];

  config.modules.cryptoPrice.coinsTickers.forEach((coin) => {
    if (data[coin]) {
      result.push({
        symbol: coin,
        price: data[coin].quote[config.modules.cryptoPrice.baseTicker.ticker].price.toFixed(2),
        percent24h_change: data[coin].quote[config.modules.cryptoPrice.baseTicker.ticker].percent_change_24h.toFixed(1)
      })
    }
  });

  return result;
}