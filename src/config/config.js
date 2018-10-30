import Eos from 'eosjs'

export const main_network = {
    blockchain:'eos',
    protocol:'https',
    host:'mainnet.eoscannon.io',
    port:443,
    chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
}

export const eos_config = {
    chainId :'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    httpEndpoint:'https://mainnet.eoscannon.io',
    broadcast: true,
    verbose:false,
    sign: true
}

export const eos_invite_config = {
    chainId :'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    keyProvider : '5Jz7dBt74wmjW8sPP3bThBjQdCowzPbr5y1LqB7SRX4Ts7cd262',
    httpEndpoint:'https://mainnet.eoscannon.io',
    broadcast: true,
    verbose:false,
    sign: true
}

export const CONTRACT_NAME = 'firelandgame';
export const INVITE_NAME = 'lemoninviter';


export const EOS_Inviter = async (account)=> {
    let res = await Eos(eos_invite_config).transaction({ 
        actions: [ 
        { 
           account: 'lemoniotoken', 
           name: 'transfer', 
           authorization: [{ 
              actor:INVITE_NAME, 
              permission: 'active' 
           }], 
           data: { 
             from: INVITE_NAME, 
             to: account, 
             quantity: '5.0000 LEN', 
             memo: '首个价格锚定资产社区通证，签到即送token，抽奖即送土地，游戏挖矿即将开始，https://www.lemonfun.io' 
           } 
        }] 
    }).then(result=>{
        return result
    }).catch(err=>{
        console.log(err)
    });
    return res; 
};





