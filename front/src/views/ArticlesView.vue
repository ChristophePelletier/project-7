<template>
  <div>
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
      <button @click="navigateTo({ name: 'article-create' })">
        Rédiger un nouvel article
      </button>

      <div v-for="article in articles" :key="article.id">
        <h2>
          <router-link :to="'/article/' + article.id">
            {{ article.title }}</router-link
          >
        </h2>
        <p>
          Article rédigé le :
          {{ getFormattedDate(article.createdAt) }}
        </p>
        <p>
          {{ article.content }}
        </p>
        <p class="auteur">
          Auteur de l'article :
          {{ article.firstName }} {{ article.secondName }}
        </p>
        <p class="auteur">
          Mail de l'auteur :
          {{ article.email }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import articleService from "@/services/articleService";
import * as moment from "moment";
import "moment/locale/fr";
export default {
  data() {
    return {
      articles: null,
    };
  },
  async mounted() {
    this.articles = (await articleService.getRecentArticles()).data;
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