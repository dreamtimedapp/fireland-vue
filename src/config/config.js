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
    let res = await Eos(eos_invite_config).transfer(INVITE_NAME,account,'5 LEN','柠檬游戏，签到送柠檬社区通证，首个基于资产池锚定的新型token，https://www.lemonfun.io/#/game/land')
    .then(result=>{
        alert(JSON.stringify(result))
        return result
    }).catch(err=>{
        alert(JSON.stringify(err))
    })
   
    return res;
    
};





