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
                  Article rédigé le :
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
                <img
                  v-if="article.image"
                  class="illustration"
                  v-bind:src="article.image"
                />
              </div>
              <div>
                <p class="article-content">
                  {{ article.content }}
                </p>
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
          <p>
            Titre<br />
            {{ comment.title }}
          </p>
          <p class="article-content">
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
            v-if="$store.state.user.admin == true"
            type="button"
            class="btn btn-warning"
            @click="deleteOneComment(comment.id)"
          >
            Supprimer ce commentaire
          </button>
        </article>
      </div>
      <!--FIN DES COMMENTAIRES -->
    </div>
    <!--CONTAINEUR 2 -->
    <!--FORMS -->
    <div>
      <div>
        <div>
          <button type="button" @click="showForm = !showForm">
            <span> Commenter l'article</span>
          </button>
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
          type="button"
          class="alert"
          @click="deleteOneArticle(article.id)"
        >
          <span> Supprimer cet article</span>
        </button>
        <p>
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
  max-width: 200px;
}
</style>