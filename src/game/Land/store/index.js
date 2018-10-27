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
} from '../../../services/web_wallet_service.js'


export default {
    state:{
        account_name:'',
        eos_balance:0,
        game_balance:0,
        current_landlist:[],  // 当前的土地数量
        personal_land:[],
        touzhuRows:[],
        roundNum: 0,
        landNum:0,
        maxPrice:0,
        minPrice:0,
        poolBalace:0,
        gameInfo:{},
        gameCount:0,
        blackLand:'',
        gameState: 0  // 0代表未开始，1代表进行中，2代表已结束
    },
    mutations:{
        getAccount(state,name) {
           state.account_name = name
        },
        //获取eos余额
        setEosBalance(state,balance) {
           state.eos_balance = balance
        },
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
        //获取游戏内账户信息
        getGameBalance(state,accountlist) {
            accountlist.forEach(element => {
                if (element.player == state.account_name) {
                    state.game_balance = element.balance / 10000 
                }
            });
        },
        getTouzhuRows(state,data) {
            let rows = [];
            data.forEach((element,i) => {
                element.amount = element.amount / 10000 + ' EOS'
                element.logtime = new Date(parseInt(element.logtime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '); 
                if (parseInt(element.type) == 1) {
                    element.type = '升级土地' + element.landID + "成功" 
                } else if (parseInt(element.type) == 2) {
                    element.type = '升级土地' + element.landID + "失败" 
                } else if (parseInt(element.type) == 3) {
                    element.type = '买入土地' + element.landID + "成功" 
                } else if (parseInt(element.type) == 4) {
                    element.type = '买入土地' + element.landID + "失败" 
                }
                rows.push(element)
            });
           state.touzhuRows = rows
        },
        async setMyInfo(state,data) {
            let balance_res = await getBalance();
            if (balance_res) {
              this.eos_balance = balance_res.result[0]
              state.eos_balance = balance_res.result[0]
            } 
            let res = await get_player_list()
            if (res.is_error) {
                return;
            }
            let playerlist = res.data.rows
            if (!playerlist) {
                return;
            }
            getGameBalance(state,playerlist)
        }
    }
}