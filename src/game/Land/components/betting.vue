<template>

      <div class="land-you-bet-container">
            <el-tabs v-model="activeName" type="card">
              <el-tab-pane label="投注" name="first">
                  <div class="land-grid-content-betting">
                   <div>
                    <el-input  class="balance-input"   :placeholder="'最低投注:1 EOS，10 EOS即一次性买10块'"  v-model="amount">
                       <template slot="append">eos</template>
                    </el-input>
                    <el-input  class="manifesto-input"   :placeholder="'天下英雄谁敌手？朕就是这么任性！'"  v-model="menifesto">
                       <template slot="prepend">占有宣言</template>
                    </el-input>
                     <vue-slider :min="10" 
                          :max="max" v-model="beilv" :dotSize="10"   :value="beilv" :formatter='format' class="land-bet-slider"></vue-slider>
                    <el-button class="land-betting-btn"  v-on:click="playrecast" type="info">复投</el-button>
                    <span></span>
                    <el-button class="land-betting-btn"  v-on:click="playBetting" type="danger">下注</el-button>
                   </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="我的账户" name="second">
                    <div class="land-box-input-info">
                <div class="land-account-balance">
                    <span>EOS余额：</span>
                    <span class="item-value"> {{balance.eos}}  </span>
                </div>
                <div class="land-account-balance">
                    <span>我的土地：</span>
                    <span class="item-value">  {{landInfo.landNum}} 块 </span>
                     <el-button type="text" onstyle="float: right; padding: 3px 0" v-on:click="sellMyLand" class="land-withdraw-btn">卖出</el-button>
                </div>
                <div class="land-account-withdraw">
                    <span>游戏内余额：</span>
                    <span class="item-value"> {{landInfo.game_balance}} EOS  </span>
                    <el-button  type="text" onstyle="float: right; padding: 3px 0" v-on:click="withdraw" class="land-withdraw-btn">提现</el-button>
                </div>
                <div class="land-account-withdraw">
                    <span>累积下注总额：</span>
                    <span class="item-value"> {{landInfo.accTotal}} EOS  </span>
                </div>
                <div class="land-account-invite">
                    <span>邀请链接：</span>
                    <el-button  @click="dialogVisible = true" onstyle="float: right; padding: 3px 0" type="text"  class="land-withdraw-btn">复制</el-button>
                </div>
                <span class="land-invite-text ">邀请将永久享受好友投注的0.1%的分红</span>
              </div>  
              </el-tab-pane>
           </el-tabs>  
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
            <span>每次有效投注额，将获得投注额0.35%的LEN代币</span>
            <el-button @click="getToken" type="text"  class="land-withdraw-btn">查看详情</el-button>
        </div>
      </div> 
</template>
<script>

import { add_gamelog,get_game_log,update_manifesto} from '../../../services/get_data_service.js';
import {CONTRACT_NAME} from '../../../config/config.js'
import {getQueryString,timeRange} from '../../../utils/utils.js'
import store from '../../../store'
import { mapState, mapActions, mapGetters } from 'vuex'
import vueSlider from 'vue-slider-component';

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
          amountHolder:'',
          beilv:85,
          max:95,
          activeName:"first",
          manifesto:"天下英雄谁敌手？朕就是这么任性！"
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
          alert('每次有效投注的0.7%用于资金池，其中0.35%用于提高币价，0.35%用于增发token送给投资者')
       },
       format (value) {
           if (!value) {
               value = 1
           }
           let beilv = 1;
           if (this.amount) {
             beilv = this.amount
           }
           let origin = value;
           value = ( 0.98 / (value / 100)) * beilv; 
           return "胜率"+origin+"%,赢:"+ value.toFixed(4) + "的奖励"
       },
       async playBetting() {  
           debugger
        update_manifesto(this.account.name,this.manifesto);
        add_gamelog(this.account.name,this.amount,0,this.beilv)
        let memo = this.getRefInviteUrl()
        this.buyLand([this.amount,this.beilv]);
       },
       async sellMyLand() {
          if (this.landInfo.personal_land && this.landInfo.personal_land.length > 0) {
            let landID =  this.landInfo.personal_land[0].landID
            this.sellLand(landID);
          } else {
            alert("你没有土地可以售出")
          }
       },
       async playrecast() {
          update_manifesto(this.account.name,this.manifesto);
          add_gamelog(this.account.name,this.amount,1,this.beilv)
          this.recastLand([this.amount,this.beilv]);
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
.land-bet-slider {
    margin-top: 50px;
    width: 90%;
    padding-left: 40px;
    padding-right: 20px;
    margin-left: 40px;
    margin-right: 40px;
  
}

.betting-wakuang {
    color: #333;
    font-size: 24px; 
}
.land-withdraw-btn {
    font-size: 24px;
}

.demonstration {
    font-size: 20px;
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
    font-size: 24px;
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
    width: 660px;
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
    font-size: 24px;
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
    font-size: 24px;
   
}
.land-account-invite{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    flex-direction: row;
    padding-right: 10px;
    font-size:24px;
}
.el-input-group__append, .el-input-group__prepend {
    padding: 0 10px;
}
.land-you-bet-container {
    background-color: #fff;
    margin-top: 50px;
 }

.land-grid-content-betting {
    display: flex;
    width: 660px;
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