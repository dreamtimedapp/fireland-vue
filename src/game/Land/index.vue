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
import CountDown from './components/countdown'
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
    get_gameInfo_list,
} from '../../services/web_wallet_service.js'
import { setInterval } from 'timers';

export default {
  name: 'landGame',
  components: {
    Header,
    Land,
    CountDown,
    Betting,
    Rule,
    BettingTable
  },
  props: {},
  data: function() {
    return {
      account_name: '',
      eos_balance:''
    }
  },
  mounted: function() {
     setInterval(this.getPlayerList,2000)
     setInterval(this.getEosBalance,2000)
     setInterval(this.getLandInfo,2000)
     setInterval(this.getAccountName,2000);
     setInterval(this.getGameListInfo,2000)
     setInterval(this.getTouzhuInfo,2000)
  },
  computed: {
    has_scatter: function() {
      return store.state.global_config.has_scatter;
    }
  },
  methods: {
    async getAccountName () {
        if (this.account_name) {
          return;
        }
        let res = await get_scatter_identity();
        if(res.is_error){
          this.account_name = ''
          store.commit('getAccount','') 
        }else{
          this.account_name = res.data.account_name
          store.commit('getAccount',res.data.account_name) 
        }
    },
    async getEosBalance() {
        if (this.eos_balance) {
          return
        }
        let res = await getBalance();
        if (res) {
          this.eos_balance = res[0]
          store.commit('setEosBalance',res[0])
        } else {
          store.commit('setEosBalance',0)
        }
    },
    //获取玩家的信息
    async getPlayerList(){
      let res = await get_player_list()
      if (res.is_error) {
        return;
      }
      let rows = res.data.rows
      if (!rows) {
        return;
      }
      store.commit('getGameBalance',rows)
    },
    //获取地块信息表
    async getLandInfo() {
      let res = await get_land_info()
      if (res.is_error) {
        return;
      }
      let rows = res.data.rows
      if (!rows) {
        return;
      }
      store.commit('getLandInfo',rows)
    },
    // 获取游戏信息表,第几场游戏，游戏的开场时间
    async getGameListInfo() {
      let res = await get_gameInfo_list()
    },
    async getTouzhuInfo() {
      let res = await get_touzhu_info()
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
