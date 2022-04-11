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

*/
import articleService from "@/services/articleService";
import * as moment from "moment";

export default {
  data() {
    //  console.log("1");
    return {
      article: null,
    };
  },
  async created() {
    //console.log("2");
    //let url = new URL(window.location.href);
    //let articleId = url.searchParams.get("articleId");
    //console.log("route", this.$route.params.articleId);
    //const apiUrlArticleId = "http://localhost:3000/api/article/" + id;
    //const articleId = url.searchParams.get("articleId");
    //console.log(await articleService.getOneArticle());
    this.article = (
      await articleService.getOneArticle(this.$route.params.articleId)
    ).data;
    //console.log("this.art...", this.article);
  },
  methods: {
    getFormattedDate(date) {
      //  console.log("3");
      return moment(date).format("Do MMMM YYYY");
    },
  },
};
</script>