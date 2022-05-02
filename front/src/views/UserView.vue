<template>
  <div id="user-template">
    <!--
    <div v-if="accountDeleted == true">
      <p>teeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee</p>
    </div>
    -->
    <div v-if="$store.state.user.userId == this.$route.params.id">
      <p id="my-account">Mon compte</p>
    </div>
    <div v-if="$store.state.user.userId !== -1">
      <h1>{{ user.firstName }} {{ user.secondName }}</h1>

      <p>
        Membre depuis le
        {{ getFormattedDate(user.createdAt) }}
      </p>
      <p>
        Mail :
        {{ user.email }}
      </p>

      <button
        v-if="$store.state.user.userId == this.$route.params.id"
        type="button"
        class="alert"
        @click="deleted"
      >
        <span>Supprimer mon compte</span>
      </button>
    </div>
    <div v-if="$store.state.user.userId == -1">
      <p>Compte bien supprimé</p>
    </div>
    <h2 v-if="$store.state.user.userId == this.$route.params.id">
      Mes dernières contributions
    </h2>
    <h2 v-else>Les dernières contributions</h2>

    <div id="contributions">
      <!--articles
    -->
      <div id="user-articles">
        <h3>Articles</h3>
        <div class="user-article" v-for="article in articles" :key="article.id">
          <p v-if="!user.article[0]">test</p>
          <h2>
            <router-link :to="'/article/' + article.id">
              {{ article.title }}</router-link
            >
          </h2>
          <p class="coldInfo">
            Article rédigé le :
            {{ getFormattedDate(article.createdAt) }}
          </p>
          <p class="article-content">
            {{ article.content }}
          </p>
          <p v-if="$store.state.user.userId !== article.userId" class="auteur">
            Auteur de l'article :
            {{ article.firstName }} {{ article.secondName }}
          </p>
          <p v-if="$store.state.user.userId !== article.userId" class="auteur">
            Mail de l'auteur :
            {{ article.email }}
          </p>
        </div>
      </div>

      <!--articles
    -->
      <div id="user-comments">
        <h3>Commentaires</h3>

        <div class="user-comment" v-for="comment in comments" :key="comment">
          <h2>{{ comment.title }}</h2>
          <p>Sur l'article {{ comment.articles.title }}</p>
          <p class="article-content">
            {{ comment.content }}
          </p>
          <p>
            <router-link :to="'/article/' + comment.articleId"
              >Lire l'article
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import userService from "@/services/userService";
import articleService from "@/services/articleService";
import commentService from "@/services/commentService";
import * as moment from "moment";
import "moment/locale/fr";
import AboutView from "./AboutView.vue";
export default {
  components: { AboutView },
  data() {
    return {
      user: {},
      articles: {},
      comments: {},
      accountDeleted: false,
    };
  },
  async created() {
    try {
      this.user = (await userService.getOneUser(this.$route.params.id)).data;
      console.log("$route.params", this.$route.params);
      console.log("this.userId", this.user.userId);
    } catch (err) {
      console.log("erreur", err);
    }
    if (this.user == null) {
      this.accountDeleted = true;
      window.alert("ce contributeur ne dispose plus d'un compte actif");
      window.location.href = "/";
    }
  },
  async mounted() {
    try {
      this.articles = (
        await articleService.getuserRecentArticles(this.$route.params.id)
      ).data;
      this.comments = (
        await commentService.getuserRecentCommentsWithArticles(
          this.$route.params.id
        )
      ).data;
    } catch (err) {
      console.log("erreur", err);
    }
    /*
    this.comments = (
      await commentService.getuserRecentComments(this.$route.params.id)
    ).data;
    */
  },
  methods: {
    async deleted() {
      try {
        userService.deleteOneUser(this.$route.params.id);
        localStorage.clear();
        window.alert("Suppression de votre compte en cours");
        window.location.href = "/";
      } catch (err) {
        console.log("erreur erreur");
      }
    },
    getFormattedDate(date) {
      return moment(date).format("Do MMMM YYYY");
    },
    deletedAccount: function () {
      if (!this.user.userId) {
        return true;
      } else {
        return false;
      }
    },
  },
  /*
  created: {
    beforeMount: function () {
      console.log("testtestest");
      if (window.location.href.indexOf("user") > -1) {
        window.alert("The web page contains the string 'user'");
      }
    },
  },
*/
};
</script>

<style>
#user {
  color: red;
}
</style>