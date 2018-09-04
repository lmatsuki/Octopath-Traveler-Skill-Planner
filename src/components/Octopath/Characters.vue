<template>
    <aside class="menu">
        <p class="menu-label">
            Characters
        </p>
        <ul class="menu-list">
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
                <router-link to="/octopathskillcalc/ophilia" active-class="is-active">
                    <article class="media">
                        <figure class="media-left">
                            <p class="image is-32x32">
                                <img src="@/assets/Octopath/ophilia_head.png">
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="content is-vcentered">
                                <p>Ophilia</p>
                            </div>
                        </div>
                    </article>                                
                </router-link>
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

<style>
.menu-list li {
    border: #ffffff8f solid 1px;
    background-color: #42372ab5;
}

.menu-list li a {
    color: white;
}

.menu-list li a:hover {
    background-color: #4c3f2f;
    color: white;
}

.menu-list li a.is-active {
    background-color: #271c0a;
}

.media {
    align-items: center;
}
</style>

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