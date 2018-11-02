<template>
   <div class="land-box">
    <div class="land-header-container"> 
      <div>  
      <b-img class="land-logo" src="https://img.alicdn.com/tfs/TB12p3CjAvoK1RjSZPfXXXPKFXa-2000-2000.png" /> 
      <span class="land-logo-title">EOS 国土无双</span> 
      </div>
      <div class="land-header-left">
      <div class="land-header-nav hidden-xs-only">
           <a href="#" v-scroll-to="'#rule'" class="land-header-text">玩法规则</a>
          <router-link to="/home" class="land-header-text">柠檬游戏</router-link>
      </div>
      <el-button v-if="!account" v-on:click="login"  class="land-login-button" type="primary" >登录(EOS)账户</el-button>
      <div v-if="account" class="land-login-account-name" type="primary" >{{account.name}}</div>
      </div>
    </div> 
   
  </div>
</template>
<script>

import { mapState, mapActions, mapGetters } from 'vuex'
export default {
    props: ['account'],
    methods: {
      login: function(event) {
        this.$emit('requestId');
      },
    }
}
</script>
<style>
.land-box {
    width: 100%;
    display: flex;
    min-width: 700px;
    justify-content: center;
    flex-direction: column;
}
.land-header-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 150px;
    background: #12161b;
    min-width: 750px;
    justify-content: space-between;
} 


.land-logo-title {
    color: #fff;
    font-size: 27px;
    margin-left: -45px;

}
.land-header-left {
    float: right;
    display: flex;
    align-items: center;
    flex-direction: row;
}
.land-header-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
}

.land-logo {
    width: 200px;
    height: 200px;
   
}
.land-header-text {
    text-align: center;
    font-size:30px;
    color: #fff; 
    margin-left: 45px;
}
.land-login-button {
    margin-left: 60px;
    margin-right: 60px;
}
.land-login-account-name {
    margin-left: 60px;
    margin-right: 60px;
    font-size: 34px;
    color: #fff;
}

.bg-dark {
    background: #fff;
}

</style>