<template>
<div class="main-container">
  <Header></Header>
  <Content></Content>
</div>
</template>

<script>
import Header from './components/header.vue';
import Content from './components/content'
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
} from '../services/web_wallet_service.js'
import { setInterval } from 'timers';

export default {
  name: 'landGame',
  components: {
    Header,
    Content
  },
  props: {},
  data: function() {
    return {
      account_name: '',
      eos_balance:''
    }
  },
  mounted: function() {
  },
  computed: {
    has_scatter: function() {
      return store.state.global_config.has_scatter;
    }
  },
  methods: {
    async getAccountName () {
        if (this.account_name) {
          return;
        }
        let res = await get_scatter_identity();
        if(res.is_error){
          this.account_name = ''
          store.commit('getAccount','') 
        }else{
          this.account_name = res.data.account_name
          store.commit('getAccount',res.data.account_name) 
        }
    },
    async getEosBalance() {
        if (this.eos_balance) {
          return
        }
        let res = await getBalance();
        if (res) {
          this.eos_balance = res[0]
          store.commit('setEosBalance',res[0])
        } else {
          store.commit('setEosBalance',0)
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
