<template>
   <div class="home-you-token-container">
       <div class="token-name">
           <span>柠檬通证 len</span>
       </div>    
       <div class="buy-box">
          <el-row >
              <el-col :xs="24" :md="11"> 
                <div class="buy-token">
                    <el-input placeholder="请输入内容" v-model="buyAmount">
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
                    <el-input placeholder="请输入内容" v-model="sellAmount">
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
                            <div v-if="getAccount" style="float: left; padding: 3px 0" type="text" >{{$store.state.HomeStore.home_account_name}}</div>
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
           <p class="home-foot-title">
                友情合作伙伴
                <br/><br/>
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
            "1. 发行量1000万，对标资金蓄池；\n" +
                "2. token价格由资金蓄池金额和释放量决定：token价格＝资金蓄池eos额÷token总释放量；\n" +
                "3. 初始发行价0.001eos一个，团队存入1000eos，保留100万token量且锁仓。\n" +
                "4. token设有最大释放量，最大释放量随着游戏的进程而增大；且增发的token发放给游戏玩家(具体请参考游戏规则)；\n" +
                "5. token可以自由与资金蓄池进行买卖,买入没手续费，不得超过最大可对换量(最大可兑换量＝最大释放量-流通量) \n" +
                "6. 卖出收取10%手续费，手续费将存入token增值池.token增值池资金，每天24点存入资金蓄池，且不增发token。存入资金蓄池后，token价格按第2点重新计算价格。\n" +
                "7. token增值池资金来源：卖出手续费及游戏分红(具体请参考游戏规则)。资金蓄池资金，以后将会开发相关理财功能，例如cpu bank、借贷等。所获取的利润将发放到增值池，提升币价。"
export default {
    ready() {
    },
    data() {
      return {
        rule: rule,
        eos_balance:'',
        buyAmount:'',
        sellAmount:''
      }
    },
    computed: {
        getAccount() {
           return store.state.HomeStore.home_account_name
        },
    },
    methods: {
      login: async function(event) {
        let res = await login();
        if (res) {
          store.commit('setHomeAccount',res.name)
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
   width: 100%;
   background-color: #2b3137;
   flex-direction: column;
   padding-left: 40px;
   padding-right: 40px;
   color: #fff;
   margin-top: 50px;
}
.len-title {
    font-size: 28px;
    color: #fff;
    margin-top: 30px;
    text-align: center;
}
.len-info {

    font-size:25px;
    margin-top:20px;
}

.footer {
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
    font-size:38px;
    width: 200px;
    margin-top: 15px;
}
.adt-grids {
    margin-top: 50px;
}
.len-security h3{
    text-transform: uppercase;
    font-weight: 700;
    font-size: 35px;
    line-height: 1.4em;
    margin-bottom: 30px;
    color: #444;
    margin-top: 50px;
    text-align: center;
}
.len-security h4 {
    color: #222;
    font-size: 35px;
}

.len-security p {
    margin-bottom: 30px;
    font-size: 28px;
}

.len-introduce-title {
    color:#fff;
    text-align: center;
    border-bottom: 2px solid rgb(153,153,153);
    font-size:35px;
    width: 400px;
    margin-top: 10px;
}

.len-introduce h3 {
    text-transform: uppercase;
    font-weight: 700;
    font-size: 30px;
    line-height: 1.4em;
    margin-bottom: 30px;
    color: #fff;
    margin-top: 50px;
    text-align: center;
 }
 .home-foot-title {
     font-size: 40px;
 }

 .len-introduce h4 {
    color: #fff;
    font-size: 24px;
 }
 .len-introduce p {
     margin-bottom: 30px;
 }
.text-center {
    text-align: center;
}

</style>