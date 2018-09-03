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

      <b-dropdown-item v-for="detail in jobDetails" :key="detail.name" :value="detail.className" class="custom paddingless" v-on:click="setActiveClass">
        <!-- <b-dropdown-item v-for="detail in jobDetails" :key="detail.name" :value="detail.className" class="custom paddingless"> -->
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
            <b-checkbox type="is-success" v-model="selectedSkills" :native-value=" props.row.name "></b-checkbox>
          </b-table-column>
        </template>
      </b-table>
    </span>
    <button class="button is-info" v-on:click="doStuff">do stuff</button>
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
      className: "",
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
      this.characterName = to.params.characterName;
      this.className = this.convertCharNameToClassName(this.characterName);

      console.log("Routing was updated.");

      // Update the selected class
      if (
        this.isPrimary === false &&
        localStorage.getItem(`${this.characterName.toLowerCase()}-activeClass`)
      ) {
        // Set secondary job on load
        this.className = localStorage.getItem(
          `${this.characterName.toLowerCase()}-activeClass`
        );
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
      handler() {}
    }
  },
  updated: function() {
    if (localStorage.getItem(this.getStorageName())) {
      this.selectedSkills = JSON.parse(
        localStorage.getItem(this.getStorageName())
      );
    }
  },
  created: function() {
    console.log("created job component!");
  },
  mounted: function() {
    console.log("mounted job component!");
    const className = this.convertCharNameToClassName(
      this.$route.params.characterName
    );

    if (this.isPrimary === true) {
      // Set the primary job on load
      this.className = this.convertCharNameToClassName(
        this.$route.params.characterName
      );
    } else if (
      localStorage.getItem(`${this.characterName.toLowerCase()}-activeClass`)
    ) {
      // Set secondary job on load
      this.className = localStorage.getItem(
        `${this.characterName.toLowerCase()}-activeClass`
      );
    }
    console.log(`secondary: ${className.toLowerCase()}-activeClass`);
  },
  destroyed: function() {
    console.log("destroyed job component!");
  },
  computed: {
    allJobNames: function() {
      return jobSkills.classes;
    },
    filteredJobSkills: function() {
      return jobSkills.filter(function(skill) {
        return this.isEqualIgnoreCaseAndApostrophe(
          skill.className,
          this.className
        );
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
      if (charName.toLowerCase() === "therion") {
        return "Thief";
      } else if (charName.toLowerCase() === "primrose") {
        return "Dancer";
      } else if (charName.toLowerCase() === "haanit") {
        return "Hunter";
      } else {
        return "";
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
      //console.log("first: " + name.toLowerCase());
      //console.log("second: " + this.characterName.toLowerCase());
      return name.toLowerCase() === this.characterName.toLowerCase();
    },
    doStuff: function() {
      console.log(this.className);
    },
    isEqualIgnoreCaseAndApostrophe(firstClass, secondClass) {
      return (
        firstClass.replace("'", "").toLowerCase() ===
        secondClass.replace("'", "").toLowerCase()
      );
    },
    setActiveClass() {
      console.log("--------------setactiveclass");
      localStorage.setItem(
        `${this.characterName.toLowerCase()}-activeClass`,
        this.className
      );
    }
  }
};
</script>