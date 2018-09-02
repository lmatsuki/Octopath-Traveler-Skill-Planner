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

      <b-dropdown-item v-for="detail in jobDetails" :key="detail.name" :value="detail.className" class="custom paddingless" v-if="!hasSameCharacterName(detail.name)">
        <div class="media">
          <b-icon class="media-left" icon="earth"></b-icon>
          <div class="media-content">
            <h3>{{ detail.name }}</h3>
            <small>{{ detail.description }}</small>
          </div>
        </div>
      </b-dropdown-item>
    </b-dropdown>
    <span class="tile is-child notification">
      <b-table :data="filteredJobSkills" :hoverable="true" class="table is-fullwidth">
        <template slot-scope="props">
          <b-table-column field="name" label="Skill">
            <b-tooltip type="is-dark" :label="props.row.description">
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
            <b-checkbox type="is-success" v-model="selectedSkills" :native-value="props.row.name"></b-checkbox>
          </b-table-column>
        </template>
      </b-table>
    </span>
  </span>
</template>

<script>
import jobDetails from "@/assets/job-details.json";
import jobSkills from "@/assets/job-skills.json";

export default {
  data() {
    return {
      jobSkills: jobSkills,
      jobDetails: jobDetails,
      className: "Thief",
      characterName: this.$route.params.characterName,
      selectedSkills: [],
      selectedClass: ""
    };
  },
  props: {
    isPrimary: Boolean
    //selectedSkills: Array
  },
  watch: {
    $route(to) {
      if (this.isPrimary) {
        this.characterName = to.params.characterName;
        this.className = this.convertCharNameToClassName(this.characterName);
      }
    },
    selectedSkills: {
      handler() {
        localStorage.setItem(
          this.getStorageName(),
          JSON.stringify(this.selectedSkills)
        );
      }
    },
    className: {
      handler() {
        if (!this.isPrimary) {
          console.log(`className: ${this.className}`);
          console.log(`characterName: ${this.characterName}`);
        }
      }
    }
  },
  updated: function() {
    //console.log(this.className);
    if (localStorage.getItem(this.getStorageName())) {
      this.selectedSkills = JSON.parse(
        localStorage.getItem(this.getStorageName())
      );
    }
  },
  computed: {
    allJobNames: function() {
      return jobSkills.classes;
    },
    filteredJobSkills: function() {
      return jobSkills.filter(function(skill) {
        if (this.isPrimary) {
          return skill.className === this.className;
        } else {
          return skill.className !== this.className;
        }
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
      if (charName === "therion") {
        return "Thief";
      } else {
        return "Dancer";
      }
    },
    getStorageName: function() {
      if (this.isPrimary) {
        return `${this.className.toLowerCase()}-activeSkills`;
      } else {
        return `${this.className.toLowerCase()}-${
          this.selectedClass
        }-activeSkills`;
      }
    },
    hasSameCharacterName: function(name) {
      return name.toLowerCase() === this.characterName.toLowerCase();
    }
  }
};
</script>