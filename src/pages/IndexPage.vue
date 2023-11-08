<template>
  <br />
  <uploadFile />
</template>

<script>
import uploadFile from "app/src/components/uploadFile.vue";

export default {
  name: "App",
  components: {
    uploadFile,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
