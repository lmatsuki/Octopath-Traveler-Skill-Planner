<template>
  <section class="hero hero-octopath">
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
              <div class="column is-half bg-opaque">
                <div class="label-charName tile is-parent">
                  {{ characterName | capitalize }}
                </div>                
                <router-view is-primary :selectedSkills="selectedPrimarySkills"></router-view>
              </div>
              <div class="column bg-opaque-2">
                <div class="label-charName tile is-parent is-invisible">hidden</div>
                <router-view :selectedSkills="selectedSecondarySkills"></router-view>
              </div>
            </div>
            <!-- <div class="tile is-parent">
              <support-skills />
            </div> -->
          </div>
        </div>
      </div>
    </div>
    <div class="bg-image"></div>
  </section>
</template>

<script>
import Vue from "vue";
import Buefy from "buefy";
import Characters from "@/components/Octopath/Characters";
import Job from "@/components/Octopath/Job";
import SupportSkills from "@/components/Octopath/SupportSkills";

import "buefy/lib/buefy.css";
import "../assets/Octopath/css/site.css";

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
  watch: {
    $route(to) {
      // Update character name
      this.characterName = this.$options.filters.capitalize(to.params.characterName);
    }
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