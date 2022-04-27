<template>
  <div>
    <!--méthode Wawa Sensei : https://www.youtube.com/watch?v=W2ZWbE45vkg&t=551s-->
    <h1 v-if="mode == 'login'">Connexion</h1>
    <h1 v-else>Inscription</h1>
    <p class="info" v-if="mode == 'login'">Vous n'êtes pas déjà inscrit(e) :</p>
    <p class="info" v-else>Vous êtes déjà inscrit(e) :</p>

    <p class="lien" v-if="mode == 'login'" @click="switchToSignup()">
      Je crée un compte
    </p>
    <p class="lien" v-else @click="switchToLogin()">Je me connecte</p>

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

    <button
      :class="{ 'button--disabled': !validatedFields }"
      class="button btn btn-primary"
      v-if="mode == 'login'"
      @click="login()"
    >
      >
      <span v-if="status == 'loading'">Connexion en cours</span>
      <span v-else>Connexion</span>
    </button>
    <button
      :class="{ 'button--disabled': !validatedFields }"
      class="button btn btn-primary"
      v-else
      @click="signup()"
    >
      <span v-if="status == 'loading'">Création en cours</span>
      <span v-else>Créer mon compte</span>
    </button>
    <div v-if="mode == 'login'">
      <p v-if="email == ''">Merci de remplir votre mail</p>
      <p v-if="password == ''">Merci saisir votre mot de passe</p>
    </div>
    <div v-if="mode == 'signup'">
      <p v-if="firstName == ''">Merci de remplir votre prénom</p>
      <p v-if="secondName == ''">Merci de remplir votre</p>
      <p v-if="email == ''">Merci de remplir votre mail</p>
      <p v-if="password == ''">Merci de choisir un mot de passe</p>
    </div>
    <div v-html="error" />
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
        if (
          this.email != "" &&
          this.password != "" &&
          this.firstName != "" &&
          this.secondName != ""
        ) {
          return true;
        } else {
          return false;
        }
        //mode login
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
p.lien {
  text-decoration: underline;
  margin-top: 0;
  padding-top: 0;
  margin-bottom: 0;
  padding-bottom: 3em;
}
p.lien:hover {
  cursor: pointer;
}
p.info {
  margin-top: 0;
  padding-top: 0;
  margin-bottom: 0;
  padding-bottom: 0;
}

.button--disabled {
  background-color: black !important;
  cursor: not-allowed;
}
</style>