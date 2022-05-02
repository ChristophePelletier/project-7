<template>
  <footer>
    <div>
      <router-link to="/about" class="nav-link active">
        <!--  :class="{ vide: enteredFirstName }"-->
        <p>2022 -- Groupomania</p>
      </router-link>
    </div>
  </footer>
</template>


<script>
export default {
  name: "Foot",
};
</script>

<style scoped>
p {
  font-size: 16px;
  color: darkslategrey;
}
</style>