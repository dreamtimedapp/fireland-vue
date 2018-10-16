
export default {
    state:{
        account_name:''
    },
    mutations:{
        getAccount(state,name) {
           state.account_name = name
        }
    }
}