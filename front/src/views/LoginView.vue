<template>
  <div class="card">
    <h1 v-if="mode == 'login'">Login</h1>
    <h1 v-else>Signup</h1>
    <p v-if="mode == 'login'">
      Vous n'avez pas de compte
      <span @click="switchToSignup()">Créer un compte</span>
    </p>
    <p v-else>
      Tu as déjà un compte ?
      <span @click="switchToLogin()">Se connecter</span>
    </p>
    <div>
      <input v-model="email" type="text" placeholder="Adresse mail" />
    </div>
    <div>
      <input v-model="password" type="password" placeholder="Mot de passe" />
    </div>
    <div v-if="mode == 'login' && status == 'error_login'">
      Adresse mail et/ou mot de passe invalide
    </div>
    <div v-if="mode == 'create' && status == 'error_create'">
      Adresse mail déjà utilisée
    </div>
    <div>
      <button
        @click="login()"
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
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
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
            self.$router.push("/home");
          },
          function (error) {
            console.log(error);
          }
        );
    },
    signup: function () {
      this.$store
        .dispatch("signup", {
          email: this.email,
          password: this.password,
        })
        .then(
          function (response) {
            console.log(response);
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
div.alert ol,
div.alert,
div.alert li {
  color: red;
  text-align: center;
  list-style-type: none !important;
}
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