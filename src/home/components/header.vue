<template>
   <div class="box">
    <div class="header-container"> 
      <b-img class="logo" src="https://img.alicdn.com/tfs/TB1HrKSjXzqK1RjSZFvXXcB7VXa-2000-2000.png" /> 
      <div class="header-nav">
            <b-link class="text">柠檬通证(len)</b-link>
            <b-link class="text">开源代码</b-link>
            <b-link class="text">团队介绍</b-link>
            <el-button class="login-button" type="primary" >登录(EOS)账户</el-button>
      </div>
    </div>
    <div class="text-center bg-dark">
        <div class="banner-container">
            <el-row>
            </el-row>    
        </div>
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
.box {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.header-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 150px;
    background: #ffffff;
    justify-content: space-between;
    min-width: 750px;
}
.header-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 100px;
}
.banner {
    width: 100%;
    height: 200px;
    background-color: #333;
}
.logo {
    width: 200px;
    height: 200px;
    margin-left: 80px;
}
.text {
    text-align: center;
    height: 40px;
    font-size:30px;
    color: #000; 
    margin-left: 45px;
}
.login-button {
    margin-left: 60px;
    margin-right: 60px;
}
.banner-item {
    display: flex;
    justify-content: center;
    align-items: center;
}
.bg-dark {
    background: #343a40
}
.text-center {
    text-align: center;
}
.banner-container {
   color: #333;
   padding:40px 20px 20px;
   text-align: left
}

</style>