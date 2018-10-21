import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);

import LandStore from '../game/Land/store';//引入某个store对象
import HomeStore from '../home/store'

export default new vuex.Store({
    modules: {
        LandStore: LandStore,
        HomeStore: HomeStore
    }
})