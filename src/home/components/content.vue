<template>
   <div class="token-outside-container1">
       <div class="token-wrapper">   
           <el-row>
               <el-col :xs="24" :sm="24" :md="12" >
                    <div class="token-sell-box">
                           <div class="balance-title-len">我的LEN余额</div>
                           <div class="balance-value">{{lenBalance}}</div>
                           <div class="match-box">
                              <div class="box-item">
                                  <div class="balance-title">LEN当前价格</div>
                                  <div class="item-value">{{lenInfo.price}} / LEN</div>
                               </div>
                               <div class="box-item">
                                  <div class="balance-title">LEN资金池</div>
                                  <div class="item-value">{{lenInfo.cash_pool}}</div>
                               </div>
                           </div>
                           <div class="match-box2">
                              <div class="box-item">
                                  <div class="balance-title">LEN最大释放量</div>
                                  <div class="item-value">{{lenInfo.max_supply}}</div>
                               </div>
                               <div class="box-item">
                                  <div class="balance-title">LEN当前流通量</div>
                                  <div class="item-value">{{lenInfo.supply}}</div>
                               </div>
                           </div>
                    </div>
                    <div class="sell-token">
                    <el-input placeholder="请输入内容" v-model="sellAmount">
                        <template slot="prepend">LEN</template>
                        <template slot="append">LEN</template>
                    </el-input>
                    <span class="token-subtext" >len价格：{{lenInfo.price}}，卖出获得EOS数量为：{{getCalculatePrice()}}</span>
                     <el-button class="token-button"   v-on:click="sellLen" type="danger" >卖出</el-button>
                </div> 
               </el-col>
             
               <el-col :xs="24" :sm="24" :md="12">
                    <div id="element" class="len-introduce">
                      <span class="len-title">LemonFun社区通证(LEN)介绍</span>
                      <div class="len-info"> 
                          <vue-markdown>{{rule}}</vue-markdown>
                      </div>
                    </div>   
                </el-col>        
            </el-row>    
       </div>    
   </div>
</template>
<script >
import { mapState, mapActions, mapGetters } from 'vuex'
import store from '../../store'
const rule = 
             "1.发行量1000万，对标资金蓄池；\n " +
                "2.token价格由资金蓄池金额和释放量决定：token价格＝资金蓄池eos额÷token总释放量；token的价格将随资金池增大线性增长。token按照游戏投注的9%，其中4.5%用于增发，4.5%用于增值。卖出token，则供应量减少，从而保障长期持有者的利益。\n" +
                "3.初始发行价0.001eos一个，团队存入1000eos，意味着token价格最低不低于0.001Eos。\n" +
                "4.LEN获取增发只能来源于游戏，增发的token归游戏玩家所有(具体请参考游戏规则)；\n" +
                "5.LEN卖出收取10%手续费，手续费将即时存入资金蓄池（不增发LEN），增值币价。（后期将根据情况进行限时减免手续活动）\n" +
                "6.LEN将会在LEMON旗下的后续开发游戏流通使用，增加LEN实际价值。"
export default {
    ready() {
    },
    props:['eosBalance','lenBalance','lenInfo'],
    data() {
      return {
        rule: rule,
        buyAmount:'',
        sellAmount:'',
        calculatePrice:'',
      }
    },
    methods: {
       ...mapActions(['sellToken']),
       async sellLen(event) {
          this.sellToken(this.sellAmount)
       },
       getCalculatePrice() {
          let len_price = this.lenInfo.price + ""
          let amount = this.sellAmount;
          // debugger
          if (amount == "") {
              amount = 0
          }
          
          let calculatePrice = parseFloat(len_price.replace(' EOS','')) * parseFloat(amount) * 0.9
          return calculatePrice.toFixed(4) + ' EOS'
        }
    }
}
</script>
<style scoped>
.token-outside-container1 {
    width: 100%;
    height:100%;
    background-color: #fff;
    border-top-color: #00000000;
    border-top-width: 2px;
    border-top-style: solid;
    display: flex;
    justify-content: center;
    align-items: center;

}
.token-wrapper {
    background-color: #666;
    width: 100%;
    margin-right: 2.5vw;
    margin-left: 2.5vw;
    height:100%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.token-sell-box {
   
    background: #f2f2f2;
    margin-left: 2.3vw;
    margin-right: 2.3vw;
    margin-top: 5.5vw;
    margin-bottom: 5vw;
    padding: 20px;
    border-radius:10px; 
}
.token-subtext {
    margin-top: 20px;
    color : #fff;
}
.token-button {
    margin-top: 20px;
    width: 100%;
}
.sell-token {
    margin-left: 2.3vw;
    margin-right: 2.3vw;
    margin-top: 20px;
    margin-bottom: 2vw;
}

.len-introduce {
   margin-top: 5.5vw;
   margin-left: 5.2vw;
   padding-right: 3vw;
}
.len-title {
    display: flex;
    color: #409EFF;
    font-style:bold;
    font-size: 40px;
    padding-bottom: 20px;
}
.balance-title-len  {
    font-size: 40px;
    color: #333;
}
.len-info {
    font-size: 28px;;
    line-height: 48px;
    color: #fff;
}

  .balance-title {
    font-size: 26px;
    color:#606266;
  }
  .balance-value {
    margin-top: .026667rem;
    color: #409EFF;
    font-size: 70px;
  }
  .match-box {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
  }
  .match-box2 {
    display: flex;
    justify-content: space-between;
    margin-top: 40px;
    padding-bottom: 30px;
  }
  .box-item {
    width: 50%;
    display: flex;
    flex-direction: column;
  }
  .balance-title {
    font-size: 26px;
  }
  .item-value {
    margin-top: 10px;
    color: #E6A23C;
    font-size: 28px;
  }
</style>