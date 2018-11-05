<template>
   <div class="box">
    <div class="header-container"> 
       <div>
        <b-img class="logo" src="https://img.alicdn.com/tfs/TB1HrKSjXzqK1RjSZFvXXcB7VXa-2000-2000.png" /> 
        <span class="logo-title">LemonFun</span> 
      </div>
      <div class="header-left">

      <el-button v-if="!account" v-on:click="login" class="login-button" type="danger" >登录(EOS)账户</el-button>
      <div v-if="account" class="login-account-name" type="primary" >{{account.name}}</div>
      </div>
    </div>
    <div class="banner-cover">
       <img  class="card-img" src="https://gw.alicdn.com/tfs/TB1ys1OmVYqK1RjSZLeXXbXppXa-800-800.png" >
    </div>
    <el-row>
        <el-col :span="12">
           <div class="banner-game-item">
              <span class="banner-game-title">EOS 国土无双</span>
              <img  class="card-game-item-img" src="https://gw.alicdn.com/tfs/TB12sQ3lhnaK1RjSZFBXXcW7VXa-1378-1378.jpg">
              <div class="card-game-item-img-cover" >
                 <el-button type="danger" size="mini"  v-on:click="toland" class="game-entrance-btn">进入游戏</el-button>
              </div>
           </div>
        </el-col>
        <el-col :span="12">
            <div class="banner-game-item2">
              <span class="banner-game-title">城堡寻宝</span>
              <img  class="card-game-item-img" src="https://gw.alicdn.com/tfs/TB12sQ3lhnaK1RjSZFBXXcW7VXa-1378-1378.jpg">
               <div class="card-game-item-img-cover" >
                 <el-button type="danger" size="mini" class="game-entrance-btn" disabled>comming</el-button>
              </div>
            </div>
        </el-col>
      </el-row>  
    </div>
</template>
<script>

export default {
    props: ['account'],
    ready() {
    },
    methods: {
      login: function(event) {
        this.$emit('requestId');
      },
      toland:function(event) {
          location.href= '/#/game/land'
      }
    }
}
</script>

<style scoped>
.box {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    background-color:#fff; 
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    padding-bottom: 6.2vw;
}
.banner-cover {
    margin-left: 2.3vw;
    margin-right: 2.3vw;
    margin-bottom: 25px;
    border-radius: 10px;
    background-color: #ccc;  
    height: 53vw;
}
.card-img-overlay {
    background: #333;
    width: 100px;
    height: 100%;
    padding: 20px;
}

.banner-game-item {
    position: relative;
    border-radius: 15px;
    margin-bottom: 10px;
    margin-left: 2.3vw;
    margin-right: 10px;
    background-color: #ccc;  
    height: 25vw;
}

.banner-game-item2 {
    position: relative;
    border-radius: 15px;
    margin-bottom: 10px;
    margin-left: 10px;
    margin-right: 2.3vw;
    background-color: #ccc;  
    height: 25vw;
}

.header-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 150px;
    background: #ffffff;
    justify-content: space-between;
    border-radius: 25px;
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

.logo {
    width: 150px;
    height: 150px;
}
.logo-title {
    color: #333;
    font-size: 27px;
    margin-left: -50px;

}

.login-button {
    margin-left: 60px;
    margin-right: 2.3vw;
}
.login-account-name {
    margin-left: 90px;
    margin-right: 40px;
    font-size: 34px;
}

.card-img {
   width: 100%;
   height: 100%;
   border-radius: 0;
   padding-top: 3vw;;
   padding-bottom: 3vw;
   padding-left: 3vw;
   padding-right: 3vw;
   vertical-align: middle;
   border-style: none;
}
.card-game-item-img {
   width: 100%;
   height: 100%;
   border-radius: 10px;
   vertical-align: middle;
   border-style: none;
}
.card-game-item-img-cover {
   position: absolute;
   top:14vw;
   left: 22vw;
   padding: 20px;
}

.game-entrance-btn {
   width: 18vw;
   height: 6vw;
   font-size: 3vw;
   padding: 0;
}
.banner-game-title {
    position: absolute;
    color:#fff;
    font-size: 4vw;
    top: 2vw;
    left: 2vw;
}

</style>