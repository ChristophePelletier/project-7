<template>
  <div>
    <!--méthode Wawa Sensei : https://www.youtube.com/watch?v=W2ZWbE45vkg&t=551s-->
    <h1 v-if="mode == 'login'">Connexion</h1>
    <h1 v-else>Inscription</h1>
    <form>
      <div v-if="mode == 'signup'" class="form-group">
        <label for="prénom">Votre prénom</label>
        <input
          v-model="firstName"
          type="text"
          placeholder="Prénom"
          id="prénom"
          class="form-control"
        />
      </div>
      <div v-if="mode == 'signup'" class="form-group">
        <label for="nom">Votre nom</label>
        <input
          v-model="secondName"
          type="text"
          placeholder="Nom"
          id="nom"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="email">Votre adresse mail</label>
        <input
          v-model="email"
          type="email"
          placeholder="Adresse mail"
          id="email"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="password">Votre mot de passe</label>
        <input
          v-model="password"
          type="password"
          placeholder="Mot de passe"
          id="password"
          class="form-control"
        />
      </div>
      <div v-if="mode == 'login' && status == 'error_login'">
        Adresse mail et/ou mot de passe invalide
      </div>
    </form>

    <!--
    <div v-if="mode == 'signup' && status == 'error_signup'">
      Adresse mail déjà utilisée
    </div>
    -->
    <div>
      <button
        v-if="mode == 'login'"
        @click="login()"
        class="button btn btn-primary"
      >
        >
        <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span>
      </button>
      <button v-else @click="signup()">
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer mon compte</span>
      </button>
      <div v-if="mode == 'signup'">
        <p v-if="firstName == ''">Merci de remplir un prénom</p>
        <p v-if="secondName == ''">Merci de remplir un Nom</p>
      </div>
      <div v-html="error" />

      <p v-if="mode == 'login'">Vous n'êtes pas déjà inscrit(e)</p>
      <p v-else>Déjà inscrit ?</p>

      <button class="btn-primary">
        <span v-if="mode == 'login'" @click="switchToSignup()"
          >Je crée un compte<br
        /></span>
        <span v-else @click="switchToLogin()"> Je me connecte</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Login",
  data: function () {
    return {
      mode: "login",
      email: "",
      password: "",
      firstName: "",
      secondName: "",
      error: null,
      erreurs: [],
    };
  },
  mounted: function () {
    if (this.$store.state.user.userId != -1) {
      this.$router.push("/articles");
      return;
    }
  },
  computed: {
    validatedFields: function () {
      if (this.mode == "signup") {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    ...mapState(["status"]),
  },
  methods: {
    checkForm: function (e) {
      if (this.mode == "signup") {
        if (this.firstName && this.secondName) {
          return true;
        }
        this.erreurs = [];
        if (!this.firstName) {
          this.erreurs.push("Name required.");
        }
        if (!this.secondName) {
          this.erreurs.push("SedondName required.");
        }
        e.preventDefault();
      }
    },
    switchToSignup: function () {
      this.mode = "signup";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    login: function () {
      const self = this;
      this.$store
        .dispatch("login", {
          email: this.email,
          password: this.password,
        })
        .then(
          function () {
            self.$router.push("/articles");
          },
          function (error) {
            console.log(error);
          }
        );
    },
    signup: function () {
      const self = this;
      this.$store
        .dispatch("signup", {
          email: this.email,
          password: this.password,
          secondName: this.secondName,
          firstName: this.firstName,
        })
        .then(
          function () {
            self.login();
          },
          function (error) {
            console.log("error.response.data.error", error.response.data.error);
            self.error = error.response.data.error;
          }
        );
    },
  },
};
</script>

<style scoped>
</style>