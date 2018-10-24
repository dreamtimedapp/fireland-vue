import { stat } from "fs";
import {
    get_scatter_identity,
    login,
    transfer,
    recast,
    getBalance,
    get_player_list,
    get_land_info,
    get_touzhu_info,
    get_gameInfo_list,
    get_len_token_info
} from '../../services/web_wallet_service.js'

export default {
    state:{
        home_account_name:'',
        eos_balance:'',
        supply:0,  //流通量
        max_supply: 0,
        price :0,
        cash_pool:0,
        add_pool:0, //增值池
        len_balance:0
    },
    mutations:{
        setHomeAccount(state,name) {
           state.home_account_name = name
        },
        setEosBalance(state,balance) {
           state.eos_balance = balance
        },
        setLenBalance(state,data) {
            if (data.rows.length == 0) {
                state.len_balance = 0;
                return
            }
            let len = data.rows[0]
            state.len_balance = len.balance;
        },
        setLenDetail(state,data) {
            let len = data.rows[0]
            state.supply = len.supply
            state.max_supply = len.max_supply
            state.price = len.price 
            state.cash_pool = len.cash_pool 
            state.add_pool = len.add_pool 
        },
        async sellLenAction(state,data) {
            let res = await get_len_token_info();
            if(!res.is_error){
                this.account_name = res.data
                setLenDetail(state,res.data) 
            }
            let len = await get_len_balance_bytable()
            if (!res.is_error) {
                this.account_name = len.data
                setLenBalance(state,res.data) 
            }

        }
    }
}