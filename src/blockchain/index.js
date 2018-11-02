import { currentGetters, eos } from './store'
import {
    toAsset
} from '../utils/utils.js'
export const CONTRACT_NAME = 'firelandgame';
export const INVITE_NAME = 'lemoninviter';

export function getBalancesByContract ({ tokenContract = 'eosio.token', accountName, symbol }) {
  return eos().getCurrencyBalance(tokenContract, accountName, symbol)
}

export function getMyBalancesByContract ({ tokenContract = 'eosio.token', symbol }) {
  const accountName = currentGetters().account.name
  return getBalancesByContract({ tokenContract, accountName, symbol })
}

export function getLenTokenInfo() {
  return eos()
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

export const transfer = async (amount = 1, memo = '我的土地我做主', tokenSymbol = 'EOS') =>{
    const account_name = currentGetters().account.name
    if (!amount) {
        alert("请输入投注数量")
    }
    if (!memo) {
       memo = "lemoneosgame"
    }
    return  eos().transfer(account_name, CONTRACT_NAME, toAsset(amount, tokenSymbol), memo).then(result => {
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
export const recast = async (quantity = 1, memo ='referrer',tokenSymbol = 'EOS')=>{
    const account_name = currentGetters().account.name
     if (!quantity) {
         alert("请输入投注数量")
     }
     if (!memo) {
        memo = "lemoneosgame"
     }
    return eos().transaction({
        actions: [
            {
                account: CONTRACT_NAME, //合约账户
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
 * 
 * 抽奖表
 * 
 */
export function winLand(toaccount = 'playeraccount',referrer='lemoneosgame'){
    const account_name = currentGetters().account.name
    return  eos().transaction({
        actions: [
            {
                account: CONTRACT_NAME, //合约账户
                name: 'winland',
                authorization: [{
                    actor:account_name,
                    permission: 'active'
                }],
                data: {
                    account: account_name,  // 复投账户，写死的
                    referrer:referrer 
                }
            }
        ]
    }).then(result => {
        debugger
        return {
            is_error:false,
            result
        }
    }).catch(err => {
        debugger
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
export const withdraw = async(tokenSymbol = 'EOS')=> {
    const account_name = currentGetters().account.name
    return  eos().transaction({
        actions: [
            {
                account: CONTRACT_NAME, //合约账户
                name: 'withdraw',
                authorization: [{
                    actor:account_name,
                    permission: 'active'
                }],
                data: {
                    account: account_name,  // 复投账户，写死的
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

export const getPlayerList = async () => {

    return  eos()
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

export const getLandInfo = async () => {
 
    return await eos()
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

export const getGameInfoList = async() =>{
 
    return eos()
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

export  const get_touzhu_info = async ()=>{
    return eos()
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
 *  卖出通证
 *  @param toaccount 提现账户
 *  @param quantity 提现金额
 * 
 */
export function sellLen(quantity, tokenSymbol = 'LEN') {

    const account_name = currentGetters().account.name

    return eos().transaction({
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

