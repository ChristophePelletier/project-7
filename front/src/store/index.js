import { createStore } from "vuex";

export default createStore({
  state: {
    token: null,
    userId: null,
    loggedIn: false,
  },
  getters: {},
  mutations: {
    setToken(state, token) {
      state.token = token;
      if (token) {
        state.loggedIn = true;
      } else {
        state.loggedIn = false;
      }
    },
    setUserId(state, userId) {
      state.userId = userId;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setUserId({ commit }, userId) {
      commit("setUserId", userId);
    },
  },
  modules: {},
});
