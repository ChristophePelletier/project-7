<template>
  <footer>
    <div class="foot">
      <router-link to="/about" class="nav-link active"
        ><p>2022 - Groupomania</p></router-link
      >
    </div>
  </footer>
</template>


<script>
export default {
  name: "Foot",
};
</script>

<style>
.foot {
  border-top: 1px dotted #fd2d01;
  border-bottom: 1px dotted #fd2d01;
  padding: 15px 0 35px 0;
  margin-top: 2.5em;
  width: 100%;
  height: 50px;
}
.foot p {
  font-size: 16px;
  padding: 0;
  margin: 0;
  color: darkslategrey;
}
</style>