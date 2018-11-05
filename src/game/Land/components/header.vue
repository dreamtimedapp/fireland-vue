<template>
    <div class="header-container"> 
       <div>
        <b-img class="logo" src="https://gw.alicdn.com/tfs/TB1tdCOnAzoK1RjSZFlXXai4VXa-1024-1024.png" /> 
        <span class="logo-title">EOS国土无双</span> 
      </div>
      <div class="header-left">

      <el-button v-if="!account" v-on:click="login" class="login-button" type="danger" >登录(EOS)账户</el-button>
      <div v-if="account" class="login-account-name" type="primary" >{{account.name}}</div>
      </div>
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
    width: 730px;
    background: #fff;
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
    width: 80px;
    height: 80px;
    margin-left: 50px;
}
.logo-title {
    color: #333;
    font-size: 27px;
    margin-left: 10px;

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