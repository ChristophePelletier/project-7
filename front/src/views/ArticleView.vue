<template>
  <div class="article">
    <img alt="" src="../assets/icon-above-font.png" />
    <h1>Article</h1>
    <div>
      <input type="text" name="title" v-model="title" placeholder="title" />
      <p>{{ title }}</p>
    </div>
    <button @click="poster">Poster</button>
  </div>
</template>

<script>
import signupService from "@/services/signupService";

export default {
  data() {
    return {
      title: "",
    };
  },
  methods: {
    async post() {
      try {
        const response = await signupService.poster({
          title: this.title,
        });
        console.log(response.data);
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>