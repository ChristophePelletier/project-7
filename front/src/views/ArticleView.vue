<template>
  <div>
    <img alt="" src="../assets/icon-above-font.png" />

    <h2>
      Titre de l'article<br />
      {{ article.title }}
    </h2>
    <input type="text" name="id" v-model="article.id" placeholder="titre" />
    <p>
      Auteur de l'article<br />
      {{ article.author }}
    </p>
    <p>
      Contenu de l'article :<br />
      {{ article.content }}
    </p>
    <p>
      Article rédigé le :
      {{ getFormattedDate(article.createdAt) }}
    </p>

    <router-link :to="'/comment-create/'" @click="persist"
      >Envoyer un commentaire</router-link
    >
  </div>
</template>

<script>
import articleService from "@/services/articleService";
import * as moment from "moment";

export default {
  data() {
    return {
      article: {},
      comment: {
        userId: this.$store.state.userId,
        email: this.$store.state.email,
        id: this.$route.params.id,
      },
    };
  },
  async created() {
    this.article = (
      await articleService.getOneArticle(this.$route.params.id)
    ).data;
  },
  methods: {
    getFormattedDate(date) {
      return moment(date).format("Do MMMM YYYY");
    },
    persist() {
      console.log("id article :", this.$route.params.id);
      const idToSave = this.$route.params.id;
      console.log("idToSave", idToSave);
      //console.log("this.article", this.article);
      //console.log("this.article.id", this.article.id);
      //console.log("id", id);
      localStorage.setItem("idToSave", idToSave);
      //iii = this.article.id;
      //console.log(iii);
      //localStorage.setItem("id", this.article.id);
      //localStorage.articleId = this.article.id;
    },
    catch(err) {
      console.log("erreur");
    },
  },
};
</script>