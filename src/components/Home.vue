<style type="text/css">

  .error_info {
    color: #ef0909cf;
    margin-top: 10px;
    background: #f3f3f3;
    padding: 10px;
  }
  .account_info {
    color: #ef0909cf;
    margin-top: 10px;
    background: #f3f3f3;
    padding: 10px;
  }
</style>

<template>
  <div class="home">
    <div class="game-center" v-if="isGameShow">
      <div class="item-title">热门话题</div>
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
      <div class="more-list"><a href="/lottery" class="game-item">
        <div class="title">EOS乐透</div>
        <div class="info"><span>基于EOS合约的乐透游戏</span></div>
      </a><a href="/undecided" class="game-item">
        <div class="title">互动吧</div>
        <div class="info"><span>投票话题领取分红</span></div>
      </a><a href="/" class="game-item router-link-active">
        <div class="title">摇啊摇</div>
        <div class="info"><span>摇啊摇赢大奖(敬请期待)</span></div>
      </a></div>
    </div>

    <div class="personal" v-if="isPersonalShow">
      <div class="user-info">
        <div class="avatar-box"><img src="../assets/logo.png"></div>
        <div class="user-name"></div>
      </div>
      <div class="eto-info">
        <div class="balance-title">余额(EOT)</div>
        <div class="balance-value">0.0000</div>
        <div class="match-box">
          <div class="box-item">
            <div class="balance-title">累计分红(EOT)</div>
            <div class="item-value">0.0000</div>
          </div>
          <div class="box-item">
            <div class="balance-title">本期回购(EOS)</div>
            <div class="item-value">0.0000</div>
          </div>
        </div>
      </div>
      <div class="tool-box">
        <button>EOT购买<i class="iconfont e-Path"></i></button>
        <button>EOT回购<i class="iconfont e-Shape1"></i></button>
      </div>
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
  import {
    get_scatter_identity,
    get_available,
    login,
    transfer
  } from '../services/web_wallet_service.js'


  export default {
    name: 'Home',
    data: function() {
      return {
        tab: 'game'
      }
    },
    mounted: function() {
      if (this.has_scatter) {
        this.call_scatter();
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
      has_account_name: function() {
        if (!this.account_name) return '';
        return this.account_name;
      },
      has_scatter: function() {
        return store.state.global_config.has_scatter;
      }
    },
    methods: {
      tabChange: function(tab) {
        if (tab !== this.tab) {
          this.tab = tab;
        }
      }
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
  .game-item {
    background: url(https://eoslottery.me/img/game1.f802af84.jpg) no-repeat 50%;
    background-size: contain;

    display: block;
    text-decoration: none;
    width: 345px;
    height: 200px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  .game-item .title {
    font-size: 32px;
    color: #fff;
    margin-top: 40px;
    padding-left: 30px;
  }
  .game-item .info {
    margin-top: 6px;
    color: hsla(0,0%,100%,.6);
    font-size: 26px;
    padding-left: 30px;
  }

  .personal {
    margin: 0 auto;
    padding: 50px 20px 140px;
  }
  .user-info {
    display: flex;
    align-items: center;
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

  .tool-box {
    display: flex;
    height: 105px;
    margin-top: 20px;
    background-color: #fff;
    box-shadow: 0 6px 8px 0 rgba(0,0,0,.05);
    border-radius: 5px;
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
