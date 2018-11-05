<template>
<div class="main-body" >
  <div class="main-container">
  <Header :account="account" v-on:requestId="requestId" date="2019"></Header>
  <div class="ad_title">赢取LEN，永不折价的TOKEN！</div>
  <div class="pool-box">
    <div class="pool-title"> 当前奖池金额 </div>
    <div class="pool-balance">
      {{landInfo.poolBalace}}  EOS
    </div> 
  </div>  
  <!--
    <el-row >
      <el-col :xs="24" :sm="24"  :md="8"  >   
            <div  class="land-game-pool" >
            <span>当前奖池金额: {{landInfo.poolBalace}}  EOS</span>
            <br/>
            <span> {{landInfo.blackLand}}</span>
            </div>   
      </el-col>
  </el-row>    -->
  <Betting :balance="balance" :landInfo="landInfo" :account="account" :game="gameInfo"/>
  </div>

  <div class="land-intro">
     <div class="land-info-title"> 
       —— 永续合约 ——
     </div>
     <div class="land-info-sub-title">
       全部土地永久1 EOS，每次买入 20% 概率失败，80%，下注即可参与LEN挖矿。失败资金进资金池，隔天按持有土地数量进行分红，
       持有土地被占有则赢得 1.2 EOS. 持有土地可随时卖出.
     </div>    
  </div>  

  <Land  :landInfo="landInfo" :account="account"  />
  <Rule :landInfo="landInfo"/>
  <Footer/>
  <!--<BettingTable/>-->
  <Fab  v-bind:account="account"/>
  
</div>

</template>

<script>
const  Header = ()=> import('./components/header.vue');
const  Land = ()=> import ('./components/land.vue');
const  Betting  = ()=> import ('./components/betting');
const  Rule = ()=> import ('./components/rule');
const  Fab = ()=> import ('../../common/fab');
const  Footer = ()=> import ('./components/footer.vue');
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
    Footer,
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
     this.handleScatterLoaded()
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

<style  scoped>

.main-body {
   background: #6e7a92;
   width: 100%;
   min-height: 800px;
   flex-direction: column;
   padding-top: 3.15vw;
   padding-bottom: 3.15vw;
   display: flex;
   justify-content: center;
   align-items: center;
}

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
 
  width: 730px;
  background: #ffffff;
  border-radius: 20px;
}
.pool-title {
  background-color: #6e7a92;
  display: flex;
  height: 44px;
  justify-content: center;
  align-items: center;
  font-size: 20px;
}
.ad_title {
  width: 670px;
  padding-left: 5px;
  font-size: 24px;
}

.pool-box {
   height: 130px;
   width: 670px;
   border-radius: 15px;
   justify-content: center;
   box-shadow: 5px 5px 2px #6e7a92;
}
.pool-title {
  width: 670px;
  font-size: 22px;
  height: 40px;
  color: #ffffff;
  text-align: center;
  background-color: #6e7a92;
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
}
.pool-balance {
  color: #6e7a92;
  text-align: center;
  background-color: #f2f2f2;
  justify-content: center;
  align-items: center;
  display: flex;
  height: 90px;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  border-color: #6e7a92;
  border-style: solid;
  border-width: 1px;
  font-weight: bold;
  box-shadow:3px 3px 3px #6e7a92 inset;     
  font-size: 40px;
}
.land-intro {
  background-color: #4d5667;
  height: 180px;
  width: 730px;
  margin-top: 20px;
  border-radius: 15px;
}
.land-info-title {
  font-size: 30px;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
}
.land-info-sub-title {
  font-size: 16px;
  color: #ffffff;
  font-weight: bold;
  padding-left: 13px;
  padding-right: 13px;
  margin-top: 15px;
}
</style>
