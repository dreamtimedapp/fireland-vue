import { stat } from "fs";

export default {
    state:{
        home_account_name:''
    },
    mutations:{
        setHomeAccount(state,name) {
           state.home_account_name = name
        }
    }
}