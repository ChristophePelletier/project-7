<template>
  <div class="article">
    <img alt="" src="../assets/icon-above-font.png" />
    <h1>Article</h1>
    <div>
      <p>{{ title }}</p>
    </div>
    <div v-for="article in articles" :key="article.title">
      <h2>
        {{ article.title }}
      </h2>
      <p>
        {{ article.author }}
      </p>
    </div>
    <button @click="poster">Poster</button>
  </div>
</template>

<script>
import signupService from "@/services/signupService";

export default {
  data() {
    return {
      articles: [
        {
          title: "Test titre article",
          author: "Test auteur",
        },
        {
          title: "Test titre article",
          author: "Test auteur",
        },
        {
          title: "Test titre article",
          author: "Test auteur",
        },
      ],
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