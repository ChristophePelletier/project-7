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
export default {
  data() {
    return {
      email: "",
      name: "",
    };
  },
  methods: {
    signup() {
      console.log("click register button");
    },
  },
  watch: {
    email(value) {
      console.log("email : ", value);
    },
  },
};
</script>
