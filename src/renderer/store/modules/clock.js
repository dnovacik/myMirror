const state = {
  isGettingClockData: true
};

const getters = {
  gettingClockData() {
    return state.isGettingClockData;
  }
};

const actions = {
  updateClockData({ commit }) {
    commit('updateClockDataSuccess');
  }
};

const mutations = {
  updateClockDataSuccess(state) {
    state.isGettingClockData = false;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};