<template>
<div class="main-body" >
  <div class="main-container">
     <Fab :account="account"/>
     <Header :account="account" v-on:requestId="requestId"></Header>
     <Content :lenBalance="balance.len" :eosBalance="balance.eos" :lenInfo="lenInfo"></Content>
     <Footer/>

     <popup :title="popTitle" :text="popText" :visible.sync="popVisible"  v-on:pop-click="popCick"></popup>
   </div>
</div>
</template>

<script>
const Header = ()=> import ('./components/header');
const Content = ()=> import ('./components/content');
const Footer = ()=> import('./components/footer');
const Fab = ()=>import ('../common/fab');
import store from '../store';
const popup =()=> import('../components/popup');
import {getQueryString} from '../utils/utils.js';

import { setInterval, setTimeout } from 'timers';
import {add_counter} from '../services/get_data_service.js';
import { mapState, mapActions, mapGetters } from 'vuex'
import { network } from '../config'
const requiredFields = { accounts: [network] }

export default {
  name: 'landGame',
  components: {
    Header,
    Content,
    Fab,
    popup,
    Footer
  },
  props: {
    
  },
  data: function() {
    return {
      popVisible: false,
      popTitle: '活动公告',
      popText: '游戏即挖矿已经开始',
      eos_balance:''
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
  },
  computed: {
    ...mapState(['identity', 'scatter', 'eos','balance','lenInfo','landInfo','gameInfo']),
    ...mapGetters(['account']),
     has_scatter: function() {
      return store.state.global_config.has_scatter;
    },
    fixedTooltip() {
      return this.tooltipEvent === 'fixed';
    },
  },
  methods: {
    ...mapActions(['initScatter', 'setIdentity','updateBalance','setGameInfo','setLandInfo']),
    handleScatterLoaded () {
      const { scatter } = window
      this.initScatter(scatter)
      this.requestId();
      this.setGameInfo();
      this.setLandInfo();
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
     getRefInviteAccount() {
           if (!getQueryString('ref')) {
              return "lemoneosgame";
           }else {
             return getQueryString('ref');
           }
       },
    async popCick() {
      location.href='https://www.lemonfun.io/#/game/land?ref=' + this.getRefInviteAccount()
      /*
      if (new Date(1541044800000).getTime() >= new Date().getTime()) {
        alert("抽奖活动暂未开始，请12点后再次尝试")
        return
      }
      let res = await winLand(store.state.HomeStore.account_name,this.getRefInviteAccount())
      if (!res.is_error) {
          let gamelist = await get_touzhu_info()
          if (!gamelist.is_error && gamelist.data.rows && gamelist.rows.length >0) {
          gamelist.rows.forEach(element => {
            if (element.player == store.state.HomeStore.home_account_name) {
              if (element.type == 5) {
                  alert("恭喜成功获得土地")
              } else if(element.type==6){
                 alert("很遗憾，请下次尝试")
              }
            }
          });
          this.getLandInfo()
       }
      } else {
        alert(JSON.stringify(res.msg))
      }*/
    }
  }
}
</script>

<style scoped>

.main-body {
   background: #999999;
   width: 100%;
   min-height: 800px;
   padding-top: 3.15vw;
   padding-bottom: 3.15vw;
}

.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 1.7vw;
  margin-right: 1.7vw;
  background: #ffffff;
  border-radius: 20px;
}

</style>
