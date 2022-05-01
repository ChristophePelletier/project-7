<template>
  <div>
    <h1>Créer un compte administrateur</h1>
    <form id="administration">
      <div>
        <p v-if="$store.state.user.admin == false">
          Seuls les administrateurs peuvent créer un compte
        </p>
        <label for="prénom">Prénom</label>
        <input
          v-model="firstName"
          type="text"
          placeholder="Prénom"
          id="prénom"
          required="required"
        />
      </div>
      <div>
        <label for="nom">Nom</label>
        <input v-model="secondName" type="text" placeholder="Nom" id="nom" />
      </div>
      <div>
        <label for="email">Mail</label>
        <input
          v-model="email"
          type="email"
          placeholder="Adresse mail"
          id="email"
          required="required"
        />
      </div>

      <div>
        <label for="password">Mot de passe</label>
        <input
          v-model="password"
          type="password"
          placeholder="Mot de passe"
          id="password"
          required="required"
        />
      </div>
      <fieldset>
        <legend>Confirmer votre choix de créer un administrateur</legend>
        <div id="choice">
          <input
            v-model="admin"
            type="radio"
            id="administration"
            name="nonAdmin"
            value="true"
            class="form-control"
          />
          <label for="administration">Administrateur</label>
          <input
            v-model="admin"
            type="radio"
            id="nonAdmin"
            name="nonAdmin"
            value="false"
            class="form-control"
          />
          <label for="nonAdmin">Non administrateur</label>
          <!--<span>Choisi : {{ admin }}</span>-->
        </div>

        <div v-if="mode == 'login' && status == 'error_login'">
          Adresse mail et/ou mot de passe invalide
        </div>
      </fieldset>
    </form>
    <button v-if="$store.state.admin == true" class="btn">
      <span
        @click="
          signup();
          navigateTo({ name: 'admin' });
        "
        >Je crée un compte<br
      /></span>
    </button>

    <p v-html="error" />
  </div>
</template>

<script>
import userService from "@/services/signupService";
export default {
  data() {
    return {
      email: "",
      password: "",
      secondName: "",
      firstName: "",
      admin: "",
      error: null,
    };
  },
  methods: {
    async signup() {
      try {
        const response = await userService.signupAdmin({
          email: this.email,
          password: this.password,
          secondName: this.secondName,
          firstName: this.firstName,
          admin: this.admin,
        });
      } catch (error) {
        this.error = error.response.data.error;
      }
    },

    /*
    async signup() {
      await userService.signupAdmin({
        email: this.email,
        password: this.password,
        secondName: this.secondName,
        firstName: this.firstName,
        admin: this.admin,
      });
      this.$router.push({ name: "admin" });
    },
    catch(error) {
      this.error = error.response.data.error;
    },
    */
  },
};
</script>
