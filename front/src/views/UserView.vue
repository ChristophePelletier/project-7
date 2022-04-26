<template>
  <div>
    <div v-if="$store.state.user.userId !== -1">
      <h2>{{ user.firstName }} {{ user.secondName }}</h2>
      <p>
        Compte créé le
        {{ getFormattedDate(user.createdAt) }}
      </p>
      <p>
        Mail :
        {{ user.email }}
      </p>
      <button
        v-if="$store.state.user.userId == this.$route.params.id"
        @click="deleted"
      >
        Supprimer mon compte
      </button>
    </div>
    <div v-if="$store.state.user.userId == -1">
      <p>Compte bien supprimé</p>
    </div>
    <h2>Dernières contributions</h2>
    <h3>Articles</h3>
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
    <h3>Commentaires</h3>
  </div>
</template>

<script>
import userService from "@/services/userService";
import articleService from "@/services/articleService";
import * as moment from "moment";
import "moment/locale/fr";
export default {
  data() {
    return {
      user: {},
      articles: {},
    };
  },
  async created() {
    this.user = (await userService.getOneUser(this.$route.params.id)).data;
    console.log(this.user);
  },
  async mounted() {
    this.articles = (
      await articleService.getuserRecentArticles(this.$route.params.id)
    ).data;
  },
  methods: {
    async deleted() {
      await userService.deleteOneUser(this.$route.params.id);
      localStorage.clear();
      window.location.reload();
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

/*

async print() {
    this.user = (await userService.deleteOneUser(this.$route.params.id)).data;
    console.log(this.user);
  },
*/
</script>