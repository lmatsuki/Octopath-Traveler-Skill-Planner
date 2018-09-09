<template>
  <nav class="navbar is-fixed-top is-light" role="navigation" aria-label="main navigation">
    <div class="navbar-brand">
      <a class="navbar-item" href="https://vuejs.org">
        <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
      </a>
      <div class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarExample">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="navbarExample" class="navbar-menu is-white">
      <div class="navbar-start">
        <a class="navbar-item">
          <router-link to="/">Home</router-link>
        </a>
        <a class="navbar-item">
          <router-link to="/octopathskillcalc/therion">Octopath Traveler Skill Calculator</router-link>
        </a>
      </div>

      <div class="navbar-end">
      </div>
    </div>
  </nav>
</template>
    
<script>
import Vue from "vue";
import Buefy from "buefy";
import "buefy/lib/buefy.css";

Vue.use(Buefy);

export default {
  name: "Navbar"
};

document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});
</script>