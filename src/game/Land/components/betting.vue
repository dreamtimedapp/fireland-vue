<template>
  <div class="betting-container">
  <div class="you-bet-container">
        <el-row :gutter="24">
           <el-col :span="12">
               <div class="grid-content-betting">
                   <div>
                    <el-input placeholder="请输入" v-model="amount">
                       <template slot="append">eos</template>
                    </el-input>
                    <el-input class="input-memo" placeholder="我的土地我做主！" v-model="memo">
                       <template slot="append">宣言</template>
                    </el-input>
                    <el-button class="betting-btn"  v-on:click="playBetting" type="danger">下注</el-button>
                   </div>
                </div>
           </el-col>
           <el-col :span="12">
              <div class="box-input-info">
                <div class="account-balance">
                    <span>EOS余额：</span>
                    <span> {{$store.state.LandStore.eos_balance}}  </span>
                </div>
                <div class="account-balance">
                    <span>我的土地：</span>
                    <span>  {{$store.state.LandStore.personal_land}}  </span>
                </div>
                <div class="account-withdraw">
                    <span>游戏内：</span>
                    <span> {{$store.state.LandStore.game_balance}}  </span>
                    <el-button type="primary" v-on:click="withdraw" size="mini" class="withdraw-btn">提现</el-button>
                </div>
                <div class="account-invite">
                    <span>邀请链接：</span>
                    <el-button style="float: right; padding: 3px 0" type="text">复制</el-button>
                </div>
                <span class="invite-text ">邀请将永久享受好友投注的2%的分红</span>
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
import store from '../../../store'
export default {
    ready() {
    },
   
    data() {
      return {
          amount: 0.1,
          memo: '我的土地我做主！',
      }
    },
    computed: {
        getAccount() {
           return store.state.HomeStore.account_name
        },
    },
    methods: {
       async playBetting() {
          let res = await transfer('teamaccount',this.amount, this.memo);
          debugger
          if (res.is_error) {
            alert(JSON.stringify(res.msg))
          } else {
            alert('下注成功！')
          }
       },
       async withdraw() {
          let res = await withdraw(o);
          debugger
          if (res.is_error) {
            alert(JSON.stringify(res.msg))
          } else {
            alert('体现成功！')
          }
       }
    }
}
</script>
<style>
.betting-cointainer {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    margin-top: 50px;
}
.memo-input {
    margin-top: 10px;
}

.betting-btn {
   margin-top: 30px;
   width: 200px;
   justify-content: center;
}

.text {
    font-size: 14px;
}
.invite-text  {
    color: coral;
    margin-top: -15px;
}
.title {
    font-size: 25px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card-betting {
    width: 370px;
    height: 500px;
}
.box-card-info {
    width: 370px;
    height: 500px;
}
.betting-cointainer .el-card {
    box-shadow: none;
}
.box-input-betting {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.box-input-info {
    display: flex;
    justify-content: center;
    flex-direction: column;
    color: #fff;
    font-size: 12px;
}
.account-balance{
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

.account-withdraw{
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
.account-invite{
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
.you-bet-container {
    background-color: #1f2833;
    margin-top: 0;
    margin-bottom: 50px;
    padding: 30px 15px 30px 15px;
    border-radius: 8px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    margin-left: 20px;
    margin-right: 20px;

 }

.grid-content-betting {
    padding-left: 10px;
    margin-top: 30px;
    display: flex;
    flex-direction: column;
}
.input-memo {
    margin-top: 25px;
}

.betting-btn {
   margin-top: 40px;
   width: 100%;

}
</style>