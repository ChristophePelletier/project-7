<template>
  <header>
    <!--MENU-->
    <nav>
      <div>
        <router-link to="/" class="nav-link active">Accueil</router-link>
      </div>
      <div>
        <router-link
          v-if="$store.state.user.userId !== -1"
          to="/article-create"
          class="nav-link active"
        >
          Rédiger un article
        </router-link>
      </div>
      <div>
        <router-link
          v-if="$store.state.user.userId == -1"
          to="/login"
          class="nav-link active"
        >
          Login
        </router-link>
      </div>
      <div>
        <a
          v-if="$store.state.user.userId !== -1"
          v-on:click="logout()"
          class="nav-link active pointer"
        >
          Déconnexion
        </a>
      </div>
      <div>
        <a
          v-if="$store.state.user.userId !== -1"
          v-on:click="monCompte()"
          class="nav-link active pointer"
        >
          Mon compte
        </a>
      </div>
      <div>
        <!-- v-if="$store.state.user.admin == true" -->
        <router-link to="/admin" class="nav-link active">
          Administration
        </router-link>
      </div>
    </nav>
    <!--FIN DU MENU-->
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




<style>
/*
  <button v-if="$store.state.loggedIn" @click="logout">Logout</button>
  */
)
/*on l'ajoutera à la fin afin de ne pas masquer de suite dynamiquement les menus
v-if="!$store.state.loggedIn"
*/
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