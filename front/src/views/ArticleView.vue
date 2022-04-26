<template>
  <article>
    <div>
      <img alt="" src="../assets/icon-above-font.png" />
      <h2>
        {{ article.title }}
      </h2>
      <p>
        articlé rédigé par<br />
        {{ article.firstName }} {{ article.secondName }}
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
      <div>
        <button
          type="button"
          class="btn btn-warning"
          @click="deleteOneArticle(article.id)"
        >
          Supprimer cet article
        </button>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-primary"
          @click="showForm = !showForm"
        >
          Commenter l'article
        </button>
        <div v-show="showForm">
          <div>
            <input
              class="form-control"
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
              class="form-control"
              type="textarea"
              name="content"
              v-model="comment.content"
              placeholder="mon commentaire"
              cols="10"
              rows="10"
            />
          </div>
          <div>
            <p>
              {{ comment.content }}
            </p>
            <p class="auteur">
              Auteur du commentaire :
              {{ $store.state.user.firstName }}
              {{ $store.state.user.secondName }}
            </p>
            <button type="button" class="btn btn-primary" @click="create">
              Envoyer mon commentaire
            </button>
          </div>
        </div>
      </div>
      <h3>Tous les commentaires</h3>
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
          par {{ comment.firstName }}
          {{ comment.email }}
        </p>
        <p>
          Commentaire du :
          {{ getFormattedDate(comment.createdAt) }}
        </p>
        <button
          type="button"
          class="btn btn-warning"
          @click="deleteOneComment(comment.id)"
        >
          Supprimer ce commentaire
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import articleService from "@/services/articleService";
import commentService from "@/services/commentService";
import * as moment from "moment";
import "moment/locale/fr";
export default {
  data() {
    return {
      showForm: false,
      article: {},
      comments: {},
      comment: {
        title: null,
        content: null,
        userId: this.$store.state.user.userId,
        firstName: this.$store.state.user.firstName,
        secondName: this.$store.state.user.secondName,
        email: this.$store.state.user.email,
        articleId: this.$route.params.id,
      },
    };
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
    create() {
      commentService.post(this.comment);
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
    async deleteOneArticle(id) {
      await articleService.deleteOneArticle(id);
      window.location.reload();
    },
    async deleteOneComment(id) {
      await commentService.deleteOneComment(id);
      window.location.reload();
    },
    catch(err) {
      console.log("erreur erreur");
    },
  },
  catch(err) {
    console.log("erreur");
  },
};
</script>

<style scoped>
img.illustration {
  width: 250px;
}
</style>