import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'
import App from './App'
import Land from './firegame/Land/index'


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(VueI18n)
Vue.use(ElementUI)

const routes = [
  { path: '/game/land', component: Land },
  { path: '', component: App }
]

const router = new VueRouter({
  routes 
})

/* eslint-disable no-new */
new Vue({
  router
  // el: '#app',
  // render: h => h(App)
}).$mount('#app');
