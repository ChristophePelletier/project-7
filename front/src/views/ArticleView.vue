<template>
  <!--article -->
  <div id="containeur">
    <!--CONTAINEUR 1 -->
    <div id="containeur-1">
      <div id="containeur-1-1">
        <article>
          <!--CONTAINEUR 1-1 -->
          <div id="containeur-1-1-1">
            <div>
              <h1>
                {{ article.title }}
              </h1>
              <!--ARTICLE -->
            </div>

            <div id="containeur-1-1-1-1">
              <div>
                <p>
                  Post du<br />
                  {{ getFormattedDate(article.createdAt) }}
                </p>
                <p class="auteur">
                  par<br />
                  <router-link :to="'/user/' + article.userId">
                    <span class="coldInfo"></span>
                    {{ article.firstName }} {{ article.secondName }} <br /><span
                      class="coldInfo"
                    >
                      {{ article.email }}</span
                    ></router-link
                  >
                </p>
              </div>
              <div>
                <p class="article-content">
                  {{ article.content }}
                </p>
                <div @click="scrollToBottom">
                  <button
                    class="show-comment"
                    type="button"
                    @click="showForm = !showForm"
                  >
                    <span> Commenter</span>
                  </button>
                </div>
                <img
                  v-if="article.image"
                  class="illustration"
                  v-bind:src="article.image"
                />
              </div>
            </div>
          </div>
        </article>
      </div>
      <!--FIN ARTICLE -->
      <!--COMMENTAIRES -->
      <div id="containeur-1-2">
        <h2>Commentaires</h2>
        <article class="comment-one" v-for="comment in comments" :key="comment">
          <h3>
            {{ comment.title }}
          </h3>
          <p>
            <router-link :to="'/user/' + comment.userId">
              {{ comment.firstName }} {{ comment.secondName }}</router-link
            ><br />Commentaire du :
            {{ getFormattedDate(comment.createdAt) }}
          </p>
          <p class="article-content">
            {{ comment.content }}
          </p>

          <button
            v-if="$store.state.user.admin == true"
            type="button"
            class="btn alert"
            @click="deleteOneComment(comment.id)"
          >
            <span> Supprimer ce commentaire</span>
          </button>
        </article>
      </div>
      <!--FIN DES COMMENTAIRES -->
    </div>
    <!--CONTAINEUR 2 -->
    <!--FORMS -->
    <div>
      <div>
        <div id="form-comment">
          <form class="commentaire" v-show="showForm">
            <div>
              <input
                class="form-control"
                id="titleComment"
                type="text"
                name="title"
                v-model="comment.title"
                placeholder="titre"
              />
            </div>

            <div>
              <textarea
                class="form-control"
                type="textarea"
                name="content"
                v-model="comment.content"
                placeholder="mon commentaire"
                rows="155"
                maxlength="8000"
              />
            </div>
            <div>
              <button type="button" class="btn btn-primary" @click="create">
                <span>Envoyer mon commentaire</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <div>
        <!--v-if="$store.state.user.admin == true" -->
        <button
          v-if="$store.state.user.admin == true"
          type="button"
          class="alert"
          @click="deleteOneArticle(article.id)"
        >
          <span> Supprimer ce post</span>
        </button>
        <p v-if="$store.state.user.admin == true">
          Attention, la suppression de l'article entraînera également la
          suppression de l'ensemble des commentaires associés.
        </p>
      </div>
    </div>
    <!--FIN DES FORMS -->
  </div>
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
    scrollToBottom() {
      let element = document.getElementById("form-comment");
      element.scrollIntoView({ behavior: "smooth", block: "end" });
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
      window.alert("suppresssion de l'article et de ses commentaires en cours");
      window.location.href = "/";
    },
    async deleteOneComment(id) {
      await commentService.deleteOneComment(id);
      window.alert("suppresssion du commentaire en cours");
      //window.location.reload();
      window.location.href = "/";
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
  width: 90%;
  height: 600px;
  object-fit: cover;
  border-radius: 15px;
}
@media screen and (max-width: 768px) {
  img.illustration {
    width: 90%;
    height: 350px;
    object-fit: cover;
    object-position: 50% top;
    border-radius: 15px;
  }
}
</style>