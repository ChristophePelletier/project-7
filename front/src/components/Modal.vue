<template>
  <div class="bloc-modal">
    <div class="filter">
      <div class="modal">
        <div class="btn-modal">XXXX</div>
        <h2>Le contenu de la modale</h2>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: "Modal",
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
  background: #f1f1f1;
  color: #333;
  padding: 50px;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
  top: 30%;
}

.btn-modal {
  position: relative;
  top: 10px;
  right: 10px;
}
</style>
