<template>
  <!--https://www.youtube.com/watch?v=GXe_JpBQLTQ-->
  <form enctype="multipart/form-data">
    <div>
      <label for="file" class="label">Télécharger votre image</label>
      <input type="file" ref="file" @change="selectFile" />
    </div>
  </form>
  <hr />
</template>

<script>
export default {
  name: "simpleUpload",
  data() {
    return {
      file: "",
    };
  },
  methods: {
    selectFile() {
      this.file = this.$refs.file.files[0];
    },
  },
};
</script>
