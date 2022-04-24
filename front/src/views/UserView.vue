<template>
  <div>
    <h2>{{ user.firstName }} {{ user.secondName }}</h2>
    <p>
      Compte créé le
      {{ getFormattedDate(user.createdAt) }}
    </p>
    <p>
      Mail :
      {{ user.email }}
    </p>
  </div>

  <button @click="deleted">Supprimer le compte de {{ user.firstName }}</button>
  <div v-html="confirmation" />
</template>

<script>
import userService from "@/services/userService";
import * as moment from "moment";
import "moment/locale/fr";
export default {
  data() {
    return {
      user: {},
      confirmation: null,
    };
  },
  async created() {
    this.user = (await userService.getOneUser(this.$route.params.id)).data;
    console.log(this.user);
  },
  methods: {
    async deleted() {
      await userService.deleteOneUser(this.$route.params.id);
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