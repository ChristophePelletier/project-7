<template>
  <div>
    <!--méthode Wawa Sensei : https://www.youtube.com/watch?v=W2ZWbE45vkg&t=551s-->
    <h1 v-if="mode == 'login'">Connexion</h1>
    <h1 v-else>Inscription</h1>
    <p v-if="mode == 'login'">
      <span @click="switchToSignup()">Créer un compte</span>
    </p>
    <p v-else>
      <span @click="switchToLogin()">Se connecter</span>
    </p>
    <div v-if="mode == 'signup'">
      <input v-model="firstName" type="text" placeholder="Prénom" />
    </div>
    <div>
      <input v-model="email" type="text" placeholder="Adresse mail" />
    </div>

    <div>
      <input v-model="password" type="password" placeholder="Mot de passe" />
    </div>
    <div v-if="mode == 'login' && status == 'error_login'">
      Adresse mail et/ou mot de passe invalide
    </div>
    <div v-if="mode == 'signup' && status == 'error_signup'">
      Adresse mail déjà utilisée
    </div>
    <div>
      <button
        @click="login()"
        class="button"
        :class="{ 'button--disabled': !validatedFields }"
        v-if="mode == 'login'"
      >
        <span v-if="status == 'loading'">Connexion en cours...</span>
        <span v-else>Connexion</span>
      </button>
      <button
        @click="signup()"
        :class="{ 'button--disabled': !validatedFields }"
        v-else
      >
        <span v-if="status == 'loading'">Création en cours...</span>
        <span v-else>Créer mon compte</span>
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
          firstName: this.firstName,
        })
        .then(
          function () {
            self.login();
          },
          function (error) {
            console.log(error);
          }
        );
    },
  },
};
</script>

<style scoped>
.form-row {
  display: flex;
  margin: 16px 0px;
  gap: 16px;
  flex-wrap: wrap;
}
.form-row__input {
  padding: 8px;
  border: none;
  border-radius: 8px;
  background: #f2f2f2;
  font-weight: 500;
  font-size: 16px;
  flex: 1;
  min-width: 100px;
  color: black;
}
.form-row__input::placeholder {
  color: #aaaaaa;
}
</style>