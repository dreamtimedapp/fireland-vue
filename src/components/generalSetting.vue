<template>
  <text> hello</text>
</template>

<script>
  import store from '../data/store.js'
  import {
    get_scatter_identity,
    login,
    transfer,
    recast,
    getBalance
  } from '../services/web_wallet_service.js'
import { exists } from 'fs';

  export default {
    name: 'Home',
    data: function() {
      return {
        account_name:'',
        eos_balance:0,
        tab: 'game'
      }
    },
    mounted: function() {
      if (this.has_scatter) {
        this.call_scatter();
      }
    },
    components: {
    },
    computed: {
      isGameShow: function() {
        return (this.tab === 'game');
      }
    },
    methods: {
     
    }
  }
</script>