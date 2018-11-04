<template>
   <el-row>
       <el-col :span="24">
      <div class="land-you-bet-container">
        <div class="betting-title-jump-area">
            <a hre="#" class="betting-rule-jump" v-scroll-to="'#rule'" ><span>规则详情</span></a>
            <a hre="#" v-scroll-to="'#touzhu-table'" >投注总榜</a>
        </div>
        <el-row :gutter="24">
           <el-col :span="12">
               <div class="land-grid-content-betting">
                   <div>
                    <el-input :placeholder="'最低投注:' + this.landInfo.minPrice + ' EOS'"  v-model="amount">
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
                    <span> {{balance.eos}}  </span>
                </div>
                <div class="land-account-balance">
                    <span>我的土地：</span>
                    <span>  {{landInfo.landNum}}  </span>
                </div>
                <div class="land-account-withdraw">
                    <span>游戏内：</span>
                    <span> {{landInfo.game_balance}} EOS  </span>
                    <el-button  type="primary" v-on:click="withdraw" size="mini" class="land-withdraw-btn">提现</el-button>
                </div>
                <div class="land-account-invite">
                    <span>邀请链接：</span>
                    <el-button  @click="dialogVisible = true" onstyle="float: right; padding: 3px 0" type="text">复制</el-button>
                </div>
                <span class="land-invite-text ">邀请将永久享受好友投注的2%的分红</span>
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
            <span>每次有效投注额，将获得投注额4.5%的LEN代币</span>
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
       ...mapActions(['buyLand','withdraw','recastLand']),
       getToken() {
          alert('每次有效投注的9%用于资金池，其中4.5%用于提高币价，4.5%用于增发token送给投资者')
       },
       async playBetting() {
        if (!this.amount) {
            alert('请输入投注金额')
            return
        }
         if (this.game.gameState != 1) {
              alert('游戏还未开始，不可复投')
              return;
          } 
          if (this.amount < this.landInfo.minPrice ) {
             alert('投注金额不得低于' + this.landInfo.minPrice + 'EOS')
             return;
          } 
          add_gamelog(this.account.name,CONTRACT_NAME,this.amount)
          this.buyLand(this.amount, this.getRefInviteUrl());
       },
       async playrecast() {
          if (this.game.gameState != 1) {
              alert('游戏还未开始，不可复投')
              return;
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
    color: #fff;
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
    padding-right: 20px;
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
    font-size:14px;
}
.el-input-group__append, .el-input-group__prepend {
    padding: 0 10px;
}
.land-you-bet-container {
    background-color: #1f2833;
    margin-top: 0;
    margin-bottom: 50px;
    padding: 30px 15px 30px 15px;
    border-radius: 20px;
    margin-left: 20px;
    margin-right: 20px;
 }

.land-grid-content-betting {
    padding-left: 10px;
    margin-top: -10px;
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