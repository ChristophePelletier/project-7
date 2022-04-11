<template>
  <div class="article">
    <img alt="" src="../assets/icon-above-font.png" />
    <h1>Article</h1>
    <!--
    <router-link :to="{ name: 'article-create' }">
      <p>Rédiger un nouvel article</p>
    </router-link>
    -->

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

    <button @click="poster">Poster</button>
  </div>
</template>

<script>
/*
let url = new URL(window.location.href);
let id = url.searchParams.get("articleId");
const apiUrlArticleId = "http://localhost:3000/api/article/" + id;
*/
import articleService from "@/services/articleService";
import * as moment from "moment";
export default {
  data() {
    return {
      article: null,
    };
  },
  async mounted() {
    this.article = (await articleService.getOneArticle()).data;
    console.log("data", data);
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