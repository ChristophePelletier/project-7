<template>
  <div class="article">
    <img alt="" src="../assets/icon-above-font.png" />
    <h1>Article</h1>

    <div v-for="article in articles" :key="article.id">
      <h2>
        {{ article.title }}
      </h2>
      <p>
        {{ article.content }}
      </p>
      <p>
        {{ article.createdAt }}
      </p>
    </div>
    <button @click="poster">Poster</button>
  </div>
</template>

<script>
import articleService from "@/services/articleService";

export default {
  data() {
    return {
      articles: null,
      /*
      articles: [
        {
          title: "Test titre article 1",
          author: "Test auteur 1",
        },
        {
          title: "Test titre article 2",
          author: "Test auteur",
        },
        {
          title: "Test titre article 3",
          author: "Test auteur",
        },
      ],
      */
    };
  },
  async mounted() {
    this.articles = (await articleService.getAllArticles()).data;
    console.log("data", data);
    console.log("this.article : ", this.articles.data);
  },
};
</script>