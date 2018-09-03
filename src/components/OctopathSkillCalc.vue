<template>
  <section class="hero">
    <div class="hero-body">
      <div class="container">
        <h2 class="title">Octopath Traveler Skill Calculator</h2>
        <p class="subtitle">Plan your character jobs and skills!</p>
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
  </section>
</template>

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