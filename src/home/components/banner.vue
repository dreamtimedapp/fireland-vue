<template>
    <div class="home-banner-carousel-item">
        <el-carousel :autoplay="true" indicator-position="none">
            <el-carousel-item > 
                    <el-row class="home-alignment" :type="flex" :justify="center">
                      <el-col :xs="24" :sm="24" :md="12" :lg="12">
                        <div class="features-info">
                          <div class="home-asset-pool">
                            <router-link to="game/land"  class="home-alignment">
                            <el-row class="home-alignment">
                             <el-col :span="10" class="home-alignment"><span>当前资金池: {{$store.state.HomeStore.cash_pool}}</span></el-col>
                             <el-col :span="4"><div class="home-mining  home-separation">挖矿</div></el-col>
                             <el-col :span="10" class="home-alignment  home-separation-left"><span>LEN当前价格: {{$store.state.HomeStore.price}}</span></el-col>
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
                              <p class="card-subtitle">
                                  <span>
                                      游戏即挖矿 + 持币增值 + 邀请奖励
                                  </span>
                              </p>
                          <div class="card-text home-game-countdown">
                            <span>{{gameStateInfo}}</span>
                            <countdown :time="getCountTime">
                            <template slot-scope="props">
                              {{ props.days }} 天 {{ props.hours }} 小时 {{ props.minutes }} 分 {{ props.seconds }} 秒
                            </template>
                            </countdown>
                            <span>本轮奖池金额：{{$store.state.LandStore.poolBalace}}</span>
                            <span>最高土地价格：{{$store.state.LandStore.maxPrice}} EOS</span>
                            <span>最低土地价格：{{$store.state.LandStore.minPrice}} EOS</span>
                          </div> 
                            </div>
                            </router-link>
                      </el-col>      
                    </el-row>    
            </el-carousel-item>
            <el-carousel-item>
                <el-col :xs="24" :sm="12" :md="24" :lg="11">
                   <router-link to="game/land" class="card bg-dark text-white hidden-sm-only">
                    <img class="card-img" src="https://gw.alicdn.com/tfs/TB15HQskgDqK1RjSZSyXXaxEVXa-3840-2160.jpg" style="min-height: 100px;">
                    <div class="card-img-overlay">
                        <h5 class="card-title">
                          <span class="qll4MVPb7tVWufSoh90Yb">EOS大地主</span>
                        </h5>
                        <p class="card-subtitle">
                          <span>
                            游戏即挖矿 + 持币增值 + 邀请奖励
                          </span>
                        </p>
                        <div class="card-text home-game-countdown">
                            <span>{{gameStateInfo}}</span>
                            <countdown :time="getCountTime">
                            <template slot-scope="props">
                              {{ props.days }} 天 {{ props.hours }} 小时 {{ props.minutes }} 分 {{ props.seconds }} 秒
                            </template>
                            </countdown>
                            <span>本轮奖池金额：{{$store.state.LandStore.poolBalace}}</span>
                            <span>最高土地价格：{{$store.state.LandStore.maxPrice}} EOS</span>
                            <span>最低土地价格：{{$store.state.LandStore.minPrice}} EOS</span>
                        </div> 
                    </div>
                   </router-link>
                </el-col>
                <el-col :xs="0" :sm="12" :md="11" :lg="11">
                     <router-link to="/" class="card bg-dark text-white">
                          <img class="card-img" src="https://gw.alicdn.com/tfs/TB1MY.CkmzqK1RjSZFHXXb3CpXa-760-366.jpg" style="min-height: 100px;">
                      </router-link>
                </el-col> 
            </el-carousel-item>
         </el-carousel>
    </div>
</template>
<script>

import store from '../../store'
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
    get_len_token_info,
    get_len_balance_bytable,
    get_len_balance
} from '../../services/web_wallet_service.js'
import { setInterval, setTimeout } from 'timers';

export default {
  name: 'banner',
  components: {
  },
  props: {},
  data: function() {
    return {
      account_name: '',
      eos_balance:'',
      gameStateInfo:''
    }
  },
  mounted: function() {
    setTimeout(this.initGame,700);
  },
  computed: {
    getCountTime:function() {
      return  store.state.LandStore.gameCount
    },
  },
  methods: {
    async initGame () {
        let counterlist = await get_gameInfo_list()
        if (!counterlist.is_error) {
            store.commit('getGameInfo',counterlist.data.rows[0])
        } 
        let state = store.state.LandStore.gameState;
        if (state == 0) {
          this.gameStateInfo = "距离开始还有："
         } else if (state == 1) {
           this.gameStateInfo = "距离结束还有："
         } else if (state == 2) {
           this.gameStateInfo  = "游戏暂未开始，请稍后"
        }
    },
  }
}
</script>

</script>
<style scoped>

.home-alignment {
  justify-content: center;
  align-items: center;
  display: flex;
  text-align: center;
}
.home-game-countdown {
  display: flex;
  line-height: 25px;
  margin-left: 40px;
  background-color: #409EFF;
  border-radius: 25px;
  padding-top:20px;
  padding-bottom: 20px;
  justify-content: flex-start;
  padding-left: 0px;
  flex-direction: column;
  color: #fff;
  margin-top: 20px;
  width: 480px;
}
.home-game-countdown  span {
  margin-left: -30px;
  margin-top:8px;
}
.home-separation {
  margin-left: 20px;
  margin-right: 20px;
}

.home-separation-left {
  margin-left: 40px;
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
  padding-left: 10px;
  padding-right: 10px;
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
    top:10;
    right: 10;
    bottom: 10;
    left: 10;
    padding: 20px;
}
.card-title {
    font-size: 40px;
    padding-left: 40px;
    padding-top: 20px;
    margin-bottom: 0px;
   
}

.card-subtitle {
  padding: 1px;
  line-height: 100%;
  font-size: 30px;
  padding-left: 40px;
  margin-top: 10px;
}

.card-title  span{
    padding: 1px;
    line-height: 100%;
}
.card-text {
    margin-bottom: 0;
    padding-left: 40px;
    font-size: 30px;
  
}
.card-text span{
    padding: 1px;

    line-height: 100%;
}


</style>
