import Eos from 'eosjs'
import {
    toAsset
} from '../utils/utils.js'
import {
    test_network,main_network,endpoint,eos_config,CONTRACT_NAME
} from '../config/config.js'
import ScatterJS from 'scatterjs-core';
import ScatterEOS from 'scatterjs-plugin-eosjs';

const httpEndpoint = endpoint


// 节点配置
const network = test_network

const scatter_res = {
    'account_name': null,
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
    let scatter = ScatterJS.scatter;
    let connect =await scatter.connect('lemo').then(connected => {
        return connected;
    });
    let account = await  ScatterJS.scatter.getIdentity({accounts:[network]}).then(result => {
        scatter_res.account_name = result.accounts[0]
        return  result.accounts[0];
    }).catch(err=>{
        //debugger
        alert(err)
    });
    scatter_res.account_name = account.name;
    return {
        is_error:false,
        data:account.name
    }
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
    if (!scatter_res.account_name) {
        let res = await get_scatter_identity().data;
        //debugger
    }
    let account_name = scatter_res.account_name;
    //debugger
    return await Eos(eos_config).getCurrencyBalance({ code: "eosio.token", account: account_name, symbol: "EOS" }).then(result => {
        return {
            is_error:false,
            result
        }
    }).catch(err => {
        return {
            is_error: true,
            msg: err
        };
    });
}

export const transfer = async (toname = 'fireland1111',amount = 1, memo = '我的土地我做主', tokenSymbol = 'EOS') => {
    if (!scatter_res.account_name) {
        scatter_res.account_name = await get_scatter_identity().data;
    }
    let account_name = scatter_res.account_name;
    let eos = ScatterJS.scatter.eos(network,Eos)
    return await eos.transfer(account_name, toname, toAsset(amount, tokenSymbol), memo).then(result => {
        return {
            is_error:false,
            result
        }
    }).catch(err => {
        return {
            is_error: true,
            msg: err
        };
    });
}
/**
 *  复投
 *  @param toaccount 复投账户
 *  @param quantity 复投金额
 *  @param memo 推荐人账户
 *  @param tokensymbol token的符号缩写
 * 
 */
export const recast = async(toaccount='fireland1111',quantity = 1, memo ='referrer',tokenSymbol = 'EOS')=>{
    if (!scatter_res.account_name) {
        scatter_res.account_name = await get_scatter_identity().data;
    }
    let account_name = scatter_res.account_name;
    let eos = ScatterJS.scatter.eos(network,Eos)
    return await eos.transaction({
        actions: [
            {
                account: toaccount, //合约账户
                name: 'recast',
                authorization: [{
                    actor:account_name,
                    permission: 'active'
                }],
                data: {
                    account: account_name,  // 用户自己的账户
                    quantity: toAsset(quantity, tokenSymbol),
                    memo: memo
                }
            }
        ]
    }).then(result => {
        return {
            is_error:false,
            result
        }
    }).catch(err => {
        return {
            is_error: true,
            msg: err
        };
    });
}
/**
 *  提现
 *  @param toaccount 提现账户
 *  @param quantity 提现金额
 * 
 */
export const withdraw = async (toaccount = 'playeraccount',quantity = 1, tokenSymbol = 'EOS') => {
    if (!scatter_res.account_name) {
        scatter_res.account_name = await get_scatter_identity().data;
    }
    let account_name = scatter_res.account_name;
    let eos = ScatterJS.scatter.eos(network,Eos)
    return await eos.transaction({
        actions: [
            {
                account: toaccount, //合约账户
                name: 'recast',
                authorization: [{
                    actor:account_name,
                    permission: 'active'
                }],
                data: {
                    account: account_name,  // 复投账户，写死的
                    quantity: toAsset(quantity, tokenSymbol),
                }
            }
        ]
    }).then(result => {
        return {
            is_error:false,
            result
        }
    }).catch(err => {
        return {
            is_error: true,
            msg: err
        };
    });
}

/**
 * 
 * 获取玩家信息表
 * 
 */

export const get_player_list = async () => {

    return await Eos(eos_config)
                .getTableRows({"scope":CONTRACT_NAME,"code":CONTRACT_NAME,"table":"account","limit":10000,"json":true})
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
 
    return await Eos(eos_config)
                .getTableRows({"scope":CONTRACT_NAME,"code":CONTRACT_NAME,"table":"land","limit":10000,"json":true})
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

export const get_gameInfo_list = async () => {
 
    return await Eos(eos_config)
                .getTableRows({"scope":CONTRACT_NAME,"code":CONTRACT_NAME,"table":"counter","limit":10000,"json":true})
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
    
    return await Eos(eos_config)
                .getTableRows({"scope":CONTRACT_NAME,"code":CONTRACT_NAME,"table":"gamelog","limit":10000,"json":true})
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
 * 获取Token信息
 * 
 */

export const get_len_token_info = async () => {
    return await Eos(eos_config)
                .getTableRows({"scope":"LEN","code":"lemoniotoken","table":"stat","limit":10000,"json":true})
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
 * 获取EOS余额
 * 
*/
export const get_len_balance_bytable = async ()=> {
    if (!scatter_res.account_name) {
        let res = await get_scatter_identity().data;
    }
    let account_name = scatter_res.account_name;
    return await Eos(eos_config)
    .getTableRows({"scope":account_name,"code":"lemoniotoken","table":"accounts","limit":10000,"json":true})
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
 * 获取EOS余额
 * 
*/
export const get_len_balance = async ()=> {
    if (!scatter_res.account_name) {
        let res = await get_scatter_identity().data;
    }
    let account_name = scatter_res.account_name;
    return await Eos(eos_config).getCurrencyBalance({ code: "eosio.token", account: account_name, symbol: "LEN" }).then(result => {
        return {
            is_error:false,
            result
        }
    }).catch(err => {
        return {
            is_error: true,
            msg: err
        };
    });
}


/**
 *  卖出通证
 *  @param toaccount 提现账户
 *  @param quantity 提现金额
 * 
 */
export const sell_len = async (toaccount = 'playeraccount',quantity = 1, tokenSymbol = 'LEN') => {
    if (!scatter_res.account_name) {
        scatter_res.account_name = await get_scatter_identity().data;
    }
    let account_name = scatter_res.account_name;
    let eos = ScatterJS.scatter.eos(network,Eos)
    return await eos.transaction({
        actions: [
            {
                account: "lemoniotoken", //合约账户
                name: 'sell',
                authorization: [{
                    actor:account_name,
                    permission: 'active'
                }],
                data: {
                    account: account_name,  // 用户账户
                    quantity: toAsset(quantity, tokenSymbol),
                }
            }
        ]
    }).then(result => {
        return {
            is_error:false,
            result
        }
    }).catch(err => {
        return {
            is_error: true,
            msg: err
        };
    });
}


