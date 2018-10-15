import Eos from 'eosjs'
import {
    toAsset
} from '../utils/utils.js'
import {
    test_network,main_network,endpoint
} from '../config/config.js'
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';

const httpEndpoint = endpoint

// 节点配置
const network = test_network

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

/**
 * 
 * 获取EOS余额
 * 
*/
export const getBalance = async ()=> {
    let call_res = await call_scatter();
    if(call_res.is_error) return call_res;
    let {_,account_name, permission} = call_res;
    let eos = ScatterJS.scatter.eos(network,Eos)
    return await eos.getCurrencyBalance({ code: "eosio.token", account: account_name, symbol: "EOS" }).then(result => {
        return result
    })
}

export const transfer = async (toname = 'teamaccount',amount = 1, memo = '啦啦啦', tokenSymbol = 'EOS') => {
    let call_res = await call_scatter();
    if(call_res.is_error) return call_res;
    let {_,account_name, permission} = call_res;
    let eos = ScatterJS.scatter.eos(network,Eos)
    return await eos.transfer(account_name, toname, toAsset(amount, tokenSymbol), memo).then(result => {
        return result
    })
}
/**
 *  复投
 *  @param toaccount 复投账户
 *  @param quantity 复投金额
 *  @param memo 推荐人账户
 *  @param tokensymbol token的符号缩写
 * 
 */
export const recast = async(toaccount='teamaccount',quantity = 1, memo ='referrer',tokenSymbol = 'EOS')=>{
    let call_res = await call_scatter();
    if(call_res.is_error) return call_res;
    let {_,account_name, permission} = call_res;
    let eos = ScatterJS.scatter.eos(network,Eos)
    return await eos.transaction({
        actions: [
            {
                account: account_name,
                name: 'recast',
                authorization: [{
                    actor:account_name,
                    permission: 'active'
                }],
                data: {
                    account: 'playeraccount',  // 复投账户，写死的
                    quantity: toAsset(quantity, tokenSymbol),
                    memo: memo
                }
            }
        ]
    })
}
/**
 *  提现
 *  @param toaccount 提现账户
 *  @param quantity 提现金额
 * 
 */
export const withdraw = async (toaccount = 'playeraccount',quantity = 1, tokenSymbol = 'EOS') => {
    let call_res = await call_scatter();
    if(call_res.is_error) return call_res;
    let {_,account_name, permission} = call_res;
    let eos = ScatterJS.scatter.eos(network,Eos)
    return await eos.transaction({
        actions: [
            {
                account: account_name,
                name: 'recast',
                authorization: [{
                    actor:account_name,
                    permission: 'active'
                }],
                data: {
                    account: 'playeraccount',  // 复投账户，写死的
                    quantity: toAsset(quantity, tokenSymbol),
                }
            }
        ]
    })
}

/**
 * 
 * 获取玩家信息表
 * 
 */

export const get_player_list = async () => {
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
                .getTableRows({"scope":"eosio","code":"eosio","table":"account","table_key":account_name,"limit":10000,"json":true})
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

/**
 * 
 * 获取地块信息表
 * 
 */

export const get_land_info = async () => {
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
                .getTableRows({"scope":"eosio","code":"eosio","table":"account","table_key":account_name,"limit":10000,"json":true})
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

/**
 * 
 * 获取游戏信息表
 * 
 */

export const get_touzhu_list = async () => {
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
                .getTableRows({"scope":"eosio","code":"eosio","table":"account","table_key":account_name,"limit":10000,"json":true})
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

/**
 * 
 * 获取投注信息表
 * 
 */

export const get_touzhu_info = async () => {
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
                .getTableRows({"scope":"eosio","code":"eosio","table":"account","table_key":account_name,"limit":10000,"json":true})
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

