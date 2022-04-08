<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/article">Article</router-link> |
    <router-link to="/signup">Signup</router-link>|
    <router-link to="/login">Login</router-link> |
    <router-link to="/about">À propos</router-link>
    <button v-if="$store.state.loggedIn" @click="logout">Logout</button>
  </nav>
  <router-view />

  <footer>
    <p>2022 -- Groupomania</p>
  </footer>
</template>

<script>
import loginService from "@/services/loginService";

export default {
  methods: {
    logout() {
      this.$store.dispatch("setToken", null);
      this.$store.dispatch("setUserId", null);
      this.$router.push({ name: "root" });
    },
  },
};
</script>

<style>
/*on l'ajoutera à la fin afin de ne pas masquer de suite dynamiquement les menus
v-if="!$store.state.loggedIn"
*/
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>

