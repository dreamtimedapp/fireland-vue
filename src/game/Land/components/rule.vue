<template>
    <div class="land-len-security" >
         <div class="touzhu-table" id="touzhu-table">
               <h3 class="security-title ">
                    投注风云榜
                </h3>    
              <el-table  :default-sort = "{prop: 'logtime', order: 'descending'}" class="bet-table" :data="landInfo.touzhuRows" >
                  <el-table-column 
                  sortable
                  prop="logtime" label="时间">
                  </el-table-column>
                  <el-table-column prop="player" label="玩家">
                  </el-table-column>
                  <el-table-column prop="amount" label="当前赢得金额" >
                  </el-table-column>
                  <el-table-column prop="type" label="投注情况" >
                    <template slot-scope="scope">
                        <span class="table-value"> {{ scope.row.type }}</span>
                    </template>
                 </el-table-column>
              </el-table>
          </div>
       </div>   
</template>
<script>
import store from '../../../store'
import {formatDate} from '../../../utils/utils.js'
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
    props: ['game','landInfo','balance','account'],
    data() {
      return {
        rule: rule,
        border:false
      }
    },
    methods: {
      formatter(row, column) {
          debugger
        return formatDate(row.logtime);
      }
    }
}
</script>
<style>
.land-len-security {
   display: flex;
   width: 730px;
   flex-direction: column;
   align-items: center;
   margin-top:0px;
   border-radius: 25px;
}
.table-value {
    color: #F56C6C
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
    font-size: 30px;
    line-height: 1.4em;
    margin-bottom: 30px;
    color: #fff;
    margin-top: 50px;
    text-align: center;
}
.land-len-security h4 {
    color: #fff;
    font-size: 26px;
}

.land-len-security p {
    margin-bottom: 30px;
    color: #fff;
    font-size: 24px;
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
   font-size: 35px;
}
.bet-table {
    border-radius: 15px;
}
.touzhu-table {
    border-radius: 25px;
    margin-left: 20px;
    margin-right: 20px;
    width: 100%;

}
.land-footer-partner-title {
    font-size: 30px;
}
.bet-table {
     background-color: #212528 !important;
}
.el-table {
background-color: #eee !important;
}

</style>