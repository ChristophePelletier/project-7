<template>
  <div>
    <img alt="" src="../assets/icon-above-font.png" />

    <h2>
      Titre de l'article<br />
      {{ article.title }}
    </h2>
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
    <router-link :to="'/comment-create/' + article.id"
      >Lien Lien vers post comment</router-link
    >|
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
      },
    };
  },
  async created() {
    //let url = new URL(window.location.href);
    //let articleId = url.searchParams.get("articleId");
    //console.log("route", this.$route.params.articleId);
    //const apiUrlArticleId = "http://localhost:3000/api/article/" + id;
    //const articleId = url.searchParams.get("articleId");
    //console.log(await articleService.getOneArticle());
    this.article = (
      await articleService.getOneArticle(this.$route.params.id)
    ).data;
    console.log("this.article", this.article);
  },
  methods: {
    getFormattedDate(date) {
      //  console.log("3");
      return moment(date).format("Do MMMM YYYY");
    },
    catch(err) {
      console.log("erreur");
    },
  },
};
</script>