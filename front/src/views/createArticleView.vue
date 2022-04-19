<template>
  <div>
    <img alt="" src="../assets/icon-above-font.png" />

    <h1>Post Article</h1>
    <form @submit.prevent="create" enctype="multipart/form-data">
      <div>
        <input
          type="text"
          name="title"
          v-model="article.title"
          placeholder="titre"
        />
      </div>
      <div>
        <p>
          {{ article.title }}
        </p>
      </div>
      <div>
        <textarea
          type="textarea"
          name="content"
          v-model="article.content"
          placeholder=""
          cols="40"
          rows="30"
        />
      </div>

      <p>
        {{ article.content }}
      </p>
      <div>
        <label for="file" class="label">Télécharger votre image</label>
        <input type="file" ref="image" name="image" @change="selectFile" />
      </div>
    </form>
    <button @click="create">Envoyer mon article</button>
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