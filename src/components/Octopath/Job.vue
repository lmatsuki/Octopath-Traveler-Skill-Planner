<template>
  <span class="tile is-parent is-vertical">
    <b-dropdown class="tile is-child" v-model="className" :disabled="isPrimary" >
      <button class="button is-primary is-fullwidth" type="button" slot="trigger">
        <template>
          <span v-for="detail in jobDetails" :key="detail.name" v-if="detail.className === className">
            <span>{{ detail.className }} <i class="fa fa-caret-down fa-xs" v-if="!isPrimary"></i></span>
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
    <span class="tile is-child notification bg-opaque">
      <b-table :data="filteredJobSkills" :hoverable="true" class="table is-fullwidth visible-tooltip" v-if="isPrimary || className !=='None'">
        <template slot-scope="props">
          <b-table-column field="name" label="Skills">
            <b-tooltip type="is-dark is-fixed" :label="props.row.description">
              {{ props.row.name }}
            </b-tooltip>
          </b-table-column>
          <b-table-column field="element" label=" ">
            <figure class="image icon-element" v-if="props.row.element!=''&&props.row.element!='Divine'">
              <img :src="getImagepath(props.row.element)">
            </figure>
          </b-table-column>
          <b-table-column field="sp" label="SP">
            {{ props.row.sp }}
          </b-table-column>
          <b-table-column field="">
            <b-checkbox type="is-success" v-model="selectedSkills" :native-value="props.row.name" :disabled="props.row.element === 'Divine'"></b-checkbox>
          </b-table-column>
        </template>
      </b-table>
    </span>
  </span>
</template>

<script>
import jobDetails from "../../../static/json/job-details.json";
import jobSkills from "../../../static/json/job-skills.json";

export default {
  data() {
    return {
      jobSkills: jobSkills,
      jobDetails: jobDetails,
      className: "",
      characterName: this.$route.params.characterName,
      selectedSkills: []
    };
  },
  props: {
    isPrimary: Boolean
  },
  watch: {
    $route(to) {
      this.characterName = to.params.characterName;
      this.className = this.convertCharNameToClassName(this.characterName);

      // console.log("Routing was updated.");
      this.loadCharacterSettings();      
    },
    selectedSkills: {
      handler() {
        // Handle Divine skills
        const divineSkill = this.getDivineSkillName();

        if (this.selectedSkills.length === this.filteredJobSkills.length - 1 && !this.divineSkillLearned()) {
          this.selectedSkills.push(divineSkill);
        } else if ((this.selectedSkills.length <= this.filteredJobSkills.length - 1) && this.divineSkillLearned()) {
          this.selectedSkills = this.selectedSkills.filter(skill => skill !== divineSkill);
        }    
        
        localStorage.setItem(this.getSkillStorageName(), JSON.stringify(this.selectedSkills));
      }
    },
  },
  mounted: function() {
    // console.log("mounted job component!");

    if (this.isPrimary === true) {
      // Set the primary job on load
      this.className = this.convertCharNameToClassName(this.$route.params.characterName);
    } else {
      // Set secondary job on load
      if (this.getActiveClassCached()) {
        this.className = this.getActiveClassCached();
      } else {
        this.className = "None";
      }
    }    

    this.updateSelectedSkills();
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
    },
    divineSkillLearned() {
      return (this.selectedSkills.includes(this.getDivineSkillName()));      
    },
    getDivineSkillName() {
      const divineSkills = (this.filteredJobSkills.filter(function (skill) {
            return skill.element === "Divine";
          }, this));
      return divineSkills.length > 0 ? divineSkills[0].name : '';
    },
    updateSelectedSkills() {
      if (localStorage.getItem(this.getSkillStorageName())) {
        this.selectedSkills = JSON.parse(localStorage.getItem(this.getSkillStorageName()));
      }
    },
    getImagepath: function (imageName) {
      var images = require.context("@/assets/Octopath/img/", false, /\.png$/);
      return images("./" + imageName.toLowerCase() + "_element.png");
    },
    loadCharacterSettings: function () {
      // Update selected class
      if (this.isPrimary === false) {
        if (localStorage.getItem(`${this.characterName.toLowerCase()}-activeClass`)) {
          // Set secondary job on load
          this.className = localStorage.getItem(`${this.characterName.toLowerCase()}-activeClass`);
        } else {
          this.className = "None";
        }
      }

      this.updateSelectedSkills();
    }
  }
};
</script>