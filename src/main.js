import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueI18n from 'vue-i18n'
import App from './App'


Vue.config.productionTip = false
Vue.use(VueI18n)
Vue.use(ElementUI)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
