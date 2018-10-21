import { stat } from "fs";

export default {
    state:{
        account_name:'uuu',
        eos_balance:0,
        game_balance:0,
        landlist:[],
        personal_land:0
    },
    mutations:{
        getAccount(state,name) {
           state.account_name = name
        },
        //获取eos余额
        setEosBalance(state,balance) {
           state.eos_balance = balance
        },
        // 获取全部地块信息
        getLandInfo(state,land) {
            state.landlist = land
            state.landlist.forEach(element => {
                if (element.owner == state.account_name) {
                   state.personal_land = element.roundNum
                }
            });
        },
        //获取游戏内账户信息
        getGameBalance(state,accountlist) {
            accountlist.forEach(element => {
                if (element.player == state.account_name) {
                    state.game_balance = element.balance
                }
            });
        }
    }
}