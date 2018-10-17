<template>
    <div class="cointainer">  
      <el-card class="box-card-betting item">
        <div slot="header" class="clearfix">
          <span class="title">购买土地</span>
        </div>
        <div class="box-input-betting">
           <el-input placeholder="1" v-model="amount">
              <template slot="prepend">投注</template>
              <template slot="append">EOS</template>
           </el-input>
           <el-input class="memo-input" placeholder="买地皮赢大奖" v-model="memo">
              <template slot="prepend">宣言</template>
           </el-input>
           <div>
            <span class="text ">本次下注最少需要0.5eos，每次下注扣除5%手续费</span>
           </div>
            <el-button type="danger" class="betting-btn">下注</el-button>
        </div>
      </el-card>  
      <el-card class="box-card-info item" :body-style="{padding: 0}">
        <div slot="header" class="clearfix">
          <span class="title">我的账户</span>
        </div>
        <div>
        <div class="box-input-info">
           <div class="account-balance">
               <span>EOS余额：</span>
               <span> 0  </span>
           </div>
           <div class="account-balance">
               <span>我的土地：</span>
               <span> 0  </span>
           </div>
           <div class="account-withdraw">
               <span>游戏账户余额：</span>
               <span> 0  </span>
               <el-button type="primary" size="mini" class="withdraw-btn">提现</el-button>
           </div>
           <div class="account-invite">
               <span>我的邀请链接：</span>
                <el-button style="float: right; padding: 3px 0" type="text">复制</el-button>
           </div>
           <span class="invite-text ">邀请将永久享受好友投注的2%的分红</span>
        </div>  
          
        </div>
      </el-card>  
    </div>
</template>
<script>
export default {
    ready() {
    },
   
    data() {
      return {
          amount: 10,
          memo: 20
      }
    },
    computed: {
    },
    methods: {

    }
}
</script>
<style>
.cointainer {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
}
.memo-input {
    margin-top: 10px;
}

.betting-btn {
   margin-top: 30px;
   width: 200px;
   justify-content: center;
}

.text {
    font-size: 14px;
}
.invite-text  {
    padding-left: 20px;
    color: coral;
    margin-top: -15px;
}
.title {
    font-size: 25px;
}

.item {
    margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

.box-card-betting {
    width: 374px;
    height: 400px;
}
.box-card-info {
    width: 374px;
    margin-left: 20px;
    height: 400px;
}
.box-input-betting {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.box-input-info {
    display: flex;
    justify-content: center;
    flex-direction: column;
}
.account-balance{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    flex-direction: row;
    font-size: 20px;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 2px;
    border-color: #ebeef5;
    border-style: solid;
    padding-left: 20px;
    padding-right: 25px;
}
.account-withdraw{
     display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    flex-direction: row;
    font-size: 20px;
    border-top: 0px;
    border-left: 0px;
    border-right: 0px;
    border-bottom: 2px;
    border-color: #ebeef5;
    border-style: solid;
    padding-left: 20px;
    padding-right: 5px;
}
.account-invite{
     display: flex;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    flex-direction: row;
    font-size: 20px;
    padding-left: 20px;
    padding-right: 10px;
}

</style>