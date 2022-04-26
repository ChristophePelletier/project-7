<template>
  <div>
    <div v-if="$store.state.user.userId !== -1">
      <h2>{{ user.firstName }} {{ user.secondName }}</h2>
      <p>
        Compte créé le
        {{ getFormattedDate(user.createdAt) }}
      </p>
      <p>
        Mail :
        {{ user.email }}
      </p>
      <button
        v-if="$store.state.user.userId == this.$route.params.id"
        @click="deleted"
      >
        Supprimer mon compte
      </button>
    </div>
    <div v-if="$store.state.user.userId == -1">
      <p>Compte bien supprimé</p>
    </div>
  </div>
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
      localStorage.clear();
      window.location.reload();
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