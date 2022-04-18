<template>
  <div>
    <img alt="" src="../assets/icon-above-font.png" />

    <h1>Post Article</h1>
    <form enctype="multipart/form-data">
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
      <div>
        <button @click="onUpload">
          <input type="file" @change="onFileChanged" />
        </button>
      </div>
      <p>
        {{ article.content }}
      </p>
    </form>
    <button @click="create">Envoyer mon article</button>
  </div>
</template>

<script>
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
      image: null,
    };
  },
  methods: {
    onFileChanged(event) {
      this.file = event.target.files[0];
      image = this.file;
    },
    async create() {
      await articleService.post(this.article, image);
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