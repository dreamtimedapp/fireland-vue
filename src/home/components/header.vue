<template>
   <div class="box">
    <div class="header-container"> 
       <div>
        <b-img class="logo" src="https://img.alicdn.com/tfs/TB1HrKSjXzqK1RjSZFvXXcB7VXa-2000-2000.png" /> 
        <span class="logo-title">柠檬游戏</span> 
      </div>
      <div class="header-left">
      <div class="header-nav hidden-sm-only hidden-xs-only">
          <a href="#" v-scroll-to="'#element'" class="text">柠檬通证(LEN)</a>
      </div>
      <el-button v-if="!account" v-on:click="login" class="login-button" type="primary" >登录(EOS)账户</el-button>
      <div v-if="account" class="login-account-name" type="primary" >{{account.name}}</div>
      </div>
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
    }
}
</script>

<style scoped>
.box {
    width: 100%;
    display: flex;
    min-width: 700px;
    justify-content: center;
    flex-direction: column;
}
.carousel {
    height: 700px;
}
.banner-what-item  {
  min-height: 700px;

 
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
    margin-left: 20px;
}
.logo-title {
    color: #333;
    font-size: 27px;
    margin-left: -50px;

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
.login-account-name {
    margin-left: 60px;
    margin-right: 60px;
    font-size: 34px;
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
    justify-content: center;
    align-items: center;
    flex-direction: row;
    padding-left: 50px;
    padding-top: 50px;
    padding-right: 50px;
    text-align: center;
}
.features-info {
    margin-top: 20px;
}

.features-title{
  color: #ffffff;
  font-size: 34px;
  margin-top: 10px;
}
.features-text p{
    color:#00bcd4;
    margin: 5px 0;
    font-size:18px;
    text-align: left
}
.features-text p strong {
    color: #f4b04f;
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