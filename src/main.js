import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

// Define components.
import ComponentTest from '@/components/ComponentTest'
import Home from '@/components/Home'
import OctopathSkillCalc from '@/components/Octopath/OctopathSkillCalc'

Vue.use(VueRouter);
Vue.config.productionTip = false

// Define routes.
const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/test', name: 'Test', component: ComponentTest },
  { path: '/octopathskillcalc', name: 'OctopathSkillCalc', component: OctopathSkillCalc }
]

// Create the router instance.
const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
