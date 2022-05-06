
<template>
  <div id="one-user">
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
        class="alert user"
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
      <div id="user-articles">
        <h3>Articles</h3>
        <div id="user-articles-byone">
          <div
            class="user-article"
            v-for="article in articles"
            :key="article.id"
          >
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
          </div>
        </div>
      </div>
      <!--articles
    -->
      <div id="user-articles">
        <h3>Commentaires</h3>
        <!--<h3 v-if="comments != null">Commentaires</h3>-->
        <div id="user-comments-byone">
          <div class="user-comment" v-for="comment in comments" :key="comment">
            <h2>{{ comment.title }}</h2>
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
  </div>
</template>

<script>
import userService from "@/services/userService";
import articleService from "@/services/articleService";
import commentService from "@/services/commentService";
import * as moment from "moment";
import "moment/locale/fr";
export default {
  data() {
    return {
      user: {},
      articles: {},
      comments: {},
    };
  },
  async created() {
    try {
      this.user = (await userService.getOneUser(this.$route.params.id)).data;
      console.log("this.user", this.user);
      console.log("this.userId", this.user.userId);
    } catch (err) {
      console.log("erreur", err);
    }
    if (this.user == null) {
      window.alert("ce compte n'est plus actif");
      window.location.href = "/";
    }
  },
  async mounted() {
    this.articles = (
      await articleService.getuserRecentArticles(this.$route.params.id)
    ).data;
    this.comments = (
      await commentService.getuserRecentComments(this.$route.params.id)
    ).data;
  },

  methods: {
    async deleted() {
      await userService.deleteOneUser(this.$route.params.id);
      localStorage.clear();
      window.alert("Suppression de votre compte en cours");
      window.location.href = "/";
    },
    catch(err) {
      console.log("erreur erreur");
    },
    getFormattedDate(date) {
      return moment(date).format("Do MMMM YYYY");
    },
    catch(err) {
      console.log("erreur");
    },
  },
};
</script>