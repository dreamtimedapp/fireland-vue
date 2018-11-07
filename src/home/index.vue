<template>
<div class="main-body" >
  <div class="main-container">
     <Fab :account="account"/>
     <Header :account="account" v-on:requestId="requestId"></Header>
     <Content :lenBalance="balance.len" :eosBalance="balance.eos" :lenInfo="lenInfo"></Content>
     <Footer/>

     <popup :title="popTitle" :iconBack="iconBack" :buttonVisible="true" :text="popText" :visible.sync="popVisible"  v-on:pop-click="popCick"></popup>
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
      popVisible: true,
      iconBack:'https://gw.alicdn.com/tfs/TB12sQ3lhnaK1RjSZFBXXcW7VXa-1378-1378.jpg',
      popTitle: '永续合约，持有土地即分红',
      popText: '所有土地永久售价1 EOS，持有土地即分红，随机购买土地。土地被买则赢得1.3 EOS。用户可向系统卖出自己持有的地块，每块地块系统将向其返还0.5EOS。',
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
    this.handleScatterLoaded()
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
    }
  }
}
</script>

<style scoped>

.main-body {
   background: #6e7a92;
   width: 100%;
   min-height: 800px;
   flex-direction: column;
   padding-top: 25px;
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

</style>
