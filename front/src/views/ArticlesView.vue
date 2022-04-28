<template>
  <div>
    <button v-if="$store.state.user.userId == -1" class="article">
      <router-link to="/login">
        <span>S'inscrire pour consulter le site</span>
      </router-link>
    </button>
    <div v-if="$store.state.user.userId !== -1" class="article">
      <h1>Les derniers articles</h1>
      <!--
    <router-link :to="{ name: 'article-create' }">
      <p>Rédiger un nouvel article</p>
    </router-link>
    -->

      <div class="news" v-for="article in articles" :key="article.id">
        <article class="principal">
          <h2>
            <router-link :to="'/article/' + article.id">
              {{ article.title }}</router-link
            >
          </h2>

          <p class="auteur">
            <router-link :to="'/user/' + article.userId">
              <span class="coldInfo">par :</span>
              {{ article.firstName }} {{ article.secondName }} <br /><span
                class="coldInfo"
              >
                {{ article.email }}</span
              ></router-link
            >
          </p>
          <img class="illustration" v-bind:src="article.image" />
          <p class="date">
            Article rédigé le :
            {{ getFormattedDate(article.createdAt) }}
          </p>

          <p v-snip:js="1" id="chapo" class="article--content">
            {{ article.content }}
          </p>
        </article>
        <article class="comment">
          <p v-if="article.comments[0]">
            Le dernier commentaire<br />
            {{ article.comments[0].title }}
            <br />
            {{ article.comments[0].content }}
            <br />rédigé par {{ article.comments[0].firstName }}
            {{ article.comments[0].secondName }}
          </p>
        </article>
      </div>
      <button
        type="button"
        class="btn btn-primary"
        @click="navigateTo({ name: 'article-create' })"
      >
        <span>Rédiger un nouvel article</span>
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
  created() {},
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
  max-width: 200px;
  max-height: 150px;
}
</style>