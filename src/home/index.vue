<template>
<div class="main-container">
  <Header></Header>
  <Banner> </Banner>
  <Content></Content>
</div>
</template>

<script>
import Header from './components/header.vue';
import Content from './components/content'
import Banner from './components/banner'
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
    Banner
  },
  props: {},
  data: function() {
    return {
      account_name: '',
      eos_balance:''
    }
  },
  mounted: function() {
    setTimeout(this.getHomeAccountName,500);
    setInterval(this.getLenTokenInfo,1000);
  },
  computed: {
    has_scatter: function() {
      return store.state.global_config.has_scatter;
    }
  },
  methods: {
    async getHomeAccountName () {
        let res = await get_scatter_identity();
        if(!res.is_error){
          this.account_name = res.data
          store.commit('setHomeAccount',res.data.name) 
        }
        let balance_res = await getBalance();
        if (balance_res) {
          this.eos_balance = balance_res.result[0]
          store.commit('setEosBalance',balance_res.result[0])
        } else {
          store.commit('setEosBalance',0)
        }
    },
    async getLenTokenInfo () {
      let res = await get_len_token_info();
      if(!res.is_error){
          this.account_name = res.data
          store.commit('setLenDetail',res.data) 
      }

      let len = await get_len_balance_bytable()
      if (!res.is_error) {
          this.account_name = len.data
          store.commit('setLenBalance',len.data) 
      }
    }
  }
}
</script>

<style>
.main-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
}

</style>
