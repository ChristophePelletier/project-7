//STORE
// WE ONLY STORE DATAS THAT WILL BE USED IN MULTIPLE COMPONENTS

// adaptation méthode Wawa Sensei
// https://www.youtube.com/watch?v=W2ZWbE45vkg&t=551s
//

import { createStore } from "vuex";
const axios = require("axios");
const instance = axios.create({
  baseURL: "http://localhost:3000/",
});

//we declare the user before everything else
//so we get the user from the localStorage it he exists
//else -> no token an userId: -1
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
    //we parse the user in the localStorage
    console.log("user : 2", user);
    //instance.defaults.headers.common["Authorization"] = user.token;
    //instance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
  } catch (pb) {
    user = {
      userId: -1,
      token: "",
    };
  }
}

// Create a new store instance.
const store = createStore({
  //STATE --> DATA
  state: {
    //statut empty at the beginning
    status: "",
    //
    user: user,
  },
  //MUTATIONS
  mutations: {
    setStatus: function (state, status) {
      state.status = status;
    },
    logUser: function (state, user) {
      //instance.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
      //instance.defaults.headers.common["Authorization"] = user.token;
      //we store the user in the localStorage so keep his token and retrieve it after a refresh
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
    },
    logout: function (state) {
      state.user = {
        userId: -1,
        token: "",
      };
      localStorage.removeItem("user");
    },
  },
  //ACTIONS
  //Actions are similar to mutations, the differences being that:
  //Instead of mutating the state, actions ***commit*** mutations.
  actions: {
    login: ({ commit }, user) => {
      commit("setStatus", "chargement");
      return new Promise((resolve, reject) => {
        instance
          .post("/api/auth/login", user)
          .then(function (response) {
            commit("setStatus", "");
            commit("logUser", response.data);
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "erreur_login");
            reject(error);
          });
      });
    },
    signup: ({ commit }, user) => {
      commit("setStatus", "chargement");
      return new Promise((resolve, reject) => {
        commit;
        instance
          .post("/api/auth/signup", user)
          .then(function (response) {
            commit("setStatus", "créé");
            resolve(response);
          })
          .catch(function (error) {
            commit("setStatus", "erreur_signup");
            reject(error);
          });
      });
    },
  },
});

export default store;
