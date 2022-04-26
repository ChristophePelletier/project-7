import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/global.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
createApp(App).use(store).use(router).mount("#app");

//import "./assets/custom.scss";
import "./styles/custom-bootstrap.scss";

/*
https://insidert.medium.com/customizing-bootstrap-inside-vue-cli-project-c2e756c9fa29
*/
