<template>
  <div>
    <!--méthode d'après Wawa Sensei : https://www.youtube.com/watch?v=W2ZWbE45vkg&t=551s-->
    <!--TITRE-->
    <h1 v-if="mode == 'login'">Connexion</h1>
    <h1 v-else>Inscription</h1>
    <!--FIN TITRE-->
    <p class="info" v-if="mode == 'login'">
      Vous n'êtes pas encore inscrit(e) :
    </p>
    <p class="info" v-else>Vous êtes déjà inscrit(e) :</p>

    <p class="lien" v-if="mode == 'login'" @click="switchToSignup()">
      Je crée un compte
    </p>
    <p class="lien" v-else @click="switchToLogin()">Je me connecte</p>

    <!--FORMULAIRE-->
    <form>
      <!--PARTIE 1-->
      <div>
        <p v-if="mode == 'signup'">
          <label for="prénom">Votre prénom</label>
          <input
            :class="{ vide: !enteredFirstName }"
            v-model="firstName"
            type="text"
            placeholder="Votre prénom"
            id="prénom"
            class="form-control"
          />
        </p>
        <p v-if="mode == 'signup'">
          <label for="nom">Votre nom</label>
          <input
            :class="{ vide: !enteredSecondName }"
            v-model="secondName"
            type="text"
            placeholder="Votre nom"
            id="nom"
            class="form-control"
          />
        </p>
      </div>
      <!--PARTIE 2-->
      <div class="form-group">
        <p>
          <label for="email">Votre adresse mail</label>
          <input
            :class="{ vide: !enteredEmail }"
            v-model="email"
            type="email"
            placeholder="Votre adresse mail"
            id="email"
            class="form-control"
          />
        </p>

        <p>
          <label for="password">Votre mot de passe</label>
          <input
            :class="{ vide: !enteredPassword }"
            v-model="password"
            type="password"
            placeholder="Votre mot de passe"
            id="password"
            class="form-control"
          />
        </p>
      </div>
      <div v-if="mode == 'login' && status == 'error_login'">
        Adresse mail et/ou mot de passe invalide
      </div>
    </form>

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
    enteredEmail: function () {
      if (this.mode == "signup") {
        if (this.email != "") {
          return true;
        } else {
          return false;
        }
        //mode login
      } else {
        if (this.email != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    enteredPassword: function () {
      if (this.mode == "signup") {
        if (this.password != "") {
          return true;
        } else {
          return false;
        }
        //mode login
      } else {
        if (this.password != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    enteredSecondName: function () {
      if (this.mode == "signup") {
        if (this.secondName != "") {
          return true;
        } else {
          return false;
        }
        //mode login
      } else {
        if (this.secondName != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    enteredFirstName: function () {
      if (this.mode == "signup") {
        if (this.firstName != "") {
          return true;
        } else {
          return false;
        }
        //mode login
      } else {
        if (this.firstName != "") {
          return true;
        } else {
          return false;
        }
      }
    },
    enteredPassword: function () {
      if (this.mode == "signup") {
        if (this.password != "") {
          return true;
        } else {
          return false;
        }
        //mode login
      } else {
        if (this.password != "") {
          return true;
        } else {
          return false;
        }
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