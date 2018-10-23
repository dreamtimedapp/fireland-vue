<template>

<div class="main-container">
  <Header date="2019"></Header>
  <Betting/>
  <Land/>
  <Rule/>
  <!--<BettingTable/>-->
</div>

</template>

<script>
import Header from './components/header.vue';
import Land from './components/land.vue';
import Betting from './components/betting';
import Rule from './components/rule'
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
import { setInterval, setTimeout } from 'timers';

export default {
  name: 'landGame',
  components: {
    Header,
    Land,
    Betting,
    Rule
  },
  props: {},
  data: function() {
    return {
      account_name: '',
      eos_balance:''
    }
  },
  mounted: function() {
     //setInterval(this.getPlayerList,2000)
     //setInterval(this.getAccountName,2000);
     //setInterval(this.getGameListInfo,2000)
       setInterval(this.getLandInfo,1000);
     //setInterval(this.getTouzhuInfo,3000);
     setTimeout(this.getAccountName,100);
    // setTimeout(this.getLandInfo,200)
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
        if(res){
          this.account_name = res.data
          store.commit('getAccount',res.data) 
        }
        let balance_res = await getBalance();
        if (balance_res) {
          this.eos_balance = balance_res.result[0]
          store.commit('setEosBalance',balance_res.result[0])
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
      if (!this.account_name) {
        return
      }
      let landlist = await get_land_info()
      let counterlist = await get_gameInfo_list()
//      debugger
      if (landlist.is_error || counterlist.is_error) {
        return;
      }

      let landrows = landlist.data.rows
      let countrows = counterlist.data.rows;

//      debugger
      store.commit('getLandInfo',{
        "land":landrows,
        "count":countrows
      })
    },
   
    async getTouzhuInfo() {
      let res = await get_touzhu_info()
    }
  }
}
</script>

<style>
  .main-container {
    width: 100%;
    min-height: 100vh;
    background: #12161b; 
  }
</style>
