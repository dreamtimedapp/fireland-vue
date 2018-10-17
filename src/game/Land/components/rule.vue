<template>
    <div class="rulecontainer">  
        <span class="rule-title">游戏规则</span>
        <vue-markdown>{{rule}}</vue-markdown>
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
        rule: rule
      }
    },
    computed: {
    },
    methods: {

    }
}
</script>
<style>
.rulecontainer {
    width: 750px;
    min-height: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 40px;
    font-size: 30px;
}
.rule-title {
    font-size: 45px;
    
}
</style>