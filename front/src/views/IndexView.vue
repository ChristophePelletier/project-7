<template>
  <div>
    <button v-if="$store.state.user.userId == -1" class="article">
      <router-link to="/login">
        <span>S'inscrire / se connecter</span>
      </router-link>
    </button>
    <div v-if="$store.state.user.userId !== -1" class="article">
      <h1>Accueil : les derniers posts</h1>
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

          <!--
    https://vuejsexamples.com/truncating-multiple-lines-text-element-with-vuejs/
    -->
          <div class="article-container">
            <div>
              <p v-snip="{ lines: 7 }" class="article-content">
                {{ article.content }}
              </p>
              <p class="coldInfo">
                <router-link :to="'/article/' + article.id">
                  Lire la suite</router-link
                >
              </p>
            </div>

            <div class="img-placement">
              <img
                v-if="article.image"
                class="illustration"
                v-bind:src="article.image"
                alt=""
              />
            </div>
          </div>
          <div class="meta">
            <p class="date">
              Post rédigé le :<br />
              {{ getFormattedDate(article.createdAt) }}
            </p>
            <p class="auteur">
              <router-link :to="'/user/' + article.userId">
                <span class="coldInfo">par</span>
                {{ article.firstName }} {{ article.secondName }} <br /><span
                  class="coldInfo"
                >
                  {{ article.email }}</span
                ></router-link
              >
            </p>
          </div>
        </article>
        <article class="comment">
          <h3 v-if="article.comments[0] && !article.comments[1]">
            Commentaire
          </h3>
          <h3 v-if="article.comments[0] && article.comments[1]">
            Derniers commentaires
          </h3>
          <h3 v-if="!article.comments[0]" class="attente-comment">
            Personne n'a encore réagi à ce poste ;<br />
            <router-link :to="'/article/' + article.id">
              lire la suite ou commenter...</router-link
            >
          </h3>
          <p v-if="!article.comments[0]">
            <router-link :to="'/article/' + article.id">
              <img class="brand" alt="" src="../../public/images/chat-2.png" />
            </router-link>
          </p>

          <div v-if="article.comments[0]">
            <h4 class="comment-title">
              {{ article.comments[0].title }}
            </h4>
            <p class="auteur">
              <span class="coldInfo">par </span>
              <router-link :to="'/user/' + article.comments[0].userId">
                {{ article.comments[0].firstName }}
                {{ article.comments[0].secondName }}
              </router-link>
              <br />
              ({{ getFormattedDate(article.comments[0].createdAt) }})
            </p>

            <p class="comment-content" v-snip="5">
              {{ article.comments[0].content }}
            </p>
            <p class="coldInfo">
              <router-link :to="'/article/' + article.id">
                Lire la suite | commenter</router-link
              >
            </p>
          </div>
          <div v-if="article.comments[1]">
            <h4 class="comment-title">
              {{ article.comments[1].title }}
            </h4>
            <p class="auteur">
              <span class="coldInfo">par </span>
              <router-link :to="'/user/' + article.comments[1].userId">
                {{ article.comments[1].firstName }}
                {{ article.comments[1].secondName }}
              </router-link>
            </p>
            <p class="comment-content" v-snip="5">
              {{ article.comments[1].content }}
            </p>
            <p class="coldInfo">
              <router-link :to="'/article/' + article.id">
                Lire la suite | commenter</router-link
              >
            </p>
          </div>
        </article>
      </div>
      <button type="button" @click="navigateTo({ name: 'article-create' })">
        <span>Rédiger un nouveau post</span>
      </button>

      <button type="button" @click="navigateTo({ name: 'articles' })">
        <span>Consulter tous les posts</span>
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
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  box-shadow: 10px 5px 5px lightgray;
}

@media screen and (max-width: 768px) {
  img.illustration {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 10px 5px 5px lightgray;
  }
}
img.brand {
  width: 83px;
  opacity: 0.2;
  transition: all 1s;
}
img.brand:hover {
  width: 83px;
  opacity: 1;
}
</style>