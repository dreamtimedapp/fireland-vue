<template>
<div class="main-body" >

  <div class="main-container">
  <Header :account="account" v-on:requestId="requestId" date="2019"></Header>
  <div class="ad_title">赢取LEN，永不折价的TOKEN！今晚8点开始游戏！
    <el-button type="text" onstyle="float: right; padding: 3px 0" v-on:click="getinfo" class="land-withdraw-btn">查看详情</el-button>
  </div>
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
       所有土地永久售价1 EOS，每次买入30%失败，70%成功。
       1%资金进入LEN池（0.5%增发归用户所有，0.5%增值LEN池），0.6%团队开发资金，0.4%推荐人奖励。
       买入成功即可获取0.3EOS奖励及成为该地块持有者，原地块持有者获取1EOS出场。
       买入失败资金将进入资金池，每天12点按持有土地数量进行分红（分得资金池的一半）。
       用户可向系统卖出自己持有的地块，每块地块系统将向其返还0.5EOS。
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
      popVisible: true,
      popTitle: '永续合约，持有土地即分红（今晚8点开始）',
      popText: '所有土地永久售价1 EOS，持有土地即分红，随机购买土地。土地被买则赢得1.3 EOS。用户可向系统卖出自己持有的地块，每块地块系统将向其返还0.5EOS。',
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
    if (new Date().getTime() < 1541505600000) {
     // this.popVisible = true
    } else {
      //this.popVisible = false;
    }
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
    async popLandCick() {
      
    },
    getinfo () {
      let name = "";
      if (this.account) {
        name = this.account.name;
      }
      location.href="https://www.lemonfun.io/#/?ref=" + name
    }
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
  height: 300px;
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
