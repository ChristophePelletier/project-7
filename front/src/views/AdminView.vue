<template>
  <div>
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
};
</script>
