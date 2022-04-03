<template>
  <div class="about">
    <img alt="Vue logo" src="../assets/logo.png" />
    <h1>Signup</h1>
    <div>
      <input type="email" name="email" v-model="email" placeholder="email" />
    </div>
    <input type="text" name="nom" v-model="name" placeholder="nom" />
    <button @click="signup">S'inscrire</button>
  </div>
</template>

<script>
import register from "@/services/register";
export default {
  data() {
    return {
      email: "",
      name: "",
    };
  },
  methods: {
    async signup() {
      await register.signup({
        email: this.email,
        name: this.name,
      });
    },
    /*
    signup() {
      console.log("click register button", this.email, this.name);
    },
    */
  },
  watch: {
    email(value) {
      console.log("email : ", value);
    },
  },
};
</script>
