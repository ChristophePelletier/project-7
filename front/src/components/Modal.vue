<template>
  <div class="bloc-modal" v-if="revele">
    <div class="filter" v-on:click="toggleModal">
      <div class="modal" v-on:click="toggleModal">
        <div v-on:click="toggleModal" class="btn-modal">Xxxxxxxx</div>
        <h2>Le contenu de la modale</h2>
        <input type="text" placeholder="titre" />
        <textarea
          type="textarea"
          name="content"
          placeholder=""
          cols="40"
          rows="30"
        />
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Modal",
  props: ["revele", "toggleModal"],
};
</script>

<style scoped>
.bloc-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.filter {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.modal {
  position: relative;
  background: pink;
  color: #333;
  padding: 50px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  top: 30%;
}

.btn-modal {
  position: absolute;
  top: 20px;
  right: 15px;
  color: black;
}
</style>
