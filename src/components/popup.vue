<template>
  <div v-show="visible" class="pop-container">
    <div class="pop-mask"></div>
       <img  class="pop-card-img-overlay" src="https://gw.alicdn.com/tfs/TB12sQ3lhnaK1RjSZFBXXcW7VXa-1378-1378.jpg"/>
    <div class="pop-content">
      <div class="pop-title">
        {{title}}
      </div>
      <div class="pop-body">
        {{text}}
      </div>
      <el-button  class="pop-button" v-on:click="$emit('pop-click')" type="danger" >进入游戏</el-button>
      <div class="pop-close"  @click="visible = false">
        <img :src="iconClose">
      </div>
    </div>
  </div>
</template>
<style>
  .pop-container {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
    
  }
  .pop-mask {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
  }
  .pop-card-img-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 580px;
    min-height: 580px;
    border-radius: 15px;
  }
  .pop-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 580px;
    min-height: 580px;
    background-color: #00000000;
    border-radius: 15px;
    color : #fff;
  }

  .pop-button {
      position: absolute;
      width: 200px;
      bottom: 100px;
      left: 200px;;
  }

  .pop-title {
    padding: 20px;
    font-size: 38px;
  }
  .pop-body {
    padding: 20px;
    font-size: 25px;
  }
  .pop-close {
    position: absolute;
    width: 80px;
    height: 80px;
    bottom: -120px;
    left: 50%;
    transform: translate(-50%, 0);
  }
  .pop-close img {
    width: 100%;
  }
</style>
<script>

  export default {
    name: 'popup',
    props: ['visible', 'title', 'text'],
    data: function() {
      return {
        iconClose: 'https://gw.alicdn.com/tfs/TB1pFJwnFzqK1RjSZFvXXcB7VXa-88-88.png'
      }
    },
    methods: {
       popEvent() {
          this.emit('popclick')
       },
    }
  };
</script>