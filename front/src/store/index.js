//méthode d'après Wawa Sensei : https://www.youtube.com/watch?v=W2ZWbE45vkg&t=551s
import { createStore } from "vuex";
const axios = require("axios");
const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

let user = localStorage.getItem("user");
console.log("user : 1", user);
if (!user) {
  user = {
    userId: -1,
    token: "",
  };
} else {
  try {
    user = JSON.parse(user);
    console.log("user : 2", user);
    //instance.defaults.headers.common["Authorization"] = user.token;
    //instance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  } catch (ex) {
    user = {
      userId: -1,
      token: "",
    };
  }
}

// Create a new store instance.
const store = createStore({
  state: {
    status: "",
    user: user,
  },
  mutations: {
    //https://vuex.vuejs.org/guide/mutations.html#object-style-commit
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      //instance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      //instance.defaults.headers.common["Authorization"] = user.token;
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    userInfos: function (state, userInfos) {
      state.userInfos = userInfos;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: "",
      };
      localStorage.removeItem("user");
    },
  },
  actions: {
    login: ({ commit }, userInfos) => {
      commit("setStatus", "chargement");
      //we commit "setStatus" in mode "loading" at login
      return new Promise((resolve, reject) => {
        instance
          .post("/api/auth/login", userInfos)
          .then(function (response) {
            //we passe the status to "" when the user si logged in
            commit("setStatus", "");
            //commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "erreur d'identification");
            reject(error);
          });
      });
    },
    signup: ({ commit }, userInfos) => {
      commit("setStatus", "loading");
      return new Promise((resolve, reject) => {
        commit;
        instance
          .post("/api/auth/signup", userInfos)
          .then(function (response) {
            commit("setStatus", "compte créé");
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "erreur dans l'inscription");
            reject(error);
          });
      });
    },
  },
});

export default store;
