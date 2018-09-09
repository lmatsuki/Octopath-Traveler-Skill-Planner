<template>
    <aside class="menu">
        <p class="menu-label is-invisible">
            Characters
        </p>
        <ul class="menu-list">
            <li>
                <router-link to="/octopathskillcalc/therion" active-class="is-active">
                    <article class="media">
                        <figure class="media-left">
                            <p class="image is-32x32">
                                <img src="@/assets/Octopath/img/therion_head.png">
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="content is-vcentered">
                                <p>Therion</p>
                            </div>
                        </div>
                    </article>  
                </router-link>
            </li>
            <li>
                <router-link to="/octopathskillcalc/primrose" active-class="is-active">
                    <article class="media">
                        <figure class="media-left">
                            <p class="image is-32x32">
                                <img src="@/assets/Octopath/img/primrose_head.png">
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="content is-vcentered">
                                <p>Primrose</p>
                            </div>
                        </div>
                    </article>  
                </router-link>
            </li>
            <li>
                <router-link to="/octopathskillcalc/haanit" active-class="is-active">
                    <article class="media">
                        <figure class="media-left">
                            <p class="image is-32x32">
                                <img src="@/assets/Octopath/img/haanit_head.png">
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="content is-vcentered">
                                <p>H'aanit</p>
                            </div>
                        </div>
                    </article>  
                </router-link>
            </li>
            <li>
                <router-link to="/octopathskillcalc/alfyn" active-class="is-active">
                    <article class="media">
                        <figure class="media-left">
                            <p class="image is-32x32">
                                <img src="@/assets/Octopath/img/alfyn_head.png">
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="content is-vcentered">
                                <p>Alfyn</p>
                            </div>
                        </div>
                    </article>  
                </router-link>
            </li>
            <li>
                <router-link to="/octopathskillcalc/ophilia" active-class="is-active">
                    <article class="media">
                        <figure class="media-left">
                            <p class="image is-32x32">
                                <img src="@/assets/Octopath/img/ophilia_head.png">
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
                <router-link to="/octopathskillcalc/tressa" active-class="is-active">
                    <article class="media">
                        <figure class="media-left">
                            <p class="image is-32x32">
                                <img src="@/assets/Octopath/img/tressa_head.png">
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="content is-vcentered">
                                <p>Tressa</p>
                            </div>
                        </div>
                    </article> 
                </router-link>
            </li>
            <li>
                <router-link to="/octopathskillcalc/cyrus" active-class="is-active">
                    <article class="media">
                        <figure class="media-left">
                            <p class="image is-32x32">
                                <img src="@/assets/Octopath/img/cyrus_head.png">
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="content is-vcentered">
                                <p>Cyrus</p>
                            </div>
                        </div>
                    </article>    
                </router-link>
            </li>
            <li>
                <router-link to="/octopathskillcalc/olberic" active-class="is-active">
                    <article class="media">
                        <figure class="media-left">
                            <p class="image is-32x32">
                                <img src="@/assets/Octopath/img/olberic_head.png">
                            </p>
                        </figure>
                        <div class="media-content">
                            <div class="content is-vcentered">
                                <p>Olberic</p>
                            </div>
                        </div>
                    </article>    
                </router-link>
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