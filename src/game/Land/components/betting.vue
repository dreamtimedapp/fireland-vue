<template>
   <el-row>
       <el-col :span="24">
      <div class="land-you-bet-container">
        <el-row :gutter="24">
           <el-col :span="12">
               <div class="land-grid-content-betting">
                   <div>
                    <el-input  class="balance-input"   :placeholder="'最低投注:' + this.landInfo.minPrice + ' EOS'"  v-model="amount">
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
                    <span class="item-value"> {{balance.eos}}  </span>
                </div>
                <div class="land-account-balance">
                    <span>我的土地：</span>
                    <span class="item-value">  {{landInfo.landNum}}  </span>
                     <el-button type="text" onstyle="float: right; padding: 3px 0" v-on:click="sellMyLand" class="land-withdraw-btn">卖出</el-button>
                </div>
                <div class="land-account-withdraw">
                    <span>游戏内：</span>
                    <span class="item-value"> {{landInfo.game_balance}} EOS  </span>
                    <el-button  type="text" onstyle="float: right; padding: 3px 0" v-on:click="withdraw" class="land-withdraw-btn">提现</el-button>
                </div>
                <div class="land-account-invite">
                    <span>邀请链接：</span>
                    <el-button  @click="dialogVisible = true" onstyle="float: right; padding: 3px 0" type="text">复制</el-button>
                </div>
                <span class="land-invite-text ">邀请将永久享受好友投注的0.4%的分红</span>
              </div>  
            </el-col>
       </el-row>
       <el-dialog
           title="邀请好友享受分红"
           :visible.sync="dialogVisible"
           width="80%">
           <span>{{getInviteMessage}}</span>
           <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="doCopy">复 制</el-button>
           </span>
        </el-dialog>
        <div class="betting-wakuang">
            <span>每次有效投注额，将获得投注额0.5%的LEN代币</span>
            <el-button @click="getToken" type="text">查看详情</el-button>
        </div>
      </div> 
     </el-col>
    </el-row>   
</template>
<script>

import { add_gamelog,get_game_log} from '../../../services/get_data_service.js';
import {CONTRACT_NAME} from '../../../config/config.js'
import {getQueryString} from '../../../utils/utils.js'
import store from '../../../store'
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
    ready() {
    },
    props: ['game','landInfo','balance','account'],
    data() {
      return {
          amount: '',
          memo: '',
          dialogVisible:false,
          dialogDetail: false,
          amountHolder:''
      }
    },
    computed: {
       getInviteMessage() {
         return 'EOS 国土无双，我的土地我称雄，邀请好友享受永久分红，专属邀请链接：' + this.getPersonalInviteUrl() 
      }
    },
    mounted: function() { 
    
    },
    methods: {
       ...mapActions(['buyLand','withdraw','recastLand','sellLand']),
       getToken() {
          alert('每次有效投注的1%用于资金池，其中0.5%用于提高币价，0.5%用于增发token送给投资者')
       },
       async sellMyLand() {
           
       },
       async playBetting() {
        if (new Date().getTime() < 1541505600000) {
              alert('游戏20:00 点开始，敬请期待')
              return;
        }    
        if (!this.amount) {
            alert('请输入投注金额')
            return
        }
        
        if (this.amount < 1 ) {
            alert('投注金额不得低于 1 EOS')
            return;
        } 
        add_gamelog(this.account.name,CONTRACT_NAME,this.amount)
        let memo = this.getRefInviteUrl()
        this.buyLand(this.amount,memo,'EOS');
       },
       async sellMyLand() {
          if (this.landInfo.personal_land && this.landInfo.personal_land.length > 0) {
            landID =  thos.landInfo.personal_land[0].landID
            this.sellLand();
          } else {
            alert("你没有土地可以售出")
          }
       },
       async playrecast() {
          if (new Date().getTime() < 1541505600000) {
              alert('游戏20:00点开始，敬请期待')
              return;
             // this.popVisible = true
          } 
          if (this.amount < this.landInfo.minPrice ) {
             alert('投注金额不得低于' + this.lanInfo.minPrice.minPrice + 'EOS')
             return;
          } 
          add_gamelog(this.account.name,CONTRACT_NAME,this.amount)
          this.recastLand(this.amount,this.getRefInviteUrl());
       },
       getRefInviteUrl() {
           if (getQueryString("ref")) {
               return getQueryString("ref")
           }
           return "lemoneosgame";
       },
       getPersonalInviteUrl() {
           if (this.account) {
              return "http://www.lemonfun.io/#/?ref=" + this.account.name;
           }
       },
      doCopy() {
        let inviteMessage = 'EOS 国土无双，我的土地我称雄，邀请好友享受永久分红，我的邀请链接：' + this.getPersonalInviteUrl()
        this.$copyText(inviteMessage).then(function (e) {
          console.log(e)
        }, function (e) {
          alert('Can not copy')
          console.log(e)
        })
        this.dialogVisible = false
    },
    }
}
</script>
<style>
.betting-wakuang {
    color: #333;
    font-size: 14px;
    padding-left: 20px;
}

.betting-title-jump-area {
    padding-left:20px;
    color:#409EFF;
    font-size:14px;
}
.betting-rule-jump {
    color:#000;
    margin-right: 20px;
}

.land-memo-input {
    margin-top: 10px;
}

.land-betting-btn {
   border-radius: 5px;
   width: 200px;
   justify-content: center;
   box-shadow: 3px 3px 1px #6e7a92;
}
.item-value {
    color: #fd676a;
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
    color: #333;
    font-size: 12px;
    padding-right: 20px;
    margin-top: 12px;

}
.balance-input {
    box-shadow:3px 3px 3px #6e7a92 inset;   
    border-radius: 5px;
}
.land-account-balance{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
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
    font-size:14px;
}
.el-input-group__append, .el-input-group__prepend {
    padding: 0 10px;
}
.land-you-bet-container {
    background-color: #fff;
    margin-top: 0;
    
    padding: 30px 15px 0px 15px;
 
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