<template>
  <div>
    <modal></modal>
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
    <div>
      <img class="illustration" v-bind:src="article.image" />
    </div>
    <h3>Tous les commentaires</h3>
    <div>
      <h1>Commenter l'article</h1>
      <div>
        <input
          type="text"
          name="title"
          v-model="comment.title"
          placeholder="titre"
        />
      </div>
      <p>
        {{ comment.title }}
      </p>

      <div>
        <textarea
          type="textarea"
          name="content"
          v-model="comment.content"
          placeholder=""
          cols="40"
          rows="30"
        />
        <p>
          {{ comment.content }}
        </p>
        <p class="auteur">
          Auteur du commentaire :
          {{ $store.state.user.email }}
        </p>
        <button @click="create">Envoyer mon commentaire</button>
      </div>
    </div>
    <div v-for="comment in comments" :key="comment">
      <hr />
      <p>
        Titre<br />
        {{ comment.title }}
      </p>
      <p>
        {{ comment.content }}
      </p>
      <p>
        Auteur
        {{ comment.email }}
      </p>
      <p>
        Commentaire du :
        {{ getFormattedDate(comment.createdAt) }}
      </p>
    </div>
  </div>
</template>

<script>
import articleService from "@/services/articleService";
import commentService from "@/services/commentService";
import Modal from "../components/Modal.vue";
import * as moment from "moment";
import "moment/locale/fr";
export default {
  data() {
    return {
      article: {},
      comments: {},
      comment: {
        title: null,
        content: null,
        userId: this.$store.state.user.userId,
        email: this.$store.state.user.email,
        articleId: this.$route.params.id,
      },
    };
  },
  components: {
    modal: Modal,
  },
  async created() {
    this.article = (
      await articleService.getOneArticle(this.$route.params.id)
    ).data;
    console.log(this.article);
    const articleId = this.$route.params.id;
    //this.comments = (await commentService.getAllComments()).data;
    //console.log(this.comments);
    this.comments = (await commentService.getArticleComments(articleId)).data;
    console.log(this.comments);
  },

  methods: {
    async create() {
      await commentService.post(this.comment);
      window.location.reload();
    },
    catch(err) {
      console.log("erreur erreur");
    },
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

<style scoped>
img.illustration {
  width: 250px;
}
</style>