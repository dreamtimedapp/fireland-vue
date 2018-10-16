
<template>
  <div class="home">
    <div class="game-center" v-if="isGameShow">
      <div class="item-title">热门游戏</div>
      <div class="theme-list">
        <div class="theme-item"><i class="iconfont e-Shape"></i>

          <div class="title">如果古代人物可以穿越，项羽和吕布哪个强一点？10</div>
          <div class="num">4人参与</div>
        </div>
        <div class="theme-item"><i class="iconfont e-Shape"></i>

          <div class="title">孙悟空和二郎神谁强一点？9</div>
          <div class="num">4人参与</div>
        </div>
        <div class="theme-item"><i class="iconfont e-Shape"></i>

          <div class="title">人生应抬头仰望月亮？还是低头疲于便士？《月亮与六便士》8</div>
          <div class="num">13人参与</div>
        </div>
      </div>
      <div class="item-title">更多好玩</div>
      <div class="more-list">
        <a href="/lottery" class="game-item-one">
          <div class="title">EOS大地主</div>
          <div class="info"><span>人人都能当地主收租，开局一块地，装备全靠捡</span></div>
        </a>
      </div>
      <div class="more-list">
        <a href="/lottery" class="game-item-two">
          <div class="title">EOS一元夺宝(敬请期待)</div>
          <div class="info"><span>基于EOS合约的夺宝游戏</span></div>
        </a>
      </div>
        <div class="more-list">
        <a href="/lottery" class="game-item-three">
          <div class="title">神秘游戏(敬请期待)</div>
          <div class="info"><span>有一款来自未来的游戏，请查收</span></div>
        </a>
      </div>
    </div>

    <div class="game-center" v-if="isPersonalShow">
      <div class="user-info">
        <div class="avatar-box"><img src="../assets/head.png"></div>
        <div class="user-name">{{has_account}}</div>
      </div>
      <div class="eto-info">
        <div class="balance-title">余额</div>
        <div class="balance-value">{{has_balance}}</div>
        <div class="match-box">
          <div class="box-item">
            <div class="balance-title">拥有土地</div>
            <div class="item-value">0.0000</div>
          </div>
          <div class="box-item">
            <div class="balance-title">累积利润</div>
            <div class="item-value">0.0000</div>
          </div>
        </div>
      </div>
      <el-dialog
          title="邀请好友获得奖励"
          :visible.sync="invitedialogVisible"
          width="80%"
          :before-close="handleClose">
          <span>{{get_inviteUrl}}</span>
          <span slot="footer" class="dialog-footer">
          <el-button @click="invitedialogVisible = false">取消</el-button>
          <el-button type="primary" class="btn" data-clipboard-text="Just because you can doesn't mean you should — clipboard.js" @click="invitedialogVisible = false">复制</el-button>
          </span>
      </el-dialog>
      <el-card class="box-card tool-box" @click="test">
         <div class="settings-box" @click="invitedialogVisible = true">
            <span>我的邀请</span>
            <span>邀请好友享受投注的10%的奖励</span>
            <i class="el-icon-arrow-right"> </i>  
        </div> 
      </el-card> 
       <el-card class="box-card">
         <div class="settings-box">  
            <span>我的投注记录</span>
            <i class="el-icon-arrow-right"> </i>  
        </div> 
      </el-card> 
    </div>
    <div class="bottom-nav">
      <label class="nav-item" :class="{'active': tab === 'game'}" v-on:click="tabChange('game', $event)">
        <div class="content">
          <span>游戏中心</span></div>
      </label>
      <label class="nav-item" :class="{'active': tab === 'personal'}" v-on:click="tabChange('personal', $event)">
        <div class="content">
          <span>个人中心</span></div>
      </label>
    </div>
  </div>
</template>

<script>
  import store from '../data/store.js'
  import {getQueryString} from '../utils/utils.js'
  import {
    get_scatter_identity,
    login,
    transfer,
    recast,
    getBalance
  } from '../services/web_wallet_service.js'
