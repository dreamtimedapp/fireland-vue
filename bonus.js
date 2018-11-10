Eos = require('eosjs')
const eos_invite_config = {
    chainId :'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    keyProvider:'5JxpmXNrBj1xr3S5jZzaqGTGMVnpdUvNRDKrqjpQvZ9bCu3HcfX', //主账号秘钥
    //keyProvider : '5Jz7dBt74wmjW8sPP3bThBjQdCowzPbr5y1LqB7SRX4Ts7cd262',
    httpEndpoint:'http://mainnet.eoscannon.io',
    broadcast: true,
    verbose:false,
    sign: true
}
// jackma111111   
/*
async function sendToken() {
    let res = await Eos(eos_invite_config).transaction({ 
         actions: [ 
         { 
         account: 'lemoniotoken', 
         name: 'transfer', 
         authorization: [{ 
         actor:'lemoninviter', 
         permission: 'active' 
         }], 
         data: { 
         from: 'lemoninviter', 
         to: 'hkldeos12345', 
         quantity: '50.0000 LEN', 
         memo: '地王奖励+补偿' 
         } 
         } 
         ] 
         }).then(result=>{
             return result
         }).catch(err=>{
             console.log(err)
         });
         
     console.log(res)    
 }
 sendToken()*/
//Eos(eos_invite_config).transfer('lemoneosgame','lemoninviter','0.0001 LEN','柠檬游戏，签到送柠檬社区通证，首个基于资产池锚定的新型token，https://www.lemonfun.io/#/game/land')
async function bonus() {
   let now = new Date();
   if (now.getHours() == "21" && now.getMinutes() < 2) {
    let res = await Eos(eos_invite_config).transaction({ 
        actions: [ 
        { 
        account: 'firelandgame', 
        name: 'bonus', 
        authorization: [{ 
        actor:'lemoneosgame', 
        permission: 'active' 
        }], 
        data: { 
        } 
        } 
        ] 
        }).then(result=>{
            return result
        }).catch(err=>{
            console.log(err)
        });
    console.log(now.getMinutes())    
   }
}


setInterval(bonus,200);


