import { stat } from "fs";

export default {
    state:{
        account_name:'',
        eos_balance:0,
        game_balance:0,
        personal_land:0
    },
    mutations:{
        getAccount(state,name) {
           state.account_name = name
        },
        getEosBalance(state,balance) {
           state.balance = balance
        },
        getPersonalLand(state,land) {
            state.personal_land = land
        },
        getGameBalance(state,game_balance) {
            state.game_balance = game_balance
        }
    }
}