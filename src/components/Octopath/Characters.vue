<template>
    <aside class="menu">
        <p class="menu-label">
            Characters
        </p>
        <ul class="menu-list">
            <li>
                <a>{{ className }}</a>
            </li>
            <li>
                <router-link to="/octopathskillcalc/therion" active-class="is-active">Therion</router-link>
            </li>
            <li>
                <router-link to="/octopathskillcalc/primrose" active-class="is-active">Primrose</router-link>
            </li>
            <li>
                <router-link to="/octopathskillcalc/haanit" active-class="is-active">H'aanit</router-link>
            </li>
            <li>
                <router-link to="/octopathskillcalc/alfyn" active-class="is-active">Alfyn</router-link>
            </li>
            <li>
                <router-link to="/octopathskillcalc/ophilia" active-class="is-active">Ophilia</router-link>
            </li>
            <li>
                <router-link to="/octopathskillcalc/tressa" active-class="is-active">Tressa</router-link>
            </li>
            <li>
                <router-link to="/octopathskillcalc/cyrus" active-class="is-active">Cyrus</router-link>
            </li>
            <li>
                <router-link to="/octopathskillcalc/olberic" active-class="is-active">Olberic</router-link>
            </li>
        </ul>
    </aside>
</template>

<script>
export default {
  name: "Characters",
  data() {
    return {
      className: this.$route.params.className
    };
  }
};
</script>