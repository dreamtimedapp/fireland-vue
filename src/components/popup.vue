<template>
  <div v-show="visible" class="pop-container">
    <div class="pop-mask"></div>
    <div class="pop-content">
      <div class="pop-title">
        {{title}}
      </div>
      <div class="pop-body">
        {{text}}
      </div>
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
  .pop-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 580px;
    min-height: 580px;
    background-color: #fff;
    border-radius: 15px;
  }
  .pop-title {
    padding: 20px;
    font-size: 32px;
  }
  .pop-body {
    padding: 20px;
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
  import iconClose from '../assets/icon/icon-close.png';
  export default {
    name: 'popup',
    props: ['visible', 'title', 'text'],
    data: function() {
      return {
        iconClose: iconClose
      }
    }
  };
</script>