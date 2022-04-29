<template>
  <div>
    <h1>Rédiger un article</h1>
    <form @submit.prevent="create" enctype="multipart/form-data">
      <div>
        <input
          id="titleArticle"
          type="text"
          name="title"
          v-model="article.title"
          placeholder="titre"
        />
      </div>
      <div>
        <textarea
          class="form-control"
          id="completeArticle"
          rows="55"
          type="textarea"
          name="content"
          v-model="article.content"
          placeholder="mon article"
          maxlength="8000"
        />
      </div>
      <div>
        <p class="lien">
          <label for="file">Télécharger votre image</label>
        </p>
        <p v-if="this.file !== ''">Fichier bien ajouté</p>
        <p>{{ this.file.name }}</p>
        <!--https://tympanus.net/codrops/2015/09/15/styling-customizing-file-inputs-smart-way/-->
        <input
          class="btn inputfile"
          type="file"
          ref="image"
          name="image"
          id="file"
          @change="selectFile"
        />
      </div>
    </form>
    <button type="button" class="btn" @click="create">
      <span>Envoyer mon article</span>
    </button>
  </div>
</template>

<script>
// Take special note of the enctype="multipart/form-data"
// and name="" fields
import articleService from "@/services/articleService";

export default {
  data() {
    return {
      article: {
        userId: this.$store.state.user.userId,
        email: this.$store.state.user.email,
        firstName: this.$store.state.user.firstName,
        secondName: this.$store.state.user.secondName,
        title: null,
        content: null,
      },
      file: "",
    };
  },
  methods: {
    selectFile() {
      const file = this.$refs.image.files[0];
      this.file = file;
    },
    async create() {
      const formData = new FormData();
      //formData.append("art", this.article);
      let testArt = JSON.stringify(this.article);
      console.log("testArt", testArt);
      formData.append("article", testArt);
      formData.append("image", this.file);
      //console.log("this.article :", this.article);
      await articleService.post(formData);
      //console.log("this.file :", this.file);
      //console.log("formaData :", formData);
      this.$router.push({
        name: "articles",
      });
    },
    catch(err) {
      console.log("erreur erreur");
    },
  },
};
</script>