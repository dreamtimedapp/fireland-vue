import { stat } from "fs";

export default {
    state:{
        account_name:''
    },
    mutations:{
        login(state,name) {
           state.account_name = name
        }
    }
}