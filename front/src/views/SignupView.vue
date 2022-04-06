<template>
  <div class="about">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Signup</h1>
    <div>
      <input type="email" name="email" v-model="email" placeholder="email" />
    </div>
    <div>
      <input
        type="password"
        name="password"
        v-model="password"
        placeholder="password"
      />
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
      name: "",
    };
  },
  methods: {
    async signup() {
      const response = await signupService.signup({
        email: this.email,
        password: this.password,
      });
      console.log(response.data);
    },
    /*,
    mounted() {
      axios
        .post("http://localhost:3000/api/auth/signup", {
          email: this.email,
          password: this.password,
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    */
    /*
    signup() {
      console.log("click register button", this.email, this.name);
    },
    */
  },
  /*
  watch: {
    email(value) {
      console.log("email : ", value);
    },
  }, */
};
</script>