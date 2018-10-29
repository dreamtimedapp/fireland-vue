<template>
<div class="main-container">
  <Fab v-bind:account="account_name"/>
  <Header></Header>
  <Banner> </Banner>
  <Content></Content>
    
</div>
</template>

<script>
import Header from './components/header.vue';
import Content from './components/content'
import Banner from './components/banner'
import Fab from '../common/fab';
import store from '../store'
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
    get_len_balance
} from '../services/web_wallet_service.js'
import { setInterval, setTimeout } from 'timers';

export default {
  name: 'landGame',
  components: {
    Header,
    Content,
    Banner,
    Fab
  },
  props: {},
  data: function() {
    return {
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
    setTimeout(this.initGame,700);
    setTimeout(this.getLenTokenInfo,500);
    //setInterval(this.getLandInfo,2000);
  },
  computed: {
    has_scatter: function() {
      return store.state.global_config.has_scatter;
    },
    fixedTooltip() {
      return this.tooltipEvent === 'fixed';
    }
  },
  methods: {
   
    async getHomeAccountName () {
        let res = await get_scatter_identity();
        if(!res.is_error){
          this.account_name = res.data.name
          store.commit('setHomeAccount',res.data.name) 
        }
        let balance_res = await getBalance();
    
        if (balance_res && balance_res.result && balance_res.result.length > 0) {
          this.eos_balance = balance_res.result[0]
          store.commit('setEosBalance',balance_res.result[0])
        } else {
          store.commit('setEosBalance',0)
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
          store.commit('setLenDetail',res.data) 
      }
      let len = await get_len_balance_bytable()
      if (!res.is_error) {
          store.commit('setLenBalance',len.data) 
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
