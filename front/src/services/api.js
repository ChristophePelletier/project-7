// axios object that points to the backend

import axios from "axios";

export default () =>
  axios.create({
    baseURL: "http://localhost:3000",
    /*
    headers: {
      Authorization: `Bearer ${store.state.token}`,
    },
    */
  });
