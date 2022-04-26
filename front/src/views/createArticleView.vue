<template>
  <div>
    <h1>Rédiger un nouvel article</h1>
    <form @submit.prevent="create" enctype="multipart/form-data">
      <div>
        <input
          class="form-control w-75 p-3"
          type="text"
          name="title"
          v-model="article.title"
          placeholder="titre"
        />
      </div>
      <div>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="5"
          type="textarea"
          name="content"
          v-model="article.content"
          placeholder="mon article"
        />
      </div>
      <div>
        <p>
          <label for="file" class="label">Télécharger votre image</label>
        </p>
        <input
          class="btn btn-primary"
          type="file"
          ref="image"
          name="image"
          @change="selectFile"
        />
      </div>
    </form>
    <button type="button" class="btn btn-primary" @click="create">
      Envoyer mon article
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