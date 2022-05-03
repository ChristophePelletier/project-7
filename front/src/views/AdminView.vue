<template>
  <div>
    <!--v-if="$store.state.user.admin == true" -->
    <h1>Administration</h1>
    <div id="admin-page">
      <div id="admin-page-1">
        <h2>Liste des inscrits</h2>
        <div v-for="user in users" :key="user.userId">
          <ul id="admin">
            <li>
              <router-link :to="'/user/' + user.userId">
                {{ user.secondName }} {{ user.firstName }}
              </router-link>
            </li>
            <li v-if="user.admin == true">Administrateur</li>
            <li>
              {{ user.email }}
            </li>
          </ul>
          <button type="button" class="alert" @click="del(user.userId)">
            <span>Supprimer ce compte</span>
          </button>

          <hr />
        </div>
      </div>
      <div id="admin-page-2">
        <h2>Créer un nouveau compte administrateur</h2>
        <button type="button" class="alert" @click="del(user.userId)">
          <router-link to="/createAdmin" class="navbar-brand"
            ><span>Créer le compte</span></router-link
          >
        </button>
      </div>
    </div>
  </div>
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
    catch(err) {
      console.log("erreur erreur");
    },
  },
};
</script>
