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
    get_len_token_info,
    
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
        len_balance:0,
        farm_game_info:'',
        gameCount:0,
        gameState:1,
        landNum:0,
        maxPrice:0,
        minPrice:0,
        poolBalace:0,
        personal_land:[],
        blackLand:''
    },
    mutations:{
        getGameInfo(state,info) {
            state.gameInfo = info;
            let currentTime = Date.parse(new Date());
            let beginTime = parseInt(state.gameInfo.beginTime) * 1000
            let endTime = parseInt(state.gameInfo.endTime) * 1000
            if (currentTime > beginTime && currentTime < endTime) {
                 /**
                 * 
                 * 游戏正在进行中，倒计时
                 * 
                */
                state.gameCount = parseInt(new Date(endTime) - new Date().getTime())
                state.gameState = 1;

            } else if (currentTime < beginTime && currentTime < endTime){
                /**
                 * 
                 * 游戏未开始，倒计时
                 * 
                */
                state.gameCount = parseInt( new Date(beginTime) - new Date().getTime())
                state.gameState = 0;
            } else if (currentTime > endTime) {
                /**
                 * 
                 * 游戏已结束，正在结算中
                 * 
                */
                state.gameCount = 0
                state.gameState = 2;
            }
        },
          // 获取全部地块信息
          getLandInfo(state,data) {
            state.personal_land = []
            state.current_landlist = []

            let landrows = data.land;
            state.roundNum = data.count[0].roundNum;
            state.maxPrice  = data.count[0].landMaxPrice / 10000;
            state.minPrice = data.count[0].landMinPrice / 10000;
     
            state.poolBalace = data.count[0].potBalance / 10000;

            landrows.forEach((element,i) => {

                if (element.roundNum != state.roundNum){
                    return;
                }
                if (element.type == 1) {
                    state.blackLand = element.owner;
                }
                //// debugger
                if (element.owner == state.account_name) {
                   state.personal_land.push(element)
                }
                
                //// debugger
                state.current_landlist.push(element)
            });
            state.landNum = state.personal_land.length;
        },
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
                this.setLenDetail(state,res.data) 
            }
            let len = await get_len_balance_bytable()
            if (!res.is_error) {
                this.account_name = len.data
                setLenBalance(state,res.data) 
            }

        }
    }
}