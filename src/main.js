/**
 * 
 * 全部组件切换为懒加载
 * 
*/

const  i18n = ()=> import('./i18n')
import store  from './store'
const  fab =()=> import ('./FAB.vue');
import VueClipboard from 'vue-clipboard2'
import vueSlider from 'vue-slider-component';
Vue.config.productionTip = false
Vue.component('vue-fab',fab);
Vue.component('vue-slider',vueSlider)
Vue.use(VueClipboard)

const routes = [
  { 
    path: '/game/land', 
    name:'fireland',
    component:() => import (/* webpackChunkName: "fireland" */ './game/Land/index')
  },
  { 
    path:'/home',
    name:'home',
    component:() => import(/* webpackChunkName: "home" */ './home')
  },
  
  { path: '', 
    name: 'home' ,
    component:() => import(/* webpackChunkName: "home" */ './home')
  },
  { 
    path: '/game/miner', 
    name:'miner',
    component:() => import(/* webpackChunkName: "miner" */ './game/Miner/index')
  }
]

const router = new VueRouter({
  routes 
})

/* eslint-disable no-new */
new Vue({
  router,
  store,
  i18n
  // el: '#app',
  // render: h => h(App)
}).$mount('#app');
