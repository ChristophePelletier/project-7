<template>
  <div>
    <h1>Créer un administrateur</h1>
    <form>
      <div class="form-group">
        <label for="prénom">Prénom</label>
        <input
          v-model="firstName"
          type="text"
          placeholder="Prénom"
          id="prénom"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="nom">Nom</label>
        <input
          v-model="secondName"
          type="text"
          placeholder="Nom"
          id="nom"
          class="form-control"
        />
      </div>
      <div class="form-group">
        <label for="email">Mail</label>
        <input
          v-model="email"
          type="email"
          placeholder="Adresse mail"
          id="email"
          class="form-control"
        />
      </div>

      <div class="form-group">
        <label for="password">Mot de passe</label>
        <input
          v-model="password"
          type="password"
          placeholder="Mot de passe"
          id="password"
          class="form-control"
        />
      </div>

      <div>
        <input
          v-model="admin"
          type="radio"
          id="administration"
          name="nonAdmin"
          value="true"
          checked
        />
        <label for="administration">Admin</label>
        <input
          v-model="admin"
          type="radio"
          id="nonAdmin"
          name="nonAdmin"
          value="false"
        />
        <label for="nonAdmin">Non admin</label>
        <span>Choisi : {{ admin }}</span>
      </div>

      <div v-if="mode == 'login' && status == 'error_login'">
        Adresse mail et/ou mot de passe invalide
      </div>
    </form>
    <button class="btn-primary">
      <span @click="signup">Je crée un compte<br /></span>
    </button>
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
    catch(err) {
      console.log("erreur erreur");
    },
  },
};
</script>
