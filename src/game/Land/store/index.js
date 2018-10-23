import { stat } from "fs";

export default {
    state:{
        account_name:'',
        eos_balance:0,
        game_balance:0,
        current_landlist:[],
        personal_land:[],
        roundNum: 0,
        landNum:0
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
        getLandInfo(state,data) {
            state.personal_land = []
            state.current_landlist = []

            let landrows = data.land;
            state.roundNum = data.count[0].roundNum;
            
            landrows.forEach((element,i) => {
                if (element.roundNum != state.roundNum){
                    return;
                }
                debugger
                if (element.owner == state.account_name) {
                   state.personal_land.push(element)
                }
                debugger
                state.current_landlist.push(element)
            });
            state.landNum = state.personal_land.length;
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