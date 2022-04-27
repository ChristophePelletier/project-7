<template>
  <div>
    <!--méthode d'après Wawa Sensei : https://www.youtube.com/watch?v=W2ZWbE45vkg&t=551s-->

    <!--TITRE-->
    <div>
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
    </div>
    <!--FORMULAIRE-->
    <form>
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
      <div>
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
        <p v-if="mode == 'login' && status == 'error_login'">
          Adresse mail et/ou mot de passe invalide
        </p>
        <ul v-if="mode == 'login'">
          <li v-if="email == ''">Merci de remplir votre mail</li>
          <li v-if="password == ''">Merci saisir votre mot de passe</li>
        </ul>
        <ul v-if="mode == 'signup'">
          <li v-if="firstName == ''">Merci de remplir votre prénom</li>
          <li v-if="secondName == ''">Merci de remplir votre nom</li>
          <li v-if="email == ''">Merci de remplir votre mail</li>
          <li v-if="password == ''">Merci de choisir un mot de passe</li>
        </ul>
        <p v-html="error" />
        <button
          :class="{ 'button--disabled': !validatedFields }"
          class="button btn btn-primary"
          v-if="mode == 'login'"
          @click="login()"
        >
          >
          <span v-if="status == 'loading'">Connexion au forum en cours</span>
          <span v-else>Se connecter</span>
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
      </div>
    </form>
  </div>
  <!--FIN DU FORMULAIRE-->
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
    ...mapState(["status"]),
    //we import mapState status from store
    // generates computed getter functions
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
        //we choose to log directly the user after signup
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
  text-align: center;
}
p.lien:hover {
  cursor: pointer;
}
p.info {
  margin-top: 0;
  padding-top: 0;
  margin-bottom: 0;
  padding-bottom: 0;
  text-align: center;
}

.button--disabled {
  background-color: black !important;
  cursor: not-allowed;
}
</style>