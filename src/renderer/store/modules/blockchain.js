import { blockchainService } from "./../../services/blockchain.service";

const state = {
  cryptoPrice: [],
  errorMessage: null,
  isGettingPriceData: true
};

const getters = {
  gettingPriceData() {
    return state.isGettingPriceData;
  },

  cryptoPrice() {
    return state.cryptoPrice;
  }
};

const actions = {
  updateCryptoPrice({ commit }) {
    commit('updateCryptoPriceInitiated');
    blockchainService.updateCryptoPrice()
      .then(model => {
        commit('updateCryptoPriceSuccess', model);
      })
      .catch(err => {

      })
  }
};

const mutations = {
  updateCryptoPriceInitiated(state) {
    state.isGettingPriceData = true;
  },

  updateCryptoPriceSuccess(state, model) {
    state.cryptoPrice = model;
    state.isGettingPriceData = false;
  },

  updateCryptoPriceFailure(state, err) {
    state.cryptoPrice = [];
    state.isGettingPriceData = false;
    state.errorMessage = err;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};