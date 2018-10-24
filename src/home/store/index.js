import { stat } from "fs";

export default {
    state:{
        home_account_name:'',
        len_balance:0,
        len_detail:0
    },
    mutations:{
        setHomeAccount(state,name) {
           state.home_account_name = name
        },
        setLenDetail(state,data) {
            
        }
    }
}