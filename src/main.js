import Vue from 'vue'
import VueRouter from 'vue-router'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'
import Home from './home'
import Land from './game/Land/index'
import store from './store'
import BootstrapVue from 'bootstrap-vue'
import VueCountdown from '@xkeshi/vue-countdown';
import VueMarkdown from 'vue-markdown';
import ElementUI from 'element-ui'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'element-ui/lib/theme-chalk/display.css';
import ScatterJS from 'scatterjs-core';
import  VueScrollTo from 'vue-scrollto'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueI18n)
Vue.use(ElementUI)
Vue.component(VueCountdown.name, VueCountdown);
Vue.component('vue-markdown', VueMarkdown);
Vue.use(BootstrapVue);
Vue.use(VueScrollTo);

const routes = [
  { path: '/game/land', component: Land },
  { path:'/home',component:Home},
  { path: '', component: Home }
]

const router = new VueRouter({
  routes 
})

/* eslint-disable no-new */
new Vue({
  router,
  store
  // el: '#app',
  // render: h => h(App)
}).$mount('#app');
