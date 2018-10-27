<template>
    <div class="home-banner-carousel-item">
        <el-carousel indicator-position="none">
            <el-carousel-item > 
                    <el-row class="home-alignment" :type="flex" :justify="center">
                      <el-col :xs="24" :sm="24" :md="12" :lg="12">
                        <div class="features-info">
                          <div class="home-asset-pool">
                            <router-link to="game/land"  class="home-alignment">
                            <el-row class="home-alignment">
                             <el-col :span="10" class="home-alignment"><span>当前资金池:<br> 1000 EOS</span></el-col>
                             <el-col :span="4"><div class="home-mining">挖矿</div></el-col>
                             <el-col :span="10" class="home-alignment"><span>LEN价格: 0.05 EOS/LEN</span></el-col>
                            </el-row>
                            </router-link>
                          </div>  
                          <p><strong>发行方式：</strong><span>柠檬通证(LEN)采用价格瞄定资产的发行模型，价格 = 资产池 / 发行总量，买入卖出价格均增长，卖出收取10%手续费用于提高币价，为保护游戏玩家利益，暂不开放合约买入</span></p>
                          <p><strong>资金储备：</strong><span>游戏的9%用于资金池，其中4.5%用于提高币价，4.5%用于增发token</span></p>
                          <p><strong>推荐奖励：</strong><span>游戏的1.2%永久贡献给1个上级推广人</span></p>
                          <p><strong>研发消耗：</strong><span>游戏的3.2%用于研发消耗</span></p>
                          <p><strong>长期激励：</strong><span>随着不断挖矿和持续的新游戏不断产出和进化，token长期具有升值空间</span></p>
                        </div>
                      </el-col> 
                      <el-col :xs="0" :sm="12" :md="12" :lg="12">
                       <router-link to="game/land" class="card bg-dark text-white hidden-sm-only">
                          <img class="card-img" src="https://gw.alicdn.com/tfs/TB15HQskgDqK1RjSZSyXXaxEVXa-3840-2160.jpg" style="min-height: 100px;">
                          <div class="card-img-overlay">
                              <h5 class="card-title">
                                <span class="qll4MVPb7tVWufSoh90Yb">EOS大地主</span>
                              </h5>
                              <p class="card-text">
                                  <span class="">
                                      游戏即挖矿 + 持币增值 + 邀请奖励
                                  </span>
                              </p>
                            </div>
                            </router-link>
                      </el-col>      
                    </el-row>    
            </el-carousel-item>
            <el-carousel-item>
                <el-col :xs="24" :sm="12" :md="11" :lg="11">
                   <router-link to="game/land" class="card bg-dark text-white hidden-sm-only">
                    <img class="card-img" src="https://gw.alicdn.com/tfs/TB15HQskgDqK1RjSZSyXXaxEVXa-3840-2160.jpg" style="min-height: 100px;">
                    <div class="card-img-overlay">
                        <h5 class="card-title">
                          <span class="qll4MVPb7tVWufSoh90Yb">EOS大地主</span>
                        </h5>
                        <p class="card-text">
                          <span class="">
                            游戏即挖矿 + 持币增值 + 邀请奖励
                          </span>
                        </p>
                    </div>
                   </router-link>
                </el-col>
                <el-col :xs="0" :sm="12" :md="111" :lg="11">
                     <router-link to="/" class="card bg-dark text-white">
                          <img class="card-img" src="https://gw.alicdn.com/tfs/TB1MY.CkmzqK1RjSZFHXXb3CpXa-760-366.jpg" style="min-height: 100px;">
                      </router-link>
                </el-col> 
            </el-carousel-item>
         </el-carousel>
    </div>
</template>

<style scoped>

.home-alignment {
  justify-content: center;
  align-items: center;
  display: flex;
  text-align: center;
}

.home-banner-carousel-item {
   background-color: #343a40;
   width: 100%;
   height: 100%;
   padding: 30px;
}

.home-banner-link {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.home-asset-pool {
  margin-top: 20px;

  width: 100%;
  border-radius: 25px;
  height: 200px;
  background: #ffffff;
  border-color: #f4b04f;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  display: flex;
  align-items: center;
  color: #F56C6C;
} 
.home-asset-pool span {
  font-size: 30px;
  padding-bottom: 0px;
  margin-bottom: 0px;
}
.home-mining {
  display: flex;
  width: 100px;
  height: 100px;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #409EFF;
  color: #ffffff;
  font-size: 30px;
}
.home-mining span {
  width: 80px;
  height: 80px;
  font-size: 20px;
  text-align: center;
}

.features-info {
    margin-top: 20px;
    margin-left: 20px;
    max-height: 500px;
}

.features-title{
  color: #ffffff;
  font-size: 34px;
  margin-top: 10px;
}
.features-info p{
    color:#00bcd4;
    margin: 5px 0;
    font-size:18px;
    text-align: left
}
.features-info p strong {
    color: #f4b04f;
}
.el-carousel__item {
    display: flex;
    justify-content: center;
    align-items: center;
}
.features-img {
  width: 100%;
}
.card {
    height: 500px;
    margin-top: 50px;
    padding-bottom: 30px;
    margin-left:60px; 
    margin-right:60px; 
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
   height: 100%;
   border-radius: calc(.2rem -1px);
    vertical-align: middle;
    border-style: none;
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
    padding-left: 70px;
    padding-top: 40px;
}
.card-title  span{
    padding: 1px;
    line-height: 100%;
}
.card-text {
    margin-bottom: 0;
    padding-left: 70px;
    font-size: 30px;
}
.card-text span{
    padding: 1px;
    line-height: 100%;
}


</style>
