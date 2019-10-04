import axios from "axios";
import config from "./../config.json";

const apiBase = "https://blockchain.info/ticker";
const baseTicker = config.modules.bitcoinPrice.baseTicker;

export const blockchainService = {
  updateBitcoinPrice
}

function updateBitcoinPrice() {
  return axios.get(`${apiBase}`)
    .then(response => {
      const ticker = response.data[baseTicker];

      if (ticker) {
        return ticker;
      } else {
        throw 'Unknown ticker'
      }
    });
}