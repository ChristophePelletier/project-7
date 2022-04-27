<template>
  <div>
    <img alt="" src="../assets/icon-above-font.png" />
    <div v-if="$store.state.user.userId == -1" class="article">
      <p>S'inscrire pour consulter les articles</p>
    </div>
    <div v-if="$store.state.user.userId !== -1" class="article">
      <h1>Les derniers articles</h1>
      <!--
    <router-link :to="{ name: 'article-create' }">
      <p>Rédiger un nouvel article</p>
    </router-link>
    -->

      <div v-for="article in articles" :key="article.id">
        <h2>
          <router-link :to="'/article/' + article.id">
            {{ article.title }}</router-link
          >
        </h2>
        <img class="illustration" v-bind:src="article.image" />
        <p>
          Article rédigé le :
          {{ getFormattedDate(article.createdAt) }}
        </p>
        <p>
          {{ article.content }}
        </p>
        <p class="auteur">
          <router-link :to="'/user/' + article.userId">
            Auteur de l'article :
            {{ article.firstName }} {{ article.secondName }}</router-link
          >
        </p>
        <p class="auteur">
          Mail de l'auteur :
          {{ article.email }}
        </p>
        <p v-if="article.comments[0]">
          Le dernier commentaire<br />
          {{ article.comments[0].title }}
          <br />
          {{ article.comments[0].content }}
          <br />rédigé par {{ article.comments[0].firstName }}
          {{ article.comments[0].secondName }}
        </p>
      </div>
      <button
        type="button"
        class="btn btn-primary"
        @click="navigateTo({ name: 'article-create' })"
      >
        Rédiger un nouvel article
      </button>
    </div>
  </div>
</template>

<script>
import articleService from "@/services/articleService";
//import commentService from "@/services/commentService";
import * as moment from "moment";
import "moment/locale/fr";
export default {
  data() {
    return {
      articles: null,
      comments: {},
    };
  },
  async mounted() {
    //this.articles = (await articleService.getRecentArticles()).data;
    this.articles = (await articleService.getArticlesWithComments()).data;
    console.log("this.articles", this.articles);
    /*
    this.comments = (
      await commentService.getOneComment(article.articleId)
    ).data;
    */
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

<style scoped>
img.illustration {
  width: 250px;
}
</style>