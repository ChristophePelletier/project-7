<template>
  <header>
    <!--LOGO-->
    <div class="brand">
      <img class="brand" alt="" src="./assets/icon-above-font.png" />
    </div>
    <!--MENU-->
    <div id="hnav">
      <nav>
        <!--ACCUEIL-->
        <div>
          <router-link to="/" class="nav-link active">Accueil</router-link>
        </div>
        <!--RÉDIGER UN ARTICLE-->
        <div v-if="$store.state.user.userId !== -1">
          <router-link to="/articles" class="nav-link active">
            <!--  :class="{ vide: enteredFirstName }"-->
            Tous les posts
          </router-link>
        </div>
        <!--****************-->
        <!--****************-->
        <!--****************-->
        <!--****************-->
        <!--RÉDIGER UN ARTICLE-->
        <div v-if="$store.state.user.userId !== -1">
          <router-link to="/article-create" class="nav-link active">
            <!--  :class="{ vide: enteredFirstName }"-->
            Rédiger un post
          </router-link>
        </div>
        <!--****************-->
        <!--****************-->
        <!--LOGIN-->
        <div v-if="$store.state.user.userId == -1">
          <router-link to="/login" class="nav-link active"> Login </router-link>
        </div>
        <!--****************-->
        <!--****************-->
        <!--DÉCONNEXION-->
        <div v-if="$store.state.user.userId !== -1">
          <a v-on:click="logout()" class="nav-link active pointer">
            Déconnexion
          </a>
        </div>
        <!--****************-->
        <!--****************-->
        <!--MON COMPTE-->
        <div v-if="$store.state.user.userId !== -1">
          <a
            v-bind:class="{ actif: userUrl }"
            v-on:click="monCompte()"
            id="user"
            class="nav-link active pointer"
          >
            Mon compte
          </a>
        </div>
        <!--****************-->
        <!--****************-->
        <!--ADMINISTRATION-->
        <div>
          <!-- v-if="$store.state.user.admin == true" -->
          <router-link to="/admin" class="nav-link active">
            Administration
          </router-link>
        </div>
        <!--****************-->
        <!--****************-->
      </nav>
    </div>
    <!--FIN DU MENU-->
  </header>
  <router-view />

  <foot />
</template>

<script>
import HomeLink from "./views/Header.vue";
import Foot from "./views/FootView";

export default {
  data() {
    return {
      userId: this.$store.state.user.userId,
    };
  },
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
  computed: {
    userUrl: function () {
      if (window.location.href.indexOf("user") > -1) {
        return true;
      } else {
        return false;
      }
    },
  },
};
//

//
</script>




<style>
/*
  <button v-if="$store.state.loggedIn" @click="logout">Logout</button>
  */
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
  color: darkslategrey;
  text-decoration: underline;
}

#user {
  color: black !important;
}

.actif {
  text-decoration: underline !important;
}
</style>