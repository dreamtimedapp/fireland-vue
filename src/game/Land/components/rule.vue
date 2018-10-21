<template>
    <div class="land-len-security">
           <span class="land-len-security-title">游戏规则</span>
           <div class="land-adt_grids">
        
                <h3 class="land-security-title text-center">EOS大地主游戏玩法</h3>
                <h4>一、玩法介绍 </h4>
                <p>
                    游戏板块为20×20的地图，每一格代表一块地皮，每块地皮初始定价0.5eos，其中有2块为黑地皮没定价（作用下面解析）；
                </p>  
                <p>
                    玩家自定金额下注买地，系统随机一块地皮进行购买判断；
                </p>   
                <p>
                    每轮游戏初定3天
                </p>     
                <h4>二、购买判断</h4>
                <p>
                   情况1：地皮为黑地皮，获取jackpot奖池奖励；
                </p> 
                <p>
                    情况2：地皮为玩家自身地皮，玩家扣除20%地皮标价手续费升级该地皮（地皮标价翻倍）；
                </p> 
                <p> 
                   情况3：玩家下注金额大于等于地皮标价，玩家按照地皮标价买入该地皮，地皮标价翻倍，买入金额扣除25%手续费后归原地皮拥有者所有； 
                </p>  
                <p>
                    情况4：玩家下注金额小于地皮标价，地皮买入失败，且扣除玩家下注金额30%作过路费，过路费扣除50%手续费后归地皮持有者所有。
                </p>          
                <h4>
                    三、黑地皮作用 
                </h4>    
                <p>
                    获取jackpot奖池一半奖金。
                </p>
                <h4>
                    四、游戏结束
                </h4>    
                <p>
                   持有地皮数量最多的玩家，获得jackpot及累计奖池的所有奖金；
                </p>
                <h3 class="land-security-title ">
                    EOS大地主智能合约
                </h3>    
               
                <p>
                  合约账号：<a href="" target="_blank">eosioshadows</a>
                </p>    
                <p>
                  合约地址： <a href="https://eospark.com/MainNet/contract/eosioshadows" target="_blank">https://eospark.com/...eosioshadows</a>
                </p> 
           </div>  
          <div class="touzhu-table">
               <h3 class="security-title ">
                    当前投注榜
                </h3>    
              <el-table   :data="tableData" >
                  <el-table-column  prop="play" label="玩家">
                  </el-table-column>
                  <el-table-column   prop="balance" label="金额" >
                  </el-table-column>
                  <el-table-column prop="memo" label="宣言" >
                 </el-table-column>
              </el-table>
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
const rule = "## 游戏介绍\n" +
                "### 玩法\n" +
                "* 游戏板块为20×20的地图，每一格代表一块地皮，每块地皮初始定价0.5eos，其中有2块为黑地皮没定价（作用下面解析）；\n" +
                "* 玩家自定金额下注买地，系统随机一块地皮进行购买判断；\n" +
                "* 每轮游戏初定3天\n" +
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
        border:false,
        tableData: [{
            play: '2016-05-02',
            balance: '王小虎',
            memo: '上海市普陀区金沙江路 1518 弄'
          }, {
            play: '2016-05-04',
            balance: '王小虎',
            memo: '上海市普陀区金沙江路 1517 弄'
          }, {
            play: '2016-05-01',
            balance: '王小虎',
            memo: '上海市普陀区金沙江路 1519 弄'
          }, {
            play: '2016-05-03',
            balance: '王小虎',
            memo: '上海市普陀区金沙江路 1516 弄'
          }]
      }
    },
    computed: {
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
   padding-left: 80px;
   padding-right: 80px;
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
    font-size: 38px;
    line-height: 1.4em;
    margin-bottom: 30px;
    color: #fff;
    margin-top: 50px;
    text-align: center;
}
.land-len-security h4 {
    color: #fff;
    font-size: 32px;
}

.land-len-security p {
    margin-bottom: 30px;
    color: #fff;
    font-size: 28px;
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

    margin-left: 50px;
    margin-right: 50px;
    width: 100%;

}
.bet-table {
     background-color: #212528 !important;
}
.el-table {
background-color: #eee !important;
}

</style>