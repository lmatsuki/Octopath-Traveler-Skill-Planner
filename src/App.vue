<template>
  <div id="app">
    <navbar />
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "app",
  components: {
    Navbar
  }
};
</script>

<style>
@import "https://use.fontawesome.com/releases/v5.2.0/css/all.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  margin-top: 30px;
}
</style>
