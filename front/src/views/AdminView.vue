<template>
  <div>
    <!--v-if="$store.state.user.admin == true" -->
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
      <button type="button" class="alert" @click="del(user.userId)">
        Supprimer ce compte
      </button>

      <hr />
    </div>
    <div>
      <h2>Créer un nouveau compte administrateur</h2>
      <router-link to="/createAdmin" class="navbar-brand">Créer</router-link>
    </div>
  </div>
  <div>Cette page est réservée aux administrateurs</div>
  <!--v-else -->
</template>

<script>
import userService from "@/services/userService";
export default {
  data() {
    return {
      users: null,
    };
  },
  async mounted() {
    this.users = (await userService.getAllUsers()).data;
  },
  methods: {
    del(id) {
      userService.delOneUser(id);
      window.alert("suppression du compte");
      window.location.href = "/admin";
      //window.location.reload();
    },
    /*
    async del(id) {
      await userService.delOneUser(id);
      window.alert("suppression du compte");
      window.location.href = "/admin";
      //window.location.reload();
    },
    */
    catch(err) {
      console.log("erreur erreur");
    },
  },
};
</script>
