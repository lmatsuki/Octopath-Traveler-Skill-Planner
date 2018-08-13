<template>
  <span class="tile is-parent is-vertical">
    <b-dropdown class="tile is-child" v-model="className">
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
            <b-checkbox type="is-success"></b-checkbox>
          </b-table-column>
        </template>
      </b-table>
      <!-- <table class="table is-fullwidth">
        <thead>
          <tr>
            <th></th>
            <th>Skill</th>
            <th></th>
            <th>SP</th>
            <th></th>
          </tr>
        </thead>
        <tbody v-for="className in allJobNames" :key="className.name" v-if="className.name === jobName">
          <tr v-for="skill in filteredJobSkills" :key="skill.id">
            <td>
              <b-tooltip type="is-dark" :label="skill.description">
                <b-icon pack="fas" icon="question-circle" size="is-small"></b-icon>
              </b-tooltip>
            </td>
            <td>
              {{ skill.name }}
            </td>
            <td></td>
            <td>
              {{ skill.sp }}
            </td>
            <td>
              <input type="checkbox" />
            </td>
          </tr>
        </tbody>
      </table> -->
    </span>
  </span>
</template>

<script>
import jobDetails from "@/assets/job-details.json";
import jobSkills from "@/assets/job-skills.json";

export default {
  name: "Job",
  props: {
    jobNameParam: String
  },
  data: function() {
    return {
      jobSkills: jobSkills,
      jobDetails: jobDetails,
      className: "Thief"
    };
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
    }
  }
};
</script>