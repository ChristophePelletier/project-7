<template>
  <div class="article">
    <img alt="" src="../assets/icon-above-font.png" />
    <h1>Article</h1>
    <!--
    <router-link :to="{ name: 'article-create' }">
      <p>Rédiger un nouvel article</p>
    </router-link>
    -->
    <button @click="navigateTo({ name: 'article-create' })">
      Rédiger un nouvel article
    </button>

    <div v-for="article in articles" :key="article.id">
      <h2>
        {{ article.title }}
      </h2>
      <p>
        {{ article.content }}
      </p>
      <p>
        Article rédigé le :
        {{ getFormattedDate(article.createdAt) }}
      </p>
    </div>
    <button @click="poster">Poster</button>
  </div>
</template>

<script>
import articleService from "@/services/articleService";
import * as moment from "moment";
export default {
  data() {
    return {
      articles: null,
    };
  },
  async mounted() {
    this.articles = (await articleService.getAllArticles()).data;
    //console.log("data", data);
    //  console.log("this.article : ", this.articles.data);
  },
  methods: {
    getFormattedDate(date) {
      return moment(date).format("Do MMMM YYYY");
    },
    navigateTo(route) {
      this.$router.push(route);
    },
  },
};
</script>