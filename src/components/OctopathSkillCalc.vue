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

<style>
@import url('https://fonts.googleapis.com/css?family=Mirza|Neucha');

  .bg-image {
    background-image: url(../assets/Octopath/img/worldmap.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: top left;
    position: fixed;
    height: 100%;
    width: 100%;
    z-index: -1;
    filter: blur(1px);
  }

  .title-container {
    background: linear-gradient(to right, #0000009e -1%, #2d1e0e, #0000002b 39%, transparent 45%);
    padding: 10px;
  }

  .hero-octopath .title, .subtitle {
    color: white;
    text-shadow: 2px 2px 5px black;
  }

  #app, html, body {
    height: 100%;
  }

  .label-charName {
    padding-left: 0.75rem !important;
    font-weight: normal;
    font-size: 30px;
    color: white;
    border-bottom: #d3d3d39c 1px solid;
    text-shadow: 2px 2px 7px black;
    font-family: 'Mirza', cursive;    
    line-height: 30px;
  }

  .bg-opaque:first-child, .bg-opaque-2 {
    background-color: #000000a3;    
    border: 1px solid #d3d3d39c;
    padding-left: 0;
    padding-right: 0;
    margin-right: 1rem;
    margin-top: 1.8rem;
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