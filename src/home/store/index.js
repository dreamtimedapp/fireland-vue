import { stat } from "fs";

export default {
    state:{
        home_account_name:'',
        eos_balance:'',
        supply:0,  //流通量
        max_supply: 0,
        price :0,
        cash_pool:0,
        add_pool:0 //增值池
    },
    mutations:{
        setHomeAccount(state,name) {
           state.home_account_name = name
        },
        setEosBalance(state,balance) {
           state.eos_balance = balance
        },
        setLenDetail(state,data) {
            let len = data.rows[0]
            state.supply = len.supply
            state.max_supply = len.max_supply
            state.price = len.price 
            state.cash_pool = len.cash_pool 
            state.add_pool = len.add_pool 
        }
    }
}