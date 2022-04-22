<template>
  <div>
    <h2>
      Utilisateur
      {{ user.email }}
    </h2>
    <p>
      Compte créé le
      {{ getFormattedDate(user.createdAt) }}
    </p>
  </div>
  <button @click="delete">Supprimer le compte</button>
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