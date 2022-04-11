<template>
  <div class="login">
    <img alt="" src="../assets/icon-above-font.png" />
    <h1>Login</h1>
    <div>
      <input type="email" name="email" v-model="email" placeholder="email" />
      <p>{{ email }}</p>
    </div>
    <div>
      <input
        type="password"
        name="password"
        v-model="password"
        placeholder="password"
      />
      <p>{{ password }}</p>
    </div>
    <button @click="login">Se connecter</button>
  </div>
</template>

<script>
import loginService from "@/services/loginService";

export default {
  name: "login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await loginService.login({
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch("setToken", response.data.token);
        // store --> setToken method
        this.$store.dispatch("setUserId", response.data.userId);
        this.$store.dispatch("setUserEmail", response.data.email);
        console.log("response.data :", response.data);
        console.log("response.data.message :", response.data.message);
        console.log("response.data.userId :", response.data.userId);
        console.log("response.data.token :", response.data.token);
      } catch (error) {
        console.log("error");
        //this.error = error.response.data.error;
      }
    },
  },
};
</script>