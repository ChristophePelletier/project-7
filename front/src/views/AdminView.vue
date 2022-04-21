<template>
  <div>
    <h1>Liste des inscrits</h1>
    <div v-for="user in users" :key="user.userId">
      <h2>
        {{ user.id }}
        <router-link :to="'/user/' + user.userId">
          {{ user.userId }}</router-link
        >
      </h2>
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
