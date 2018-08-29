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

      <b-dropdown-item v-for="detail in jobDetails" :key="detail.name" :value="detail.className" class="custom paddingless">
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
    }
  },
  computed: {
    allJobNames: function() {
      return jobSkills.classes;
    },
    filteredJobSkills: function() {
      return jobSkills.filter(function(skill) {
        return skill.className == this.className;
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
    }
  }
};
</script>