<template>
  <span class="tile is-parent is-vertical">
    <b-dropdown class="tile is-child" v-model="className" :disabled="isPrimary">
      <button class="button is-primary is-fullwidth" type="button" slot="trigger">
        <template>
          <span v-for="detail in jobDetails" :key="detail.name" v-if="detail.className === className">
            <span>{{ detail.className }}</span>
          </span>
        </template>
        <b-icon icon="menu-down"></b-icon>
      </button>

      <b-dropdown-item v-for="detail in jobDetails" :key="detail.name" :value="detail.className" class="custom paddingless" v-on:click="setActiveClass" v-if="getAllClassesExceptThis(detail.className)">
        <div class="media">
          <b-icon class="media-left" icon="earth"></b-icon>
          <div class="media-content">
            <h3>{{ detail.className }}</h3>
          </div>
        </div>
      </b-dropdown-item>
    </b-dropdown>
    <span class="tile is-child notification">
      <b-table :data="filteredJobSkills" :hoverable="true" class="table is-fullwidth visible-tooltip">
        <template slot-scope="props">
          <b-table-column field="name" label="Skill">
            <b-tooltip type="is-dark is-fixed" :label="props.row.description">
              {{ props.row.name }}
            </b-tooltip>
          </b-table-column>
          <b-table-column field="element" label=" ">
            <b-icon v-show="props.row.element != ''" pack="fas" icon="user" size="is-small">
              {{ props.row.element }}
            </b-icon>
          </b-table-column>
          <b-table-column field="sp" label="SP">
            {{ props.row.sp }}
          </b-table-column>
          <b-table-column field="" label="">
            <b-checkbox type="is-success" v-model="selectedSkills" :native-value=" props.row.name "></b-checkbox>
          </b-table-column>
        </template>
      </b-table>
    </span>
     <a class="button is-info" v-on:click="doSomething">Press me</a>
  </span>
</template>

<style>
  .visible-tooltip .table-wrapper {
    overflow: visible;
  }
</style>

<script>
import jobDetails from "@/assets/job-details.json";
import jobSkills from "@/assets/job-skills.json";

export default {
  data() {
    return {
      jobSkills: jobSkills,
      jobDetails: jobDetails,
      className: "",
      characterName: this.$route.params.characterName,
      selectedSkills: [],
    };
  },
  props: {
    isPrimary: Boolean
  },
  watch: {
    $route(to) {
      this.characterName = to.params.characterName;
      this.className = this.convertCharNameToClassName(this.characterName);

      console.log("Routing was updated.");

      // Update selected class
      if (this.isPrimary === false && localStorage.getItem(`${this.characterName.toLowerCase()}-activeClass`)) {
        // Set secondary job on load
        this.className = localStorage.getItem(`${this.characterName.toLowerCase()}-activeClass`);
      }

      // Update selected skills
      if (localStorage.getItem(this.getSkillStorageName())) {
        this.selectedSkills = JSON.parse(localStorage.getItem(this.getSkillStorageName()));
      }
    },
    selectedSkills: {
      handler() {
        localStorage.setItem(this.getSkillStorageName(), JSON.stringify(this.selectedSkills));
      }
    },
  },
  mounted: function() {
    console.log("mounted job component!");

    if (this.isPrimary === true) {
      // Set the primary job on load
      this.className = this.convertCharNameToClassName(this.$route.params.characterName);
    } else if (this.getActiveClassCached()) {
      // Set secondary job on load
      this.className = this.getActiveClassCached();
    }
  },
  destroyed: function() {
    //console.log("destroyed job component!");
  },
  computed: {
    allJobNames: function() {
      return jobSkills.classes;
    },
    filteredJobSkills: function() {
      return jobSkills.filter(function(skill) {
        return this.isEqualIgnoreCaseAndApostrophe(skill.className, this.className);
      }, this);
    },
    filteredJobDetails: function() {
      return jobDetails.filter(function(detail) {
        if (this.isPrimary) {
          return detail.name.toLowerCase() === this.characterName;
        } else {
          return detail.name.toLowerCase() != this.characterName;
        }
      }, this);
    }
  },
  methods: {
    getJobName: function() {
      return this.jobName;
    },
    convertCharNameToClassName: function(charName) {      
      if (!charName || charName === '') {
        return "";
      } else {
        const jobDetail = this.jobDetails.filter(function (detail){
          return this.isEqualIgnoreCaseAndApostrophe(detail.name, charName);
        }, this);

        if (jobDetail && jobDetail.length > 0) {
          return jobDetail[0].className;
        } else {
          return "";
        }
      }
    },
    doSomething : function () {
      console.log(this.jobDetails.filter(function (detail){
        return detail.name === "Therion";
      }, this).length);
    },
    getSkillStorageName: function() {
      if (this.isPrimary) {
        return `${this.characterName.toLowerCase()}-activeSkills`;
      } else {
        return `${this.characterName.toLowerCase()}-${this.className}-activeSkills`;
      }
    },
    getAllClassesExceptThis: function(className) {
      // name == "Hunter, Thief, Dancer"
      return this.convertCharNameToClassName(this.characterName) !== className;

    },
    isEqualIgnoreCaseAndApostrophe(firstClass, secondClass) {
      return (firstClass.replace("'", "").split(' ')[0].toLowerCase() === secondClass.replace("'", "").split(' ')[0].toLowerCase());
    },
    setActiveClass() {
      localStorage.setItem(`${this.characterName.toLowerCase()}-activeClass`, this.className);
    },
    getActiveClassCached() {
      return localStorage.getItem(`${this.characterName.toLowerCase()}-activeClass`);
    }
  }
};
</script>