<template>
<div class="main-container" >
  <Fab v-bind:account="account_name"/>
  <Header></Header>
  <Banner> </Banner>
  <Content></Content>
  <popup :title="popTitle" :text="popText" :visible.sync="popVisible"  v-on:pop-click="popCick"></popup>
</div>
</template>

<script>
import Header from './components/header';
import Content from './components/content';
import Banner from './components/banner';
import Fab from '../common/fab';
import store from '../store';
import popup from '../components/popup';
import {getQueryString} from '../utils/utils.js';
//const popup = require('../components/popup.vue');
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
    get_len_token_info,
    get_len_balance_bytable,
    get_len_balance,
    winLand
} from '../services/web_wallet_service.js';
import { setInterval, setTimeout } from 'timers';
import {add_counter} from '../services/get_data_service.js';

export default {
  name: 'landGame',
  components: {
    Header,
    Content,
    Banner,
    Fab,
    popup
  },
  props: {
    
  },
  data: function() {
    return {
      popVisible: true,
      popTitle: '活动公告（签到送Token&抽奖获土地）',
      popText: '北京时间11月1日20:00，将开启游戏即挖矿，12点开启抽奖免费送土地活动，游戏开始前截止。中奖的地皮初始是价值1eos，卖出可获利0.65eos，越早参与，中奖率越高，每个账户一次抽奖机会，共有145块地皮，送完即止',
      account_name: '',
      eos_balance:'',
                positionTypes: [
                    'fixed',
                    'absolute'
                ],
                tooltipEvents: [
                    'hover',
                ],
                actions:[
                  {
                    name: 'jumpHome',
                    icon: 'home', 
                    tooltip: '主页', 
                    color:'#000',
                  },
                  {
                    name: 'refresh',
                    icon: 'refresh', 
                    tooltip: '刷新', 
                    color:'#E6A23C',
                  },
                  {
                    name: 'share',
                    icon: 'share', 
                    tooltip: '分享', 
                    color:'#F56C6C',
                  },
                  {
                    name: 'sign',
                    icon: 'add_alert', 
                    tooltip: '签到',
                    color:'#67C23A'
                  }
                ],
                iconSizes:'medium',
                position: 'bottom-right',
                tooltipEvent: 'hover',
                mainIcon: 'add',
                enableRotation: true
    }
  },
  mounted: function() {
    setTimeout(this.getHomeAccountName,100);
    setTimeout(this.getLenTokenInfo,300);
    setTimeout(this.initGame,700);
  },
  computed: {
    has_scatter: function() {
      return store.state.global_config.has_scatter;
    },
    fixedTooltip() {
      return this.tooltipEvent === 'fixed';
    },
  },
  methods: {
     getRefInviteAccount() {
           if (!getQueryString('ref')) {
              return "lemoneosgame";
           }else {
             return getQueryString('ref');
           }
       },
    async popCick() {
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
      }
    },
   
    async getHomeAccountName () {
        let res = await get_scatter_identity();
        if(!res.is_error){
          this.account_name = res.data.name
          add_counter(this.account_name)
          store.commit('setHomeAccount',res.data.name) 
        }
        let len = await get_len_balance_bytable()
        if (!len.is_error) {
            if (len.data && len.data.rows && len.data.rows.length > 1) {
             store.commit('setLenBalance',len.data) 
            }
        }
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
    async getLenTokenInfo () {
      let res = await get_len_token_info();
      if(!res.is_error){
          if (res.data) {
          store.commit('setLenDetail',res.data) 
         }
      }
      let len = await get_len_balance_bytable()
      if (!len.is_error) {
          if (len.data) {
          store.commit('setLenBalance',len.data) 
      }
      }
    },
    async initGame () {
        let counterlist = await get_gameInfo_list()
        if (!counterlist.is_error) {
            store.commit('getGameInfo',counterlist.data.rows[0])
        } 
        let state = store.state.LandStore.gameState;
        if (state == 0) {
           this.gameStateInfo = "距离游戏开始还有："
         } else if (state == 1) {
           this.gameStateInfo = "游戏正在进行，距离结束还有："
         } else if (state == 2) {
           this.gameStateInfo  = "游戏暂未开始，请稍后"
        }
    },
  }
}
</script>

<style scoped>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
