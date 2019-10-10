import { blockchainService } from "./../../services/blockchain.service";
import blockchainModel from "../../models/blockchain/blockchain.model";

const state = {
  bitcoinPrice: blockchainModel,
  errorMessage: null,
  isGettingPriceData: true
};

const getters = {
  gettingPriceData() {
    return state.isGettingPriceData;
  },

  bitcoinPrice() {
    return state.bitcoinPrice;
  }
};

const actions = {
  updateBitcoinPrice({ commit }) {
    commit('updateBitcoinPriceInitiated');
    blockchainService.updateBitcoinPrice()
      .then(model => {
        commit('updateBitcoinPriceSuccess', model);
      })
      .catch(err => {

      });
  }
};

const mutations = {
  updateBitcoinPriceInitiated(state) {
    state.isGettingPriceData = true;
  },

  updateBitcoinPriceSuccess(state, model) {
    state.weather = model;
    state.isGettingPriceData = false;
  },

  updateBitcoinPriceFailure(state, err) {
    state.weather = weatherModel;
    state.isGettingPriceData = false;
    state.errorMessage = err;
  },
};

export default {
  state,
  mutations,
  actions,
  getters
};