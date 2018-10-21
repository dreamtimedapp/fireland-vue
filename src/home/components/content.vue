<template>
   <div class="you-token-container">
       <div class="token-name">
           <span>柠檬通证 len</span>
       </div>    
       <div>
          <el-row >
              <el-col :xs="24" :md="11"> 
                <div class="buy-token">
                    <el-input placeholder="请输入内容" v-model="input3">
                        <template slot="prepend">LEN</template>
                        <template slot="append">EOS</template>
                    </el-input>
                    <span class="token-subtext">可买入len通证数量：</span>
                    <el-button class="token-button" type="primary" >买入</el-button>
                </div> 
              </el-col>
              <el-col :xs="0" :sm="2" :md="2"> 
                <div class="divider-content">
                </div> 
              </el-col>  
              <el-col :xs="24"   :md="11">   
                <div class="sell-token">
                    <el-input placeholder="请输入内容" v-model="input3">
                        <template slot="prepend">LEN</template>
                        <template slot="append">LEN</template>
                    </el-input>
                    <span class="token-subtext" >可卖出len通证数量：</span>
                     <el-button class="token-button" type="danger" >卖出</el-button>
                </div>     
              </el-col>     
          </el-row> 
           <el-row >
              <el-col :xs="24" :md="11"> 
                <div class="len-info-table">
                    <el-card class="box-card">
                       <div slot="header" class="clearfix">
                           <span>柠檬数据统计</span>
                           <el-button style="float: right; padding: 3px 0" type="text">合约账户</el-button>
                        </div>
                        <div class="table-item-info">
                            <span>LEN价格：</span>
                            <span>0.01 EOS/LEN</span>
                        </div>    
                        <div class="table-item-info">
                            <span>LEN发行量：</span>
                            <span>0.01 EOS/LEN</span>
                        </div>
                        <div class="table-item-info">
                            <span>LEN流通量：</span>
                            <span>0.01 EOS/LEN</span>
                        </div> 
                        <div class="table-item-info">
                            <span>持有人分红池：</span>
                            <span>0.01 EOS/LEN</span>
                        </div>  
                        <div class="table-item-info-bottom">
                            <span>总分红池：</span>
                            <span>0.01 EOS/LEN</span>
                        </div>       
                    </el-card>
                </div>       
              </el-col>  
              <el-col :xs="2" :sm="2" :md="2" :lg="2">
                 <div class="divider-content">
                     
                 </div>
              </el-col>  
              <el-col :xs="24" :md="11">   
                <div class="you-info-table">
                     <el-card class="box-card">
                       <div slot="header" class="clearfix">
                           <el-button style="float: left; padding: 3px 0" type="text">请登录</el-button>
                        </div>
                        <div class="table-item-info">
                            <span>EOS数量：</span>
                            <span>0.01 EOS/LEN</span>
                        </div>    
                        <div class="table-item-info">
                            <span>LEN数量：</span>
                            <span>0.01 EOS/LEN</span>
                        </div>
                        <div class="table-item-info">
                            <span>总分成：</span>
                            <span>0.01 EOS/LEN</span>
                        </div> 
                        <div class="table-item-info">
                            <span>邀请分成：</span>
                            <span>0.01 EOS/LEN</span>
                        </div> 
                        <div class="table-item-info-bottom">
                            <span>邀请链接：</span>
                            <span>0.01 EOS/LEN</span>
                        </div>         
                    </el-card>
                </div>     
              </el-col>     
          </el-row>     
       </div>    
       <div class="len-introduce">
           <span class="len-title">lemon社区通证(len)介绍</span>
           <div class="len-info"> 
                <vue-markdown>{{rule}}</vue-markdown>
           </div>
       </div>    
       <div class="len-partner">
           <span class="len-partner-title">合作伙伴</span>
           <div class="partner-info">
               <el-row>
                   <el-col :xs="24" :md="12">
                      <a target="_blank">
                        <img class="img-thumbnail" src="https://img.alicdn.com/tfs/TB1Q0stjhnaK1RjSZFtXXbC2VXa-538-179.jpg"/>
                      </a>    
                   </el-col>
                   <el-col :xs="24" :md="12">
                       <a target="_blank">
                          <img class="img-thumbnail" src="https://img.alicdn.com/tfs/TB1Q0stjhnaK1RjSZFtXXbC2VXa-538-179.jpg"/>
                       </a>    
                   </el-col>        
               </el-row>    
           </div>    
       </div>   
       <div class="footer">
           <span>2018@ 柠檬游戏团队</span>
       </div>  
   </div>
</template>
<script>
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
          rule:rule
      }
    },
    computed: {
    },
    methods: {

    }
}
</script>
<style>
 .you-token-container {
     padding: 50px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
 }
 .token-name {
     margin-bottom: 60px;
     color: #000;
     font-size: 40px;
 }
 .divider-content {
     width: 100px;
     height: 100px;
     display: flex;
     background-color:#fff; 
 }
 .token-subtext {
     display: flex;
     margin-top: 10px;
     margin-bottom: 10px;
 }
 .token-button {
     width: 100%;
     margin-bottom: 40px;
 }
 .table-item-info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    flex-direction: row;
    font-size: 20px;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 2px;
    border-color: #ebeef5;
    border-style: solid;
    padding-left: 20px;
    padding-right: 25px;
}
 .table-item-info-bottom{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    flex-direction: row;
    font-size: 20px;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    padding-left: 20px;
    padding-right: 25px;
}
.box-card {
    margin-top: 30px;
}
.len-introduce {
   display: flex;
   margin-top:50px;
   width: 100%;
   min-height:600px;
   justify-content: center;
   color:hsla(0, 0%, 100%,.6);
   background-position:cennter 10%;
   background-color: #2b3137;
   background-size: cover;
   flex-direction: column;
   margin-bottom: 25px;
}
.len-title {
    font-size: 28px;
    color: #fff;
    margin-top: 10px;
    text-align: center;
}
.len-info {
    margin-left: 40px;
    margin-right: 40px;
    font-size:20px;
    margin-top:20px;
}
.len-partner {
    width: 100%;
    height: 300px;
    color: #fff;
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-top: 30px;
    align-items: center
}
.len-partner-title {
    color:#000;
    text-align: center;
    border-bottom: 2px solid rgb(153,153,153);
    font-size:28px;
    width: 200px;
    margin-top: 35px;
}

.img-thumbnail {
    padding: .25rem;
    background-color:#fff;
    border-radius: 0.25rem;
    max-width: 100%;
    height: auto;
    vertical-align: middle;
    border:0; 
    width: 400px;
}
.footer {
    margin-top:50px; 
    display: flex;
    width: 100%;
    height: 200px;
    justify-content: center;
    align-items: center;
    background-color: #2b3137;
    color: #fff;
}

</style>