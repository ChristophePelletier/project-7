<template>
  <div class="signup">
    <img alt="" src="../assets/icon-above-font.png" />
    <h1>Signup</h1>
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
    <button @click="signup">S'inscrire</button>
  </div>
</template>

<script>
import signupService from "@/services/signupService";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async signup() {
      try {
        const response = await signupService.signup({
          email: this.email,
          password: this.password,
        });
        //this.$store.dispatch("setToken", response.data.token);
        //this.$store.dispatch("setUser", response.data.user);
        console.log(response.data);
      } catch (error) {
        this.error = error.response.data.error;
      }
    } /*
    redirect() {
      if (xhr.readyState === 4) {
        // Checking status codes
        if (xhr.status === 200) {
          // user logged in
          window.location = "/index";
        } else {
          // login failed
          console.log(xhr.status);
          onError();
        }
      }
    },*/,
  },
};
</script>