<template>
   <div class="land-box">
    <div class="land-header-container"> 
      <div>  
      <b-img class="land-logo" src="https://img.alicdn.com/tfs/TB12p3CjAvoK1RjSZPfXXXPKFXa-2000-2000.png" /> 
      <span class="land-logo-title">EOS大地主</span> 
      </div>
      <div class="land-header-left">
      <div class="land-header-nav hidden-xs-only hidden-sm-only ">
          <b-link to="/home"  class="land-header-text">玩法规则</b-link>
          <router-link to="/home" class="land-header-text">柠檬游戏</router-link>
      </div>
      <el-button v-if="!getAccount" v-on:click="login" class="land-login-button" type="primary" >登录(EOS)账户</el-button>
      <div v-if="getAccount" class="land-login-account-name" type="primary" >{{$store.state.LandStore.account_name}}</div>
      </div>
    </div> 
   
  </div>
</template>
<script>
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
} from '../../../services/web_wallet_service.js'
import store from '../../../store'
const rule = 
            "1. 游戏板块为20×20的地图，每一格代表一块地皮，每块地皮初始定价0.5eos，其中有2块为黑地皮没定价（作用下面解析）；\n" +
                "2. 玩家自定金额下注买地，系统随机一块地皮进行购买判断；\n" +
                "3. LEM 采用 Bancor 算法，价格 = EOS 储备量 / (YOU 发行量 × 20%)，认购增加 EOS 储备及 YOU 流通量，买入价格上涨，卖出价格下跌。\n" +
                "4. 情况2、地皮为玩家自身地皮，玩家扣除20%地皮标价手续费升级该地皮（地皮标价翻倍）；\n" +
                "5. 所有买入 YOU 的 EOS 金额，会先扣除 15% 手续费作为平台维护资金，用来支持团队研发、资源消耗、游戏推广（包括 5.25% 的好友邀请奖励）。我们会利用这部分费用研发后续的游戏，并会将不低于 50% 的盈利分给所有 YOU 的持有者。 \n" +
                "6. 为了在早期保护所有持有 YOU 的玩家权益，卖出 YOU 会收取 30% 手续费，此部分手续费会作为分红全部返还给 YOU 持有者（不包含锁定部分）。\n" +
                "7. 当 YOU 发行量超过 2200 万后（共售出 1100 万 YOU，大概需要 10 万 EOS），买入和卖出手续费只收取 0.5%，此时 YOU 价格为 0.023 EOS。\n" +
                "8. 所有资产公开透明，任意第三方 EOS 区块浏览器可查，规则人人平等。"
export default {
    ready() {
    },
   
    data() {
      return {
        rule: rule,
        eos_balance:''
      }
    },
    computed: {
        getAccount() {
           return store.state.LandStore.account_name
        },
    },
    methods: {
      login: async function(event) {
        let res = await login();
        debugger
        if (res) {
          store.commit('getAccount',res.name)
        }
       },
    }
}
</script>
<style>
.land-box {
    width: 100%;
    display: flex;
    min-width: 700px;
    justify-content: center;
    flex-direction: column;
}
.land-header-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 150px;
    background: #12161b;
    min-width: 750px;
    justify-content: space-between;
} 


.land-logo-title {
    color: #fff;
    font-size: 27px;
    margin-left: -40px;

}
.land-header-left {
    float: right;
    display: flex;
    align-items: center;
    flex-direction: row;
}
.land-header-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.land-logo {
    width: 200px;
    height: 200px;
    margin-left: 30px;
}
.land-header-text {
    text-align: center;
    font-size:30px;
    color: #fff; 
    margin-left: 45px;
}
.land-login-button {
    margin-left: 60px;
    margin-right: 60px;
}
.land-login-account-name {
    margin-left: 60px;
    margin-right: 60px;
    font-size: 34px;
    color: #fff;
}

.bg-dark {
    background: #fff;
}

</style>