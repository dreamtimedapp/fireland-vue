<template>
<div class="main-container">
  <Header date="2019"></Header>
  <el-row   class="land-info-row" 
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-col :xs="24" :sm="24"  :md="8" style="height:100%;backgroundcolor:#000">   
          <div  class="land-game-countdown" style="height:100%">
           <span>{{gameStateInfo}}</span>
           <countdown :time="getCountTime">
              <template slot-scope="props">
                 {{ props.days }} 天 {{ props.hours }} 小时 {{ props.minutes }} 分 {{ props.seconds }} 秒
              </template>
           </countdown>
          </div> 
      </el-col>     
      <el-col :xs="24" :sm="24"  :md="8"  >  
        <div  class="land-game-currentInfo ">
          <span>当前最高土地价格: {{$store.state.LandStore.maxPrice}}  EOS</span><br>
          <span>最低土地价格: {{$store.state.LandStore.minPrice}}  EOS</span>
         </div>  
      </el-col>
      <el-col :xs="24" :sm="24"  :md="8"  >   
            <div  class="land-game-pool" >
            <span>当前奖池金额: {{$store.state.LandStore.poolBalace}}  EOS</span>
            <br/>
            <span> {{getBlackLand}}</span>
            </div>   
      </el-col>
  </el-row>    
  <Betting />
  <Land 
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"/>
  <Rule/>
  <!--<BettingTable/>-->
  <Fab/>
</div>

</template>

<script>
import Header from './components/header.vue';
import Land from './components/land.vue';
import Betting from './components/betting';
import Rule from './components/rule'
import Fab from '../../fab';
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
    Rule,
    Fab
  },
  props: {},
  data: function() {
    return {
      account_name: '',
      eos_balance:'',
      gameStateInfo:'',
      loadingGame: true
    }
  },
  mounted: function() {
      //(this.initGame,100);
      if (!this.account_name) {
        this.login();
      } 
      setTimeout(this.initGame,500);
      setTimeout(this.getPlayerList,500);
      setInterval(this.getLandInfo,1000);  
      setInterval(this.getTouzhuInfo,1000);   
  },
  computed: {
    has_scatter: function() {
      return store.state.global_config.has_scatter;
    },
    getCountTime:function() {
      return  store.state.LandStore.gameCount
    },
    getBlackLand:function() {
      if (!store.state.LandStore.blackLand) {
        return '黑地皮未被占有'
      } else {
        return '黑地皮所有者：' + store.state.LandStore.blackLand
      }
    }
  },
  methods: {
    async login() {
        let res = await login();
        if (res) {
          this.account_name = res.name
          store.commit('getAccount',res.name)
        }
    },
    async initGame () {
       
        await this.getGameTime();
        let state = store.state.LandStore.gameState;
        if (state == 0) {
          this.gameStateInfo = "距离游戏开始还有："
         } else if (state == 1) {
           this.gameStateInfo = "游戏正在进行，距离结束还有："
         } else if (state == 2) {
           this.gameStateInfo  = "游戏暂未开始，请稍后"
        }
        this.loadingGame = false;
        let balance_res = await getBalance();
        if (balance_res) {
          this.eos_balance = balance_res.result[0]
          store.commit('setEosBalance',balance_res.result[0])
        } 
    },
    //获取游戏开始时间或结束时间
    async getGameTime() {
        let counterlist = await get_gameInfo_list()
        if (!counterlist.is_error) {
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
  .land-info-row {
    padding-top: 40px;
    overflow:hidden;
    align-items: center;
   
  }
  .land-game-countdown {
    background-color: #F56C6C;
    margin-top: 0;
    margin-bottom: 50px;
    padding: 30px 15px 30px 15px;
    border-radius: 8px;
    margin-left: 20px;
    margin-right: 20px;
    color: #FFF;
    font-size: 30px;
    height: 100%;
  }
  .land-game-currentInfo {
    background-color: #E6A23C;
    margin-top: 0;
    margin-bottom: 50px;
    padding: 30px 15px 30px 15px;
    border-radius: 8px;
    margin-left: 20px;
    margin-right: 20px;
    color: #fff;
    font-size: 30px;
      height: 100%;
  }
  .land-game-pool {
     background-color: #67C23A;
    margin-top: 0;
    margin-bottom: 50px;
    padding: 30px 15px 30px 15px;
    border-radius: 8px;
    margin-left: 20px;
    margin-right: 20px;
    color: #fff;
    font-size: 30px;
      height: 100%;
  } 
</style>
