<template>
  <div>
    <img alt="" src="../assets/icon-above-font.png" />

    <h1>Post Article</h1>
    <div>
      <input
        type="text"
        name="title"
        v-model="article.title"
        placeholder="titre"
      />
    </div>
    <p>
      {{ article.title }}
    </p>

    <div>
      <textarea
        type="textarea"
        name="content"
        v-model="article.content"
        placeholder=""
        cols="40"
        rows="30"
      />
      <p>
        {{ article.content }}
      </p>

      <button @click="create">Envoyer mon article</button>
    </div>
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
    };
  },
  methods: {
    async create() {
      await articleService.post(this.article);
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