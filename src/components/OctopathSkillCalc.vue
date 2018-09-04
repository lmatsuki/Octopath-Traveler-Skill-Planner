<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <div class="title-container">
          <h2 class="title">Octopath Traveler Skill Calculator</h2>
          <p class="subtitle">Plan your character jobs and skills!</p>
        </div>        
        <div class="tile is-ancestor">
          <div class="tile is-parent is-2">
            <article class="tile is-child">
              <characters :className="primaryClass" />
            </article>
          </div>
          <div class="tile is-parent is-vertical">
            <div class="tile">
              <div class="column is-half">
                {{ characterName | capitalize }}
                <router-view is-primary :selectedSkills="selectedPrimarySkills"></router-view>
              </div>
              <div class="column">
                <router-view :selectedSkills="selectedSecondarySkills"></router-view>
              </div>
            </div>
            <div class="tile is-parent">
              <support-skills />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-image"></div>
  </section>
</template>

<style>
  .bg-image {
    background-image: url(/img/worldmap.d72f062c.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top left;
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: -1;
    filter: blur(2px);
  }

  .title-container {
    background: linear-gradient(to right, #0000009e -1%, #2d1e0e, #0000002b 39%, transparent 45%);
    padding: 10px;
  }

  .title, .subtitle {
    color: white;
  }

  #app, html, body {
    height: 100%;
  }
</style>

<script>
import Vue from "vue";
import Buefy from "buefy";
import Characters from "@/components/Octopath/Characters";
import Job from "@/components/Octopath/Job";
import SupportSkills from "@/components/Octopath/SupportSkills";

import "buefy/lib/buefy.css";
Vue.use(Buefy);

export default {
  name: "OctopathSkillCalc",
  data() {
    return {
      primaryClass: "Thief",
      characterName: this.$route.params.characterName,
      selectedPrimarySkills: [],
      selectedSecondarySkills: []
    };
  },
  components: {
    Characters,
    Job,
    SupportSkills
  },
  filters: {
    capitalize: function(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>

<style scoped>
.columns {
  margin-top: 30px;
}
</style>