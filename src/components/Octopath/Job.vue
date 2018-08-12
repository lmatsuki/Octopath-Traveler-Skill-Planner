<template>
  <span class="tile is-parent is-vertical">
    <b-dropdown class="tile is-child" v-model="jobName">
      <button class="button is-primary is-fullwidth" type="button" slot="trigger">
        <template>
          <span v-for="className in allJobNames" :key="className.name" v-if="className.name === jobName">
            <span>{{ className.name }}</span>
            <ul>
              <li v-for="skill in filteredJobSkills" :key="skill.id">
                {{ skill.name }}
              </li>
            </ul>
          </span>
        </template>
        <b-icon icon="menu-down"></b-icon>
      </button>

      <b-dropdown-item v-for="className in allJobNames" :key="className.name" :value="className.name" class="custom paddingless">
        <div class="media">
          <b-icon class="media-left" icon="earth"></b-icon>
          <div class="media-content">
            <h3>{{ className.name }}</h3>
            <small>{{ className.description }}</small>
          </div>
        </div>
      </b-dropdown-item>
    </b-dropdown>
    <span class="tile is-child notification">
      <table class="table is-fullwidth">
        <thead>
          <tr>
            <th>Skill</th>
            <th>SP</th>
          </tr>
        </thead>
        <tbody v-for="className in allJobNames" :key="className.name" v-if="className.name === jobName">
          <tr v-for="skill in filteredJobSkills" :key="skill.id">
            <td>
              {{ skill.name }}
              <b-tooltip type="is-dark" :label="skill.description">
                <b-icon pack="fas" icon="question-circle" size="is-small"></b-icon>
              </b-tooltip>
            </td>
            <td>
              {{ skill.sp }}
            </td>
          </tr>
        </tbody>
      </table>
    </span>
  </span>
</template>

<script>
import jobSkills from "@/assets/job-skills.json";

export default {
  name: "Job",
  props: {
    jobNameParam: String
  },
  data: function() {
    return {
      jobName: ""
    };
  },
  computed: {
    allJobNames: function() {
      return jobSkills.classes;
    },
    filteredJobSkills: function() {
      return jobSkills.classes.filter(function(className) {
        return className.name == this.jobName;
      }, this)[0].skills;
    }
  },
  methods: {
    getJobName: function() {
      return this.jobName;
    }
  },
  mounted: function() {
    this.jobName = this.jobNameParam;
  }
};
</script>