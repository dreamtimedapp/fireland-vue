<template>

<div class="main-container">
  <Header date="2019"></Header>
    <div class="land-game-countdown">
    <div>
    <span>{{gameStateInfo}}</span>
    <countdown :time="getCountTime">
     <template slot-scope="props">
         {{ props.days }} 天 {{ props.hours }} 小时 {{ props.minutes }} 分 {{ props.seconds }} 秒
     </template>
    </countdown>
    </div>
  </div>
  <div class="land-game-currentInfo">
    <span>当前全场最高土地价格: {{$store.state.LandStore.maxPrice}}  EOS</span>
    <span>当前全场最低土低价格: {{$store.state.LandStore.minPrice}}  EOS</span>
  </div>  
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
import { stat } from 'fs';

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
      eos_balance:'',
      gameStateInfo:''
    }
  },
  mounted: function() {
      setTimeout(this.getAccountName,100);
      setInterval(this.getLandInfo,1000);
      setInterval(this.getTouzhuInfo,200)
  },
  computed: {
    has_scatter: function() {
      return store.state.global_config.has_scatter;
    },
    getCountTime:function() {
      return  store.state.LandStore.gameCount
    },
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
        let gameInfo = await this.getGameTime();
        let state = store.state.LandStore.gameState;
        if (state == 0) {
          this.gameStateInfo = "距离游戏开始还有："
         } else if (state == 1) {
           this.gameStateInfo = "游戏正在进行，距离结束还有："
         } else if (state == 2) {
           this.gameStateInfo  = "游戏暂未开始，请稍后"
        }
        let balance_res = await getBalance();
        if (balance_res) {
          this.eos_balance = balance_res.result[0]
          store.commit('setEosBalance',balance_res.result[0])
        } 
    },
    //获取游戏开始时间或结束时间
    async getGameTime() {
        if (!this.account_name) {
          return;
        }
        let counterlist = await get_gameInfo_list()
        if (counterlist) {
          store.commit('getGameInfo',counterlist.data.rows[0])
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
      if (landlist.is_error || counterlist.is_error) {
        return;
      }
      let landrows = landlist.data.rows
      let countrows = counterlist.data.rows;
      store.commit('getLandInfo',{
        "land":landrows,
        "count":countrows
      })
    },
   
    async getTouzhuInfo() {
      if (!this.account_name) {
        return
      }
      let res = await get_touzhu_info()
      if (res.is_error) {
         return;
      }
      let touzhurows = res.data.rows
      store.commit('getTouzhuRows',touzhurows);
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
  .land-game-countdown {
    background-color: #1f2833;
    margin-top: 0;
    margin-bottom: 50px;
    padding: 30px 15px 30px 15px;
    border-radius: 8px;
    margin-left: 20px;
    margin-right: 20px;
    color: #FFF;
    font-size: 30px;
  }
  .land-game-currentInfo {
     background-color: #1f2833;
    margin-top: 0;
    margin-bottom: 50px;
    padding: 30px 15px 30px 15px;
    border-radius: 8px;
    margin-left: 20px;
    margin-right: 20px;
    color: #fff;
    font-size: 30px;
  }
</style>
