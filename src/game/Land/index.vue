<template>
<div class="main-body" >

  <div class="main-container">
  <Header :account="account" v-on:requestId="requestId" date="2019"></Header>
  <div class="ad_title">赢取LEN，永不折价的TOKEN！每日21点分红！
    <el-button type="text" onstyle="float: right; padding: 3px 0" v-on:click="getinfo" class="land-withdraw-btn" >查看详情</el-button>
  </div>
  <div class="pool-emperor">
    <div class="pool-emperor-title"> 宣言：{{getManifest}}</div>
    <div class="pool-emperor-balance">
     <div class="pool-today-emperor"> 当前地王：{{landInfo.emperor.account}}，拥有国土{{landInfo.emperor.num}}万公里 </div>
     <div class="pool-manifesto"> 地王独享666 LEN奖励(21点快照)</div>
    </div> 
  </div>  

  <div class="pool-box">
    <div class="pool-title"> 当前奖池金额 /  今日每块地分红（21点快照） / 累积分红 </div>
    <div class="pool-balance">
      {{landInfo.poolBalace}}EOS/ {{gameInfo.todayBonus}}EOS /  42.99EOS
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
       所有土地永久售价1 EOS，每次买入玩家可以自由选择成功率，最低0.1，最高0.95。
       买入成功将获取奖励，并占有土地，例如 0.1胜率, 1 EOS 成功将立即获取8.85 EOS奖励，并持有土地。
       0.7%资金进入LEN池（0.35%增发归用户所有，0.35%增值LEN池），0.2%团队开发资金，0.1%推荐人奖励。
       每天21点按持有土地数量进行分红（分得当前资金池的 1/3 ）。
       用户可向系统卖出自己持有的地块，每块地块系统将向其返还0.5EOS，即扣除一半手续费。
       为保护土地持有者利益，20:30 至 20:55，最大成功概率为70%，20:55至21:00最大概率为50%
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
const popup =()=> import('../../components/popup.vue');
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
    Fab,
    popup
  },
  props: {},
  data: function() {
    return {
      popVisible: true,
      iconBack:'',
      iconContent:'https://gw.alicdn.com/tfs/TB1iZ03nHrpK1RjSZTEXXcWAVXa-884-876.jpg',
      popTitle: '持有土地即分红 ，右下角签到领LEN币',
      popText: '加官方微信群了解详细',
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
      this.popVisible = true
    } else {
      this.popVisible = false;
    }
    this.handleScatterLoaded()
    setInterval(this.getGameData,1000)
  },
  computed: {
    ...mapState(['identity', 'scatter', 'eos','balance','lenInfo','landInfo','gameInfo']),
    ...mapGetters(['account']),
     getManifest() {
      if (this.landInfo.manifestoMap.has(this.landInfo.emperor.account)) {
        return this.landInfo.manifestoMap.get(this.landInfo.emperor.account)
      }else {
        return "Finsur带你财富自由！！！"
      }
    },
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
    getPersonalInviteUrl() {
      if (this.account) {
         return "http://www.lemonfun.io/#/game/land?ref=" + this.account.name;
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
    },
     doCopy() {
        let inviteMessage = 'EOS 国土无双，我的土地我称雄，邀请好友享受永久分红，我的邀请链接：' + this.getPersonalInviteUrl()
        this.$copyText(inviteMessage).then(function (e) {
          console.log(e)
        }, function (e) {
          alert('Can not copy')
          console.log(e)
        })
        this.dialogVisible = false
    },
  }
}
</script>

<style  scoped>

.pool-today-emperor {
  font-size: 24px;
}
.pool-manifesto {
  font-size: 20px;
}
.land-account-invite {
  margin-left: 14px;
}

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
   margin-top: 20px;
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
  font-size: 28px;
}

.pool-emperor {
   height: 130px;
   width: 670px;
   border-radius: 15px;
   justify-content: center;
   text-align: center;
   display: flex;
   flex-direction: column;
   box-shadow: 5px 5px 2px #F56C6C;
   
}
.pool-emperor-title {
  width: 670px;
  font-size: 22px;
  color: #ffffff;
  text-align: center;
  background-color: #F56C6C;
  text-align: center;
  
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
}
.pool-emperor-balance {
  color: #6e7a92;
  text-align: center;
  background-color: #f2f2f2;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  display: flex;
  height: 90px;
  border-bottom-left-radius: 7px;
  border-bottom-right-radius: 7px;
  border-color: #F56C6C;
  border-style: solid;
  border-width: 1px;
  font-weight: bold;
  box-shadow:3px 3px 3px #F56C6C inset;     
  font-size: 28px;
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
  margin-top: 15px;
  color: #ffffff;
  font-weight: bold;
  text-align: center;
}
.land-info-sub-title {
  font-size: 20px;
  color: #ffffff;
  font-weight: bold;
  padding-left: 13px;
  padding-right: 13px;
  margin-top: 15px;
}
</style>
