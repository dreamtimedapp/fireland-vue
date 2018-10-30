<template>
    <div v-on:click="greet"  class="home-banner-carousel-item">
       <el-row>
            <el-col :xs="24" :sm="12" :md="12" :lg="12">
                   <router-link to="/" class="card bg-dark text-white hidden-sm-only">
                    <img  class="card-img" src="https://gw.alicdn.com/tfs/TB12sQ3lhnaK1RjSZFBXXcW7VXa-1378-1378.jpg" style="min-height: 100px;">
                    <div class="card-img-overlay"  >
                        <h5 class="card-title">
                          <span class="qll4MVPb7tVWufSoh90Yb">EOS 国土无双</span>
                        </h5>
                        <p class="card-subtitle">
                          <span>
                            游戏即挖矿 + 持币增值 + 邀请奖励
                          </span>
                        </p>
                        <div  class="card-subtitle">
                         <span>{{gameStateInfo}}</span><!--
                            <countdown :time="getCountTime">
                            <template slot-scope="props">
                            {{ props.days }} 天 {{ props.hours }} 小时 {{ props.minutes }} 分 {{ props.seconds }} 秒
                            </template>
                            </countdown>-->
                        </div> 
                       <!-- <span class="card-game-pool">本轮奖池金额： {{$store.state.LandStore.poolBalace}}</span> -->  
                    </div>
                   </router-link>
                </el-col>
                <el-col :xs="0" :sm="12" :md="12" :lg="12">
                     <router-link to="/" class="card bg-dark text-white">
                          <img class="card-img" src="https://gw.alicdn.com/tfs/TB1MY.CkmzqK1RjSZFHXXb3CpXa-760-366.jpg" style="min-height: 100px;">
                      </router-link>
                </el-col> 
       </el-row>  
         
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
     greet: function (event)  {
      alert('游戏挖矿将于11月1号正式开始')
    },
    async initGame () {
        let counterlist = await get_gameInfo_list()
        if (!counterlist.is_error) {
            store.commit('getGameInfo',counterlist.data.rows[0])
        } 
        let state = store.state.LandStore.gameState;
        this.gameStateInfo = "游戏挖矿将于11月1号20:00正式开始，签到即送首个价格瞄定资产机制社区通证"
        /*if (state == 0) {
          this.gameStateInfo = "距离开始还有："
         } else if (state == 1) {
           this.gameStateInfo = "距离结束还有："
         } else if (state == 2) {
           this.gameStateInfo  = "游戏暂未开始："
         }*/
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
  color: #fff;
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
    color: #fff;
   
}

.card-subtitle {
  padding: 1px;
  line-height: 100%;
  font-size: 20px;
  padding-left: 40px;
  margin-top: 20px;
  color: #fff;
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

.card-game-pool {
    padding-left: 40px;
    font-size: 20px;

}


</style>
