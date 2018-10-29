<template>
    <div class="land-len-security" id="rule">
         <div class="touzhu-table" id="touzhu-table">
               <h3 class="security-title ">
                    投注风云榜
                </h3>    
              <el-table   :data="getTableRows" >
                  <el-table-column prop="logtime" label="时间">
                  </el-table-column>
                  <el-table-column prop="player" label="玩家">
                  </el-table-column>
                  <el-table-column prop="amount" label="金额" >
                  </el-table-column>
                  <el-table-column prop="type" label="投注情况" >
                 </el-table-column>
              </el-table>
          </div>
           <span class="land-len-security-title">游戏规则</span>
           <div class="land-adt_grids">
        
                <h3 class="land-security-title text-center">EOS大地主游戏玩法</h3>
                <h4>一、玩法介绍 </h4>
                <p>
                    游戏板块为145格大小的地图，每一格代表一块地皮，每块地皮初始定价 1eos，其中有2块为黑地皮（作用下面解析）；
                </p>  
                <p>
                    玩家自定金额下注买地，系统随机一块地皮进行购买判断；投注的金额大于实际买入金额，转入游戏内余额，可随时提现
                </p>   
                <p>
                    每轮游戏初定2天,投注不增加结束时长
                </p>     
                <p>
                    最低投标金额为全场地皮最低标价
                </p>    
                <h4>二、中标情况</h4>
                <p>
                   升级成功：投标地皮为买家自身地皮，若投注金额大于等于地皮标价，则免费升级地皮，地皮标价翻倍；
                </p> 
                <p>
                  升级失败：投标地皮为买家自身地皮，若投注金额小于地皮标价，升级地皮失败，但不扣除任何费用；
                </p> 
                <p> 
                  买入成功：买家投标金额大于等于地皮标价，买家买入该地皮成功，扣除买家地皮标价有效费用（剩余金额进入买家余额），地皮标价翻倍，地皮拥有者变更为买家； 
                </p>  
                <p>
                  买入失败：买家投标金额小于地皮标价，买家买入地皮失败，扣除买家相对于中标地皮标价金额的50%有效费用（不足则全扣），地皮拥有者不变。
                </p>          
                <h4>
                    三、有效费用分配
                </h4>    
                <p>
                   65%——原地皮持有者（买入成功，原地皮持有者获利30%出场；买入失败，原地皮拥有者获取该利润）；
                </p>
                <p>
                   18%——累计奖池； 
                </p>
                <p>
                  9%——计入token池，一半增发token赠送给玩家，另外一半增值币价(详情参考token发行规则)。   
                </p>    
                <p>
                  6%——官方游戏开发运营费用。  
                </p>     
                <p>
                  2%——邀请人永久奖励   
                </p>       
                <h4>
                    四、游戏结束
                </h4>    
                <p>
                   结束时，最终持有2块黑地皮的玩家均分累计奖池金额；
                </p>
                <h3 class="land-security-title ">
                    EOS 国土无双智能合约
                </h3>    
               
                <p>
                  合约账号：<a href="" target="_blank">firelandgame</a>
                </p>    
                <p>
                  合约地址： <a href="https://eospark.com/MainNet/contract/firelandgame" target="_blank">https://eospark.com/...firelandgame</a>
                </p> 
           </div>  
         
          <div class="land-footer">
           <p class="land-footer-title">
                友情合作伙伴
                <br/> <br/>
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
<script>
import store from '../../../store'
const rule = "## 游戏介绍\n" +
                "### 玩法\n" +
                "* 游戏板块为20×20的地图，每一格代表一块地皮，每块地皮初始定价0.5eos，其中有2块为黑地皮没定价（作用下面解析）；\n" +
                "* 玩家自定金额下注买地，系统随机一块地皮进行购买判断；\n" +
                "* 每轮游戏初定3天，用户投注不增加游戏结束时间\n" +
                "### 购买判断：\n" +
                "* 情况1、地皮为黑地皮，获取jackpot奖池奖励；\n" +
                "* 情况2、地皮为玩家自身地皮，玩家扣除20%地皮标价手续费升级该地皮（地皮标价翻倍）；\n" +
                "* 情况3、玩家下注金额大于等于地皮标价，玩家按照地皮标价买入该地皮，地皮标价翻倍，买入金额扣除25%手续费后归原地皮拥有者所有；\n" +
                "* 情况4、玩家下注金额小于地皮标价，地皮买入失败，且扣除玩家下注金额30%作过路费，过路费扣除50%手续费后归地皮持有者所有。\n" +
                "### 黑地皮作用：\n" +
                "* 获取jackpot奖池一半奖金。\n" +
                "### 游戏结束\n" +
                "* 持有地皮数量最多的玩家，获得jackpot及累计奖池的所有奖金；\n" +
                "* 前十名累计下注玩家，获取下轮游戏的10个广告位。"
export default {
    ready() {
    },
    data() {
      return {
        rule: rule,
        border:false
      }
    },
    computed: {
        getTableRows() {
            return store.state.LandStore.touzhuRows
        }
    },
    methods: {

    }
}
</script>
<style>
.land-len-security {
   display: flex;
   width: 100%;
   flex-direction: column;
  
   align-items: center;
   padding-left: 20px;
   padding-right: 20px;
   margin-top:30px;
}
.land-len-security-title {
    color:#fff;
    text-align: center;
    border-bottom: 2px solid rgb(153,153,153);
    font-size:40px;
    width: 200px;
    margin-top: 10px;
}
.land-adt-grids {
    margin-top: 50px;
}
.land-len-security h3{
    text-transform: uppercase;
    font-weight: 700;
    font-size: 19px;
    line-height: 1.4em;
    margin-bottom: 30px;
    color: #fff;
    margin-top: 50px;
    text-align: center;
}
.land-len-security h4 {
    color: #fff;
    font-size: 16px;
}

.land-len-security p {
    margin-bottom: 30px;
    color: #fff;
    font-size: 14px;
}
.text-center {
    text-align: center;
}
.land-footer {
    margin-top:30px;
    padding-top: 30px; 
    display: flex;
    width: 120%;
    justify-content: center;
    text-align: center;
    flex-direction: column;
    padding-bottom: 20px;
    color: #fff;
}

.land-footer p {
    margin-bottom: 20px;
}
.land-footer-title {
   font-size: 34px;
}
.touzhu-table {

    margin-left: 20px;
    margin-right: 20px;
    width: 100%;

}
.bet-table {
     background-color: #212528 !important;
}
.el-table {
background-color: #eee !important;
}

</style>