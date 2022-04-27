<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">GROUPOMANIA</router-link>
        <button type="button">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
            <router-link to="/" class="nav-link active">Accueil</router-link>
            <router-link
              v-if="$store.state.user.userId !== -1"
              to="/article-create"
              class="nav-link active"
            >
              Rédiger un article
            </router-link>
            <router-link
              v-if="$store.state.user.userId == -1"
              to="/login"
              class="nav-link active"
            >
              Login
            </router-link>

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
            <!-- v-if="$store.state.user.admin == true" -->
            <router-link to="/admin" class="nav-link active">
              Administration
            </router-link>
          </div>
        </div>
      </div>
    </nav>
  </header>
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