import { exists } from 'fs';
import Clipboard from 'clipboard';

  export default {
    name: 'Home',
    data: function() {
      return {
        account_name:'',
        eos_balance:0,
        tab: 'game',
        invitedialogVisible:false,
        inviteUrl:'http://127.0.0.1?ref=',
      }
    },
    mounted: function() {
      if (this.has_scatter) {
        this.getAccountName();
      }
    },
    components: {
    },
    computed: {
      isGameShow: function() {
        return (this.tab === 'game');
      },
      isPersonalShow: function() {
        return (this.tab === 'personal');
      },
      has_scatter: function() {
        return store.state.global_config.has_scatter;
      },
      has_account: function() {
        if (this.account_name) {
          return this.account_name
        } else {
          return this.getAccountName()
        }
      },
      has_balance:function() {
        if (this.eos_balance) {
          return this.eos_balance
        } else {
          return this.getBalance()
        }
      },
      get_inviteUrl:function() {
        return this.inviteUrl + getQueryString('ref')
      }
    },
    methods: {
      test: function() {
        
      },
      tabChange: function(tab) {
        if (tab !== this.tab) {
          this.tab = tab;
        }
      },
      async getAccountName () {
          let res = await get_scatter_identity();
          if(res.is_error){
            this.account_name = '';
          }else{
            this.account_name = res.data.account_name  
          }
          return res.data.account_name
      },
      async getBalance() {
         let res = await getBalance();
         if (res) {
            this.eos_balance = res[0]
         } else {
            this.eos_balance = 0
         }
      },
      handleClose(done) {
         const clipboard = new Clipboard('.btn',{
          text: function(trigger) {
              return 'text';
           }
          });
      },
     
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
  .home {
    width: 100%;
  }
  .game-center {
    width: 710px;
    margin: 0 auto;
    padding: 0 20px 140px;
  }
  .item-title {
    font-size: 32px;
    padding-top: 40px;
  }
  .theme-list {
    margin-top: .133333rem;
    padding: 23px 0 23px 30px;
    background: #fff;
    box-shadow: 0 6px 8px 0 rgba(0,0,0,.05);
    border-radius: 5px;
  }
  .more-list {
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
 
  .game-item-one {
    background-size: contain;
    background-color: #409EFF;
    display: block;
    text-decoration: none;
    width: 100%;
    height: 200px;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  .game-item-one .title {
    font-size: 32px;
    color: #fff;
    margin-top: 40px;
    padding-left: 30px;
  }
  .game-item-one .info {
    margin-top: 6px;
    color: hsla(0,0%,100%,.6);
    font-size: 26px;
    padding-left: 30px;
  }

  .game-item-two {
  
    background-size: contain;
    background-color: #67c23a;
    display: block;
    text-decoration: none;
    width: 100%;
    height: 200px;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  .game-item-two .title {
    font-size: 32px;
    color: #fff;
    margin-top: 40px;
    padding-left: 30px;
  }
  .game-item-two .info {
    margin-top: 6px;
    color: hsla(0,0%,100%,.6);
    font-size: 26px;
    padding-left: 30px;
  }
  .game-item-three {
    background-size: contain;
    background-color: #F56C6C;
    display: block;
    text-decoration: none;
    width: 100%;
    height: 200px;
    border-radius: 5px;
    margin-bottom: 20px;
  }

  .game-item-three .title {
    font-size: 32px;
    color: #fff;
    margin-top: 40px;
    padding-left: 30px;
  }
  .game-item-three .info {
    margin-top: 6px;
    color: hsla(0,0%,100%,.6);
    font-size: 26px;
    padding-left: 30px;
  }
  .icon-set {
    width: 20px;
    height: 20px;
  }

  .personal {
     width: 710px;
     margin: 0 auto;
     padding: 0 20px 140px;
  }
  .user-info {
    display: flex;
    align-items: center;
    padding-top:10px;
  }
  .user-name {
    font-size: 56px;
    margin-left: 12px;
  }
  .avatar-box {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    border: 2px solid #dfdfdf;
    overflow: hidden;
  }
  .avatar-box img {
    display: block;
    width: 100%;
  }

  .eto-info {
    width: 610px;
    height: 340px;
    padding: 40px 50px 0;
    margin-top: 30px;
    background-image: linear-gradient(90deg,#4a87fb 0,#b381fd);
    border-radius: 15px;
  }
  .balance-title {
    font-size: 26px;
    color: hsla(0,0%,100%,.6);
  }
  .balance-value {
    margin-top: .026667rem;
    color: #fff;
    font-size: 70px;
  }
  .match-box {
    display: flex;
    justify-content: space-between;
    margin-top: 60px;
  }
  .box-item {
    width: 50%;
    display: flex;
    flex-direction: column;
  }
  .balance-title {
    font-size: 26px;
  }
  .item-value {
    margin-top: 10px;
    color: #fff;
    font-size: 36px;
  }
  .settings-box {
    display: flex;
    width: 650px;
    align-items: center;
    justify-content: space-between;
  }

  .tool-box {
    display: flex;
    height: 105px;
    margin-top: 20px;
    background-color: #fff;
    box-shadow: 0 6px 8px 0 rgba(0,0,0,.05);
    border-radius: 5px;
    align-items: center;
    justify-content: flex-start;
  }
  .tool-box button {
    position: relative;
    outline: 0;
    border: 0;
    background-color: #fff;
    width: 50%;
    font-size: 32px;
    color: #233243;
  }
  .tool-box button:first-child:after {
    position: absolute;
    right: 0;
    top: 23px;
    content: "";
    display: block;
    width: 1px;
    height: 60px;
    background-color: #ebebeb;
  }

  .bottom-nav {
    display: flex;
    position: fixed;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    width: 750px;
    height: 100px;
    background-color: #fff;
    border-top: 2px solid #ebebeb;
  }
  .bottom-nav .nav-item {
    font-weight: bold;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50%;
    font-size: 32px;
    color: #999;
  }
  .bottom-nav .nav-item.active {
    color: #4a86fb;
  }
  .bottom-nav .nav-item .content {

  }
</style>
