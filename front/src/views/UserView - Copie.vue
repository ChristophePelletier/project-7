<template>
  <h1>Création admin</h1>
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

  <button @click="deleted">Supprimer le compte de {{ user.firstName }}</button>
</template>

<script>
import userService from "@/services/userService";
import * as moment from "moment";
import "moment/locale/fr";
export default {
  data() {
    return {
      user: {},
    };
  },
  async created() {
    this.user = (await userService.getOneUser(this.$route.params.id)).data;
    console.log(this.user);
  },
  methods: {
    async deleted() {
      await userService.deleteOneUser(this.$route.params.id);
      this.$router.push("/admin");
    },
    catch(err) {
      console.log("erreur erreur");
    },
    getFormattedDate(date) {
      return moment(date).format("Do MMMM YYYY");
    },
    catch(err) {
      console.log("erreur");
    },
  },
};

/*

async print() {
    this.user = (await userService.deleteOneUser(this.$route.params.id)).data;
    console.log(this.user);
  },
*/
</script>