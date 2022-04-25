<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand">GROUPOFORUM</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <router-link to="/" class="nav-link active">Accueil</router-link>
          <router-link to="/articles" class="nav-link active">
            Les articles
          </router-link>
          <router-link to="/article-create" class="nav-link active">
            Rédiger un article
          </router-link>
          <router-link
            v-if="$store.state.user.userId == -1"
            to="/login"
            class="nav-link active"
          >
            Login
          </router-link>
          <router-link to="/admin" class="nav-link active"> Admin </router-link>
          <a
            v-if="$store.state.user.userId !== -1"
            v-on:click="logout()"
            class="nav-link active pointer"
          >
            Déconnexion
          </a>
          <a
            v-if="$store.state.user.userId !== -1"
            v-on:click="monCompte()"
            class="nav-link active pointer"
          >
            Mon compte
          </a>
        </div>
      </div>
    </div>
  </nav>
  <router-view />
  <foot />
</template>

<script>
import HomeLink from "./views/Header.vue";
import Foot from "./views/FootView";
export default {
  name: "App",
  components: {
    HomeLink,
  },
  name: "App",
  components: {
    Foot,
  },
  methods: {
    logout: function () {
      this.$store.commit("logout");
      this.$router.push("/articles");
    },
    monCompte: function () {
      this.$router.push("/user/" + this.$store.state.user.userId);
    },
  },
};
</script>

<style>
/*
  <button v-if="$store.state.loggedIn" @click="logout">Logout</button>
  */
)
/*on l'ajoutera à la fin afin de ne pas masquer de suite dynamiquement les menus
v-if="!$store.state.loggedIn"
*/
nav.navbar, nav.navbar-expand-lg, nav.navbar-dark, nav.bg-primary {
  background-color: lightgreen !important;
}
body {
  background-color: rgb(231, 231, 231);
}
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

<style lang="scss">
nav.navbar,
nav.navbar-expand-lg,
nav.navbar-dark,
nav.bg-primary,
button.btn-primary,
.btn,
.btn-primary {
  background-color: #fd2d01 !important;
  border: 0;
}
$bg-primary: red !important;
$body-color: red !important;
// ...
</style>
