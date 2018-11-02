<template>
<div class="main-container">
  <Header :account="account" v-on:requestId="requestId" date="2019"></Header>
  <el-row   class="land-info-row" 
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
      <el-col :xs="24" :sm="24"  :md="8" style="height:100%;backgroundcolor:#000">   
          <div  class="land-game-countdown" style="height:100%">
           <span>{{gameInfo.gameMessage}}</span>
           <countdown :time="gameInfo.gameCount">
              <template slot-scope="props">
                 {{ props.days }} 天 {{ props.hours }} 小时 {{ props.minutes }} 分 {{ props.seconds }} 秒
              </template>
           </countdown>
          </div> 
      </el-col>     
      <el-col :xs="24" :sm="24"  :md="8"  >  
        <div  class="land-game-currentInfo ">
          <span>最低土地价格: {{landInfo.minPrice}}  EOS</span>
         </div>  
      </el-col>
      <el-col :xs="24" :sm="24"  :md="8"  >   
            <div  class="land-game-pool" >
            <span>当前奖池金额: {{landInfo.poolBalace}}  EOS</span>
            <br/>
            <span> {{landInfo.blackLand}}</span>
            </div>   
      </el-col>
  </el-row>    
  <Betting :balance="balance" :landInfo="landInfo" :account="account" :game="gameInfo"/>
  <Land  :landInfo="landInfo" :account="account"  />
  <Rule :landInfo="landInfo"/>
  <!--<BettingTable/>-->
  <Fab v-if="account" v-bind:account="account.name"/>
</div>

</template>

<script>
import Header from './components/header.vue';
import Land from './components/land.vue';
import Betting from './components/betting';
import Rule from './components/rule'
import Fab from '../../common/fab';
import store from '../../store'

import { setInterval, setTimeout } from 'timers';
import { stat } from 'fs';
import { mapState, mapActions, mapGetters } from 'vuex'
import { network } from '../../config'
const requiredFields = { accounts: [network] }

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
      
    }
  },
  created () {
    // @TODO: replace with Scatter JS
    document.addEventListener('scatterLoaded', () => {
      console.log('Scatter Loaded')
      this.handleScatterLoaded()
    })
  },
  mounted: function() {
    setInterval(this.getGameData,1000)
  },
  computed: {
    ...mapState(['identity', 'scatter', 'eos','balance','lenInfo','landInfo','gameInfo']),
    ...mapGetters(['account'])
  },
  methods: {
     ...mapActions(['initScatter', 'setIdentity','updateBalance','setGameInfo','setLandInfo','getTouzhuInfo','getGameBalance','recastLand','withdraw']),
    handleScatterLoaded () {
      const { scatter } = window
      this.initScatter(scatter)
      this.requestId();
      this.getGameData();
    },
    async getGameData() {
      this.setGameInfo();
      this.setLandInfo();
      this.getTouzhuInfo();
    },
    async requestId () {
      await this.suggestNetworkSetting()
      const identity = await this.scatter.getIdentity(requiredFields)
      this.setIdentity(identity)
    },
    async forgetId () {
      await this.scatter.forgetIdentity()
      this.setIdentity(null)
    },
    async suggestNetworkSetting () {
      try {
        await this.scatter.suggestNetwork(network)
      } catch (error) {
        console.info('User canceled to suggestNetwork')
      }
    },
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
