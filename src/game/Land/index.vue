<template>
<div class="main-container">
  <Header date="2019"></Header>
  <GameInfo/>
  <Betting/>
  <Land/>
  <Rule/>
</div>
</template>

<script>
import Header from './components/header.vue';
import Land from './components/land.vue';
import GameInfo from './components/gameinfo.vue'
import Betting from './components/betting';
import Rule from './components/rule'
import store from '../../store'
import {
    get_scatter_identity,
    login,
    transfer,
    recast,
    getBalance
} from '../../services/web_wallet_service.js'

export default {
  name: 'landGame',
  components: {
    Header,
    Land,
    GameInfo,
    Betting,
    Rule
  },
  props: {},
  data: function() {
    return {
    }
  },
  mounted: function() {
    this.getAccountName();
  },
  computed: {
    has_scatter: function() {
      return store.state.global_config.has_scatter;
    }
  },
  methods: {
    async getAccountName () {
        let res = await get_scatter_identity();
        if(res.is_error){
          store.commit('getAccount','') 
        }else{
          store.commit('getAccount',res.data.account_name) 
        }
    }
  }
}
</script>

<style>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
