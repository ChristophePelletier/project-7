import { createStore } from "vuex";
const axios = require("axios");

const instance = axios.create({
  baseURL: "http://localhost:3000",
});

export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {
    createAccount: ({ commit }, userInfos) => {
      return new Promise((resolve, reject) => {
        commit;
        console.log("userInfos", userInfos);
        instance
          .post("api/auth/signup", userInfos)
          .then(function (response) {
            resolve(response);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },
  },
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
