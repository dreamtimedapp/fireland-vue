<template>
<div class="main-container">
  <Header date="2019"></Header>
  <GameInfo/>
  <Betting/>
  <Land/>
  <Rule/>
  <BettingTable/>
</div>
</template>

<script>
import Header from './components/header.vue';
import Land from './components/land.vue';
import GameInfo from './components/gameinfo.vue'
import Betting from './components/betting';
import Rule from './components/rule'
import BettingTable from './components/tableinfo'
import store from '../../store'
import {
    get_scatter_identity,
    login,
    transfer,
    recast,
    getBalance,
    get_player_list,
    get_land_info,
    get_touzhu_info,
    get_gameInfo_list
} from '../../services/web_wallet_service.js'
import { setInterval } from 'timers';

export default {
  name: 'landGame',
  components: {
    Header,
    Land,
    GameInfo,
    Betting,
    Rule,
    BettingTable
  },
  props: {},
  data: function() {
    return {
    }
  },
  mounted: function() {
    setInterval(this.getPlayerList,1000)
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
    },
    async getEosBalance() {
        let res = await getBalance();
        if (res) {
          store.commit('setEosBalance',res[0])
        } else {
          store.commit('setEosBalance',0)
        }
    },
    async getPlayerList(){
      let res = await get_player_list()
      rows = res['rows']
      if (!rows) {
        return;
      }
      rows.forEach(element => {
        alert(JSON.stringify(element))
      });
    },
    async getLandInfo() {
      let res = await get_land_info()
     
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
