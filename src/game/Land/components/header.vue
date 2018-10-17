<template>
    <div class="header">  
        <router-link to="/" class="game-item-one">
            <i class="el-icon-arrow-left back"> </i>
        </router-link>
        <span>Eos大地主</span>
        <span>{{$store.state.LandStore.account_name}} </span>
    </div>
</template>
<script>
export default {
    ready() {
    },
   
    data() {
      return {
      }
    },
    computed: {
    },
    methods: {

    }
}
</script>
<style>
.header {
     width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #409EFF;
    height: 96px;
    padding-left: 20px;
    padding-right: 20px;
}
.header span {
    color: white;
    font-size: 30px;
}
.back {
    color: white;
    font-size: 30px;
}
.block {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 20px;
}
.text {
    color: #1abc9c;
    font-size: 40px;
    font-family: 'Roboto Condensed', serif;
    font-weight: 400;
    margin-top:10px;
    margin-bottom: 10px;
    text-align: center;
}
.digit {
    color: #ecf0f1;
    font-size: 150px;
    font-weight: 100;
    font-family: 'Roboto', serif;
    margin: 10px;
    text-align: center;
}
.count-down {
    align-items: center;
    bottom: 0;
    background-color: #34495e;
    display: flex;
    justify-content: center;
    left: 0;
    position: absolute;
    right: 0;
    top:0;
  }
</style>