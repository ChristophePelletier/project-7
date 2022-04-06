<template>
  <div class="signup">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Login</h1>
    <div>
      <input type="email" name="email" v-model="email" placeholder="email" />
      <p>{{ login }}</p>
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
    <button @click="signup">Se connecter</button>
  </div>
</template>

<script>
import signupService from "@/services/loginService";

export default {
  data() {
    return {
      email: "",
      password: "",
      name: "",
    };
  },
  methods: {
    async signup() {
      try {
        const response = await signupService.signup({
          email: this.email,
          password: this.password,
        });
        console.log(response.data);
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>