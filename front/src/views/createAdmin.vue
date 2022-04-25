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
        <label for="admininstration">Admin</label>
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
    <h1>Liste des inscrits</h1>
    <div v-for="user in users" :key="user.userId">
      <ul>
        <li>
          <router-link :to="'/user/' + user.userId">
            {{ user.firstName }} {{ user.secondName }}</router-link
          >
        </li>
        <li>
          {{ user.id }}
          <router-link :to="'/user/' + user.userId"
            >Id : {{ user.userId }}</router-link
          >
        </li>
        <li>
          {{ user.email }}
        </li>
      </ul>
      <button @click="del(user.userId)">Supprimer ce compte</button>
      <p>
        {{ idToDelete }}
      </p>
      <hr />
    </div>
  </div>
</template>

<script>
import userService from "@/services/signupService";
export default {
  data() {
    return {
      users: null,
      email: "",
      password: "",
      secondName: "",
      firstName: "",
      admin: "",
    };
  },
  async mounted() {
    this.users = (await userService.getAllUsers()).data;
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
    async del(id) {
      await userService.delOneUser(id);
      window.location.reload();
    },
    catch(err) {
      console.log("erreur erreur");
    },
  },
};
</script>
