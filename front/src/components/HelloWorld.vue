<template>
  <div>
    <div class="hello">
      <h1>{{ msg }}</h1>
    </div>
    <h2>Les derniers articles</h2>
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
    <h2>Les derniers commentaires</h2>
  </div>
</template>
import articleService from "@/services/articleService";
import * as moment from "moment";
import "moment/locale/fr";
<script>
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
