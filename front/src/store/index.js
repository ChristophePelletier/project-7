import { createStore } from "vuex";

export default createStore({
  state: {
    token: null,
    userId: null,
    loggedIn: false,
    email: null,
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
    setUserEmail(state, email) {
      state.email = email;
    },
  },
  actions: {},
  modules: {},
});

/*
import { createStore } from "vuex";

export default createStore({
  state: {
    token: null,
    userId: null,
    loggedIn: false,
    email: null,
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
    setUserEmail(state, email) {
      state.email = email;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("setToken", token);
    },
    setUserId({ commit }, userId) {
      commit("setUserId", userId);
    },
    setUserEmail({ commit }, email) {
      commit("setUserEmail", email);
    },
  },
  modules: {},
});
*/
