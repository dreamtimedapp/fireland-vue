import Eos from 'eosjs'
import {
    toAsset
} from '../utils/utils.js'
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';

const httpEndpoint = 'http://api-mainnet.starteos.io'

// 节点配置
const network = {
    blockchain:'eos',
    protocol:'https',
    host:'nodes.get-scatter.com',
    port:443,
    chainId:'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
}

const scatter_res = {
    'eos': null,
    'account_name': null,
    'permission': null,
    'has_reject': false,
    'is_running': false
}

export const get_scatter_identity = async () => {
    if(scatter_res.is_running){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(get_scatter_identity());
            }, 1000);
        });
    }
    scatter_res.is_running = true;
    const scatter = window.scatter;
    if(!scatter){
        scatter_res.is_running = false;
        return {
            is_error: false,
            data: {
                eos: null,
                account_name: null,
                permission: null
            },
            msg: 'no scatter'
        };
    }
    let identity = await scatter.getIdentity({accounts:[network]}).catch(err => err);
    if(identity.isError){
        scatter_res.has_reject = true;
        scatter_res.error = identity;
        scatter_res.is_running = false;
        return {
            is_error: true,
            msg: identity
        }
    }
    const account = identity.accounts.find(function(acc){
         return acc.blockchain === 'eos';
    });
    let options = {
     authorization: account.name+'@'+account.authority,
     broadcast: true,
     sign: true
    }    
    let eos = scatter.eos(network, Eos,  options, "https");
    scatter_res.is_running = false;
    return {
        is_error: false,
        data: {eos, account_name: account.name, permission: account.authority}
    };
}

const call_scatter = async (call_direct = true) => {
    let {eos, account_name, permission} = scatter_res;
    if(!call_direct && scatter_res.has_reject){
        return {
            is_error: true,
            msg: scatter_res.error
        }
    }
    let is_error = false;
    let error_msg = '';
    if(!eos){
        let identity_res = await get_scatter_identity();
        is_error = identity_res.is_error;
        error_msg = identity_res.msg;
        if(!is_error){
            eos = identity_res.data.eos;
            account_name = identity_res.data.account_name;
            permission = identity_res.data.permission;
            scatter_res.eos = identity_res.data.eos;
            scatter_res.account_name = identity_res.data.account_name;
            scatter_res.permission = identity_res.data.permission;
        }
    }
    if(is_error){
        return {
            is_error,
            msg: error_msg
        };
    }
    return {eos, account_name, permission}
}

export const login = async ()=>{
    return await ScatterJS.scatter.getIdentity({accounts:[network]}).then(result => {
        return  result.accounts[0];
    })  
}

export const transfer = async (to = 'bandon', amount = 1, memo = '', tokenSymbol = 'EOS') => {
    let account = await ScatterJS.scatter.getIdentity({accounts:[network]}).then(result => {
       return  result.accounts[0];
      })
    let eos = ScatterJS.scatter.eos(network,Eos)
    return await eos.transfer(account.name, 'giveeostoken', '0.0001 EOS', 'scatter 转账测试').then(result => {
        return result
    })
}


export const get_available = async () => {
    let call_res = await call_scatter(false);
    if(call_res.is_error) return call_res;
    let {eos, account_name, permission} = call_res;
    if(!account_name){
        return {
            is_error,
            msg: ''
        };
    }
    return await Eos({ httpEndpoint })
                .getTableRows({"scope":"eosio","code":"eosio","table":"accounts","table_key":account_name,"limit":10000,"json":true})
                .then(data => {
                    return {
                        is_error: false,
                        data
                    };
                })
                .catch(err => {
                    return {
                        is_error: true,
                        msg: err
                    };
                });
}

