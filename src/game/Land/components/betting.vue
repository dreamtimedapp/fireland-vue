<template>
    <div class="land-betting-container">
   
   <div class="land-you-bet-container">
        <el-row :gutter="24">
           <el-col :span="12">
               <div class="land-grid-content-betting">
                   <div>
                    <el-input :placeholder="getAmountHolder"  v-model="amount">
                       <template slot="append">eos</template>
                    </el-input>
                    <el-button class="land-betting-btn"  v-on:click="playrecast" type="info">复投</el-button>
                    <span></span>
                    <el-button class="land-betting-btn"  v-on:click="playBetting" type="danger">下注</el-button>
                   </div>
                </div>
           </el-col>
           <el-col :span="12">
              <div class="land-box-input-info">
                <div class="land-account-balance">
                    <span>EOS余额：</span>
                    <span> {{$store.state.LandStore.eos_balance}}  </span>
                </div>
                <div class="land-account-balance">
                    <span>我的土地：</span>
                    <span>  {{$store.state.LandStore.landNum}}  </span>
                </div>
                <div class="land-account-withdraw">
                    <span>游戏内：</span>
                    <span> {{$store.state.LandStore.game_balance}}  </span>
                    <el-button type="primary" v-on:click="withdraw" size="mini" class="land-withdraw-btn">提现</el-button>
                </div>
                <div class="land-account-invite">
                    <span>邀请链接：</span>
                    <el-button style="float: right; padding: 3px 0" type="text">复制</el-button>
                </div>
                <span class="land-invite-text ">邀请将永久享受好友投注的2%的分红</span>
              </div>  
            </el-col>
       </el-row>
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
withdraw,
} from '../../../services/web_wallet_service.js'
import {CONTRACT_NAME} from '../../../config/config.js'
import {getQueryString} from '../../../utils/utils.js'
import store from '../../../store'
export default {
    ready() {
    },
   
    data() {
      return {
          amount: '',
          memo: '',
          amountHolder:'当前最低投注：' + store.state.LandStore.minPrice + ' EOS'
      }
    },
    computed: {
        getAccount() {
           return store.state.HomeStore.account_name
        },
        getAmountHolder () { 
         return '当前最低投注：' + store.state.LandStore.minPrice + ' EOS'
       },
    },
    mounted: function() {
       
    },
    methods: {
      
       async playBetting() {
          if (store.state.LandStore.gameState != 1) {
              alert('游戏还未开始，请不要投注')
              return;
          } 
          if (this.amount < store.state.LandStore.minPrice ) {
            alert('投注金额不得低于' + store.state.LandStore.minPrice + 'EOS')
            return;
          } 
          let res = await transfer(CONTRACT_NAME,this.amount, this.getRefInviteUrl());
          if (res.is_error) {
            alert(JSON.stringify(res.msg))
          } else {
            alert('下注成功！')
          }
       },
       async playrecast() {
          if (store.state.LandStore.gameState != 1) {
              alert('游戏还未开始，请不要投注')
              return;
          } 
          if (this.amount < store.state.LandStore.minPrice ) {
              alert('投注金额不得低于' + store.state.LandStore.minPrice + 'EOS')
              return;
          } 
          let res = await recast(CONTRACT_NAME,this.amount,this.getRefInviteUrl());
          if (res.is_error) {
            alert(JSON.stringify(res.msg))
          } else {
            alert('下注成功！')
          }
       },
       async withdraw() {
          let res = await withdraw(CONTRACT_NAME,this.amount,this.getRefInviteUrl());
          if (res.is_error) {
            alert(JSON.stringify(res.msg))
          } else {
            alert('提现成功！')
          }
       },
       getRefInviteUrl() {
           let defaultUrl = "http://www.lemonfun.io/#/game/land?ref=";
           let url = defaultUrl
           if (getQueryString("ref") == null) {
               url = defaultUrl+ "teameaccount"
           } else {
               url = defaultUrl + getQueryString('ref')
           }
           return "teameaccount";
       }
    }
}
</script>
<style>
.land-betting-cointainer {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    margin-top: 50px;
}
.land-memo-input {
    margin-top: 10px;
}

.land-betting-btn {
   margin-top: 30px;
   width: 200px;
   justify-content: center;
}


.land-invite-text  {
    color: coral;
    margin-top: -15px;
}

.land-betting-cointainer .el-card {
    box-shadow: none;
}
.land-box-input-betting {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.land-box-input-info {
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    font-size: 12px;
}
.land-account-balance{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    flex-direction: row;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 2px;
    border-color: #ebeef5;
    border-style: solid;
    padding-right: 10px;
}

.land-account-withdraw{
     display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    flex-direction: row;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 2px;
    border-color: #ebeef5;
    border-style: solid;
    padding-right: 10px;
   
}
.land-account-invite{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    flex-direction: row;
    padding-right: 10px;
}
.el-input-group__append, .el-input-group__prepend {
    padding: 0 10px;
}
.land-you-bet-container {
    background-color: #1f2833;
    margin-top: 0;
    margin-bottom: 50px;
    padding: 30px 15px 30px 15px;
    border-radius: 8px;
    margin-left: 20px;
    margin-right: 20px;
 }

.land-grid-content-betting {
    padding-left: 10px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
}
.land-input-memo {
    margin-top: 25px;
}

.land-betting-btn {
   margin-top: 40px;
   width: 100%;

}
</style>