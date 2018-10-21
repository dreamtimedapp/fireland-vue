import { stat } from "fs";

export default {
    state:{
        account_name:''
    },
    getters: {
        getAccount(state) {
            return state.account_name;
        }
    },
    mutations:{
        setAccount(state,name) {
            debugger
           state.account_name = name
        }
    }
}