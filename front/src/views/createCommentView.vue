<template>
  <div>
    <img alt="" src="../assets/icon-above-font.png" />

    <h1>Post Comment</h1>
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
      />
      <p>
        {{ comment.content }}
      </p>

      <button @click="create">Envoyer mon commentaire</button>
    </div>
  </div>
</template>

<script>
import commentService from "@/services/commentService";

export default {
  data() {
    return {
      comment: {
        userId: this.$store.state.userId,
        email: this.$store.state.email,
        title: null,
        content: null,
      },
    };
  },
  methods: {
    async create() {
      await commentService.post(this.comment);
    },
    catch(err) {
      console.log("erreur erreur");
    },
  },
};
</script>