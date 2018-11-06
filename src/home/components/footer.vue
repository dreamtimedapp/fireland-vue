<template>
   <div class="footer-container">
      <div class="footer-qrcode">
          <div class="qrcode-box">
           <img src="https://gw.alicdn.com/tfs/TB1i2_0lNYaK1RjSZFnXXa80pXa-516-492.jpg" >
           <a href="https://t.me/lemonfunOfficial">官方电报群</a>
          </div>
          <div class="qrcode-box">  
            <img src="https://gw.alicdn.com/tfs/TB1iZ03nHrpK1RjSZTEXXcWAVXa-884-876.jpg" >
            <a href="https://t.me/lemonfunOfficial">官方微信</a>
          </div> 
      </div>  
      <div class="footer-partner">
          <span> 友情合作伙伴</span>
           <div class="partner-container">
               <div class="partner-logo">
                   <a href="http://www.mathwallet.org" target="_blank">
                   <img src="https://img.alicdn.com/tfs/TB1E4PBjrrpK1RjSZTEXXcWAVXa-150-46.png" >
                   </a>
               </div> 
               <div class="partner-logo">
                  <a href="https://www.mytokenpocket.vip/" target="_blank">
                     <img src="https://img.alicdn.com/tfs/TB1AoDWjxjaK1RjSZKzXXXVwXXa-300-55.png">
                   </a>
               </div>    
               <div class="partner-logo">
                   <a href="https://more.top" target="_blank">
                     <img src="https://img.alicdn.com/tfs/TB1UEYCjAvoK1RjSZFwXXciCFXa-200-55.png" >
                   </a>
               </div>    
               <div class="partner-logo">
                   <a href="https://meet.one" target="_blank">
                     <img src="https://img.alicdn.com/tfs/TB1LYfxjr2pK1RjSZFsXXaNlXXa-200-55.png" >
                   </a>
               </div>       
           </div>    
      </div>      
   </div>
</template>

<style scoped>
.footer-container {
    width: 100%;
    border-radius: 20px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 60px;
}
.footer-qrcode {
    display: flex;
}
.qrcode-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
}
.qrcode-box img {
    width: 300px;
}

.footer-partner {
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
.footer-partner span {
    color: #333333;
    font-size: 30px;
    margin-top: 25px;
}

.partner-container {
    display: flex;
    flex-direction: row;
    width: 730px;
    margin-top: 20px;
    margin-bottom: 40px;
}
.partner-logo {
    display: flex;
    background: #999999;
    width: 21.8vw;
    height: 12.3vw;
    margin: 10px;
    justify-content: center;
    align-items: center;
}
.partner-logo img {
    width: 95%;
    height: 25%;
}

</style>