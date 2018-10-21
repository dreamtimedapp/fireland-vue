<template>
   <div class="box">
    <div class="header-container"> 
      <b-img class="logo" src="https://img.alicdn.com/tfs/TB1HrKSjXzqK1RjSZFvXXcB7VXa-2000-2000.png" /> 
      <div class="header-left">
      <div class="header-nav hidden-xs-only hidden-sm-only ">
          <b-link class="text">柠檬通证(len)</b-link>
          <b-link class="text">开源代码</b-link>
          <b-link class="text">团队介绍</b-link>
           <b-link class="text">验证安全</b-link>
      </div>
      <el-button class="login-button" type="primary" >登录(EOS)账户</el-button>
      </div>
    </div>
    <div class="text-center bg-dark">
        <div >
            <el-row>
                <el-col :xs="24" :md="12"> 
                   <div class="features-text">
                     <img class="features-img" src="http://www.eosbao.io/images/chart.png"/>
                     <h5 class="features-title">奖励分配</h5>
                     <p><strong>资金储备:</strong><span>每key销售的50%进入资金储备用Bancor对KEY定价</span></p>
                     <p><strong>推荐奖励:</strong><span>每KEY销售的5%贡献给2个上级推广人</span></p>
                     <p><strong>权重奖励:</strong><span>每KEY销售的5%贡献给2个上级推广人</span></p>
                     <p><strong>研发消耗:</strong><span>每KEY销售的5%贡献给2个上级推广人</span></p>
                     <p><strong>分红奖池:</strong><span>每KEY销售的20%进入分红奖池，每30分钟按持KEY比例分红</span></p>
                   </div>    
                </el-col>
                <el-col :xs="24" :md="12">
                    <div class="features-game-center">
                      <div class="card bg-dark text-white">
                          <img class="card-img" src="https://youbao.io/static/media/sail2.4a6f0ad2.png" style="min-height: 100px;">
                          <div class="card-img-overlay">
                              <h5 class="card-title">
                                <span class="qll4MVPb7tVWufSoh90Yb">大宇宙时代</span>
                              </h5>
                              <p class="card-text">
                                  <span class="qll4MVPb7tVWufSoh90Yb">
                                      每轮赚 10% + 最后大奖 + 邀请奖励
                                  </span>
                              </p>
                            </div>
                        </div>
                      <div class="card bg-dark text-white"><img class="card-img" src="https://youbao.io/static/media/sail2.4a6f0ad2.png" style="min-height: 100px;"><div class="card-img-overlay"><h5 class="card-title"><span class="qll4MVPb7tVWufSoh90Yb">大宇宙时代</span></h5><p class="card-text"><span class="qll4MVPb7tVWufSoh90Yb">每轮赚 10% + 最后大奖 + 邀请奖励</span></p></div></div>
                   </div>   
                </el-col>    
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
    min-width: 700px;
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
    min-width: 750px;
    justify-content: space-between;
   
}
.header-left {
    float: right;
    display: flex;
    align-items: center;
    flex-direction: row;
}
.header-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
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
    background: #fff;
}

.features-text {
    display: flex;
    justify-content: flex-start;
    flex-direction: column;
    padding: 50px;
    
}
.features-img {
    width: 100%;
}
.features-title{
  color: #ffffff;
  font-size: 34px;
  margin-top: 10px;
}
.features-text p{
    color:#00bcd4;
    line-height: 1.9em;
    margin: 1em 0;
    font-size:1em;
    text-align: left
}
.features-text p strong {
    color: #f4b04f;
}

.card {
    height:100%;
    margin-top: 50px;
    margin-bottom: 30px;
    padding-left:60px; 
    padding-right:60px; 
    color: #fff;
    background-color: #343a40;
    position: relative;
    display: flex;
    flex-direction: column;
    text-align: left;
    min-width: 0;
    background-clip:border-box;
    border: 0px solid rgba(0,0,0,.125); 
    border-radius:.25rem;
}
.card-img {
   width: 100%;
   border-radius: calc(.2rem -1px)
}
.card-img img {
    vertical-align: middle;
    border-style: none;
}
.card-img-overlay {
    position: absolute;
    top:0;
    right: 0;
    bottom: 0;
    left: 0;
    padding: 20px;
}
.card-title {
    font-size: 40px;
    line-height: 1.2;
    padding-left: 56px;
    padding-top: 40px;
}
.card-title  span{
    background: rgba(0, 0, 0, 0.5);
    padding: 1px;
    line-height: 100%;
  
}
.card-text {
    margin-bottom: 0;
     padding-left: 56px;
}
.card-text span{
     background: rgba(0, 0, 0, 0.5);
    padding: 1px;
    line-height: 100%;
    
}
</style>