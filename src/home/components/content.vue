<template>
   <div class="home-you-token-container">
       <div class="token-name">
           <span>柠檬通证 len</span>
       </div>    
       <div class="buy-box">
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
                           <el-button  v-if="!getAccount"  v-on:click="login" style="float: left; padding: 3px 0" type="text">请登录</el-button>
                            <div v-if="getAccount" style="float: left; padding: 3px 0" type="text" >{{$store.state.HomeStore.account_name}}</div>
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
       <div class="len-security">
           <span class="len-security-title">验证安全</span>
           <div class="adt_grids">
        
                <h3 class="security-title text-center">如何保证EOS智能合约资金安全？</h3>
                <h4>方法一：多重签名智能合约 </h4>
                <p>
                    EOS权限体系通过权重（Weight）和阈值（Threshold）来限制合约账户，可以实现多个人共同管理一个账户资金，假设智能合约账户有5个人的公钥，每个公钥的权重为1，权限的总阈值为3，这就表示必须要这5个人中至少3个人签名，才可以转移资金和修改合约代码。
                </p>  
                <h4>方法二：移交智能合约权限</h4>
                <p>
                    这种方式也比较安全，我们可以修改合约权限为eosio.prods账户，直接将智能合约权限移交给官方21个节点来控制，未来如果需要转移资金或修改合约，则需要申请节点仲裁。
                </p>   
                <h4>
                    方法三: 设置合约漏洞公钥
                </h4>    
                <p>
                    这种方式是最接近区块链定义的，我们可以将智能合约权限修改为黑洞公钥，官方在超级节点竞选时临时用过的这个公钥：EOS1111111111111111111111111111111114T1Anm，它的公钥是0值加检验数据生成的，任何人都不知道它的私钥，未来合约也不可能再被转移资金或修改。
                </p>
                <h3 class="security-title ">
                    柠檬智能合约
                </h3>    
                <p>
                    经过研发团队讨论之后，我们决定采用最后一种方式（黑洞公钥），因为这种是最接近区块链原始定义的方式：公正公平、无法撰改，待柠檬项目稳定运行之后，我们就采取合约黑洞公钥方式。
                </p>    
                <p>
                  合约账号：<a href="" target="_blank">eosioshadows</a>
                </p>    
                <p>
                  合约地址： <a href="https://eospark.com/MainNet/contract/eosioshadows" target="_blank">https://eospark.com/...eosioshadows</a>
                </p> 
                <p>
                  开源代码： <a href="https://eospark.com/MainNet/contract/eosioshadows" target="_blank">https://eospark.com/...eosioshadows</a>
                </p>   
           
           </div>    
       </div>   
    
       <div class="footer">
           <p>
                友情合作伙伴
                <br>
                <a href="https://www.mytokenpocket.vip/" target="_blank"><img src="https://img.alicdn.com/tfs/TB1AoDWjxjaK1RjSZKzXXXVwXXa-300-55.png" width="150"></a>&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="https://meet.one" target="_blank"><img src="https://img.alicdn.com/tfs/TB1LYfxjr2pK1RjSZFsXXaNlXXa-200-55.png" width="150"></a>&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="https://more.top" target="_blank"><img src="https://img.alicdn.com/tfs/TB1UEYCjAvoK1RjSZFwXXciCFXa-200-55.png" width="150"></a>&nbsp;&nbsp;&nbsp;&nbsp;
                <a href="http://www.mathwallet.org" target="_blank"><img src="https://img.alicdn.com/tfs/TB1E4PBjrrpK1RjSZTEXXcWAVXa-150-46.png" width="150"></a>
            </p>
            <p>请加入我们的官方电报群沟通交流</p>
            <p><img src="https://img.alicdn.com/tfs/TB1kWjCjCrqK1RjSZK9XXXyypXa-434-434.jpg" width="100"></p>
            <p>2018@柠檬游戏团队</p>
       </div>  
   </div>
</template>
<script >
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
} from '../../services/web_wallet_service.js'
import store from '../../store'
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
           return store.state.HomeStore.account_name
        },
    },
    methods: {
      login: async function(event) {
        let res = await login();
        if (res) {
          store.commit('setAccount',res.name)
        }
       },
    }
}
</script>
<style >
 .home-you-token-container {
     padding: 50px 0;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: #f7f8fa;
 }
 .token-name {
     margin-bottom: 60px;
     color: #000;
     font-size: 40px;
 }
 .buy-box {
     margin-left: 20px;
     margin-right: 20px;
 }
 .divider-content {
     width: 100px;
     height: 100px;
     display: flex;
     background-color:#f7f8fa; 
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
.partner-info {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding: 50px;
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
.len-partner-title {
    color:#000;
    text-align: center;
    border-bottom: 2px solid rgb(153,153,153);
    font-size:35px;
    width: 200px;
    margin-top: 10px;
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
    margin-top:30px;
    padding-top: 30px; 
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    text-align: center;
    flex-direction: column;
    padding-bottom: 20px;
    background-color: #212322;
    color: #fff;
}

.footer p {
    margin-bottom: 20px;
}

.len-security {
   display: flex;
   width: 100%;
   background-color: #ffffff;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   padding-left: 80px;
   padding-right: 80px;
}
.len-security-title {
    color:#000;
    text-align: center;
    border-bottom: 2px solid rgb(153,153,153);
    font-size:35px;
    width: 200px;
    margin-top: 10px;
}
.adt-grids {
    margin-top: 50px;
}
.len-security h3{
    text-transform: uppercase;
    font-weight: 700;
    font-size: 30px;
    line-height: 1.4em;
    margin-bottom: 30px;
    color: #444;
    margin-top: 50px;
    text-align: center;
}
.len-security h4 {
    color: #222;
    font-size: 24px;
}

.len-security p {
    margin-bottom: 30px;
}
.text-center {
    text-align: center;
}

</style>