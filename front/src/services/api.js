// axios object that points to the backend

import axios from "axios";
import store from "@/store/index.js";

export default () =>
  axios.create({
    baseURL: "http://localhost:3000",
    /*
    headers: {
      Authorization: `Bearer ${store.state.token}`,
    },
    */
  });
