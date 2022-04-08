import { createStore } from "vuex";

export default createStore({
  state: {
    token: null,
    user: null,
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
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setUser({ commit }, user) {
      commit("setUser", user);
    },
  },
  modules: {},
});
