<template>
  <div class="home">
    <img alt="" src="../assets/icon-above-font.png" />
    <HelloWorld msg="Bienvenue sur notre réseau social" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
  },
};
</script>
