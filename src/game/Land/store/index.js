import { stat } from "fs";

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
            debugger
            if (currentTime > beginTime && currentTime < endTime) {
                 /**
                 * 
                 * 游戏正在进行中，倒计时
                 * 
                */
                state.gameCount = parseInt(new Date().getTime() - new Date(endTime))
                state.gameState = 1;
                debugger
            } else if (currentTime < beginTime && currentTime < endTime){
                /**
                 * 
                 * 游戏未开始，倒计时
                 * 
                */
                state.gameCount = parseInt( new Date(beginTime) - new Date().getTime())
                state.gameState = 0;
                debugger
            } else if (currentTime > endTime) {
                /**
                 * 
                 * 游戏已结束，正在结算中
                 * 
                */
                state.gameState = 2;
                state.gameCount = 0;
                debugger
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
            debugger
            landrows.forEach((element,i) => {
                debugger
                if (element.roundNum != state.roundNum){
                    return;
                }
                if (element.type == 1) {
                    state.blackLand = element.owner;
                }
                //debugger
                if (element.owner == state.account_name) {
                   state.personal_land.push(element)
                }
                
                //debugger
                state.current_landlist.push(element)
            });
            state.landNum = state.personal_land.length;
        },
        //获取游戏内账户信息
        getGameBalance(state,accountlist) {
            accountlist.forEach(element => {
                if (element.player == state.account_name) {
                    state.game_balance = element.balance
                }
            });
        },
        getTouzhuRows(state,data) {
            let rows = [];
            data.forEach((element,i) => {
                element.amount = element.amount / 10000 + ' EOS'
                element.logtime = new Date(parseInt(element.logtime) * 1000).toLocaleString().replace(/:\d{1,2}$/,' '); 
                rows.push(element)
            });
           state.touzhuRows = rows
        } 
    }
}