<template>
  <div class="home">    
    <section class="hero is-medium is-dark is-fullheight">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Tools
          </h1>
          <h2 class="subtitle">
            <router-link to="/octopathskillcalc/therion">Octopath Traveler Skill Calculator</router-link>
          </h2>
        </div>
      </div>
    </section>  
  </div>
</template>

<script>
export default {
  name: "Home",
  props: {
    msg: String
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.home {
  margin-top: 60px;
  text-align: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.hero-body .subtitle:hover {
  opacity: 0.7;
}
</style>
