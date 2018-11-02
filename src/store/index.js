import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);
import Eos from 'eosjs'
import { network } from '../config'
import { getMyBalancesByContract, getLenTokenInfo,sellLen,
  getGameInfoList,getLandInfo,transfer,getPlayerList,get_touzhu_info,recast,withdraw} from '../blockchain'

import axios from 'axios'
import qs from 'qs';
import { debug } from 'util';

export default new vuex.Store({
    state: {
        scatter: null,
        identity: null,
        eos: null,
        balance: {
          eos: '0.0000 EOS',
          len: '0.0000 LEN'
        },
        lenInfo: {
          supply : 0,
          max_supply: 0,
          price : 0,
          cash_pool:0
        },
        landInfo: {
          roundNum:0,
          minPrice:0,
          blackLand:'',
          personal_land:[],
          zhongjiang:[],
          landNum:0,
          current_landlist:[],
          poolBalace:0,
          touzhuRows:[],
          game_balance:0,
          blackLandArray:[],
        },
        gameInfo : {
          gameCount :0,
          gameState: 0,
          gameMessage:''
        }
    },
    getters: {
        account: ({ scatter }) => {
          if (!scatter) { return null }
          const { identity } = scatter
          return identity ? identity.accounts.find(({ blockchain }) => blockchain === 'eos') : null
        }
    },
    mutations: {
        setScatter (state, scatter) {
          state.scatter = scatter
          state.eos = scatter.eos(network, Eos, {})
          state.identity = scatter.identity
        },
        setIdentity (state, identity) {
          state.identity = identity
        },
        setBalance (state, { symbol, balance }) {
          state.balance[symbol] = balance || `0.0000 ${symbol.toUpperCase()}`
        },
        setLenDetail(state,data) {
          let len = data.rows[0]
          state.lenInfo.supply = len.supply
          state.lenInfo.max_supply = len.max_supply
          state.lenInfo.price = len.price 
          state.lenInfo.cash_pool = len.cash_pool 
        },
        setGlobal (state, globalInfo) {
          state.globalInfo = globalInfo
        },
        setLandInfo(state,data) {

          state.personal_land = []
            state.current_landlist = []

            let landrows = data.land;
            state.landInfo.roundNum = data.count[0].roundNum;

            state.landInfo.minPrice = data.count[0].landMinPrice / 10000;
     
            state.landInfo.poolBalace = data.count[0].potBalance / 10000;

            landrows.forEach((element,i) => {
    
                if (element.roundNum != state.landInfo.roundNum){
                    return;
                }
                if (element.type == 1) {
                  state.landInfo.blackLandArray.push(element.owner);
                }
                if (element.owner == state.account_name) {
                   state.landInfo.personal_land.push(element)
                }
                if (element.type == 5) {
                  state.landInfo.zhongjiang = true
                } else  if (element.type == 6) {
                    state.landInfo.zhongjiang = false;
                }

                state.landInfo.current_landlist.push(element)
            });
            state.landInfo.landNum = state.personal_land.length;
    
            if ( state.landInfo.blackLandArray == 1) {
                state.landInfo.blackLand =  state.landInfo.blackLandArray[0]
            } else {
                state.landInfo.blackLand =  state.landInfo.blackLandArray[0] +'  ' + state.landInfo.blackLandArray[1] 
            }
        },
        setGameInfo(state,info) {
          let currentTime = Date.parse(new Date());
          let beginTime = parseInt(info.beginTime) * 1000
          let endTime = parseInt(info.endTime) * 1000
          if (currentTime > beginTime && currentTime < endTime) {
               /**
               * 
               * 游戏正在进行中，倒计时
               * 
              */
              state.gameInfo.gameCount = parseInt(new Date(endTime) - new Date().getTime())
              state.gameInfo.gameState = 1;

          } else if (currentTime < beginTime && currentTime < endTime){
              /**
               * 
               * 游戏未开始，倒计时
               * 
              */
              state.gameInfo.gameCount = parseInt( new Date(beginTime) - new Date().getTime())
              state.gameInfo.gameState = 0;
          } else if (currentTime > endTime) {
              /**
               * 
               * 游戏已结束，正在结算中
               * 
              */
              state.gameInfo.gameCount = 0
              state.gameInfo.gameState = 2;
          }
          if (state.gameInfo.gameState == 0) {
            state.gameInfo.gameMessage = "距离游戏开始还有："
          } else if (state.gameInfo.gameState == 1) {
            state.gameInfo.gameMessage = "游戏正在进行，距离结束还有："
          } else if (state.gameInfo.gameState == 2) {
            state.gameInfo.gameMessage  = "游戏暂未开始，请稍后"
         }
        },
         //获取游戏内账户信息
         setGameBalance(state,accountlist,account_name) {
          accountlist.forEach(element => {
              if (element.player == account_name) {
                  state.landInfo.game_balance = element.balance / 10000 
              }
          });
        },
        setTouzhuRows(state,data) {
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
              } else if (parseInt(element.type) == 5) {
                  element.type = '抽奖获得土地' + element.landID + "成功" 
              } else if (parseInt(element.type) == 6) {
                  element.type = '抽奖失败，下次再来哦'
              }
              rows.push(element)
          });
         state.landInfo.touzhuRows = rows
      },
    },
    modules: {

    },
    actions: {
        initScatter ({ commit, dispatch }, scatter) {
            commit('setScatter', scatter)
        }, 
        updateBalance ({ commit }) {
            getMyBalancesByContract({ symbol: 'eos' })
              .then((price) => {
                commit('setBalance', { symbol: 'eos', balance: price[0] })
              })
            getMyBalancesByContract({ symbol: 'len', tokenContract: 'lemoniotoken' })
              .then((price) => {
                commit('setBalance', { symbol: 'len', balance: price[0] })
              })
        },  
        setTokenInfo({ commit }) {
          getLenTokenInfo()
            .then((result)=>{
                if (!result.is_error) {
                   commit('setLenDetail',result.data)
                }
            })
        },
        setIdentity ({ commit, dispatch }, identity) {
          commit('setIdentity', identity)
          dispatch('updateBalance')
          dispatch('setTokenInfo')
        },
        sellToken({commit,dispatch},quantity ) {
          sellLen(quantity).then((result)=>{
            if (!result.is_error) {
              alert('兑换成功')
              dispatch('updateBalance')
              dispatch('setTokenInfo')
            }
          })
        },
        async buyLand({commit,dispatch},amount = 1, memo = '我的土地我做主', tokenSymbol = 'EOS') {
          let result = await transfer(amount,memo,tokenSymbol)
          if (result.is_error) {
            alert(JSON.stringify(result.msg))
          } else {
            dispatch('getGameBalance')
            dispatch('getTouzhuInfo')
            dispatch('setLandInfo')
            alert('下注成功！')
          }
        },
        async recastLand({commit,dispatch},amount = 1, memo = '我的土地我做主', tokenSymbol = 'EOS') {
           let result = await recast(amount,memo,tokenSymbol)
           if (result.is_error) {
              alert(JSON.stringify(result.msg))
           } else{
            dispatch('getGameBalance')
            dispatch('getTouzhuInfo')
            dispatch('setLandInfo')
            alert('下注成功！')
           }
        },
        async withdraw ({commit,dispatch}) {
          let result = await withdraw()
          if (result.is_error) {
             alert(JSON.stringify(result.msg))
          } else {
            dispatch('getGameBalance')
            alert('提现成功')
          }
        },
         //获取玩家的信息
        async getGameBalance({commit,dispatch},account_name){
           let res = await getPlayerList()
           if (res.is_error) {
               return;
           }
           let rows = res.data.rows
           if (!rows) {
               return;
            }
            commit('setGameBalance',rows,account_name)
       },
       async getTouzhuInfo({commit,dispatch}) {
            let res = await get_touzhu_info()
            if (res.is_error) {
             return;
            }
            let touzhurows = res.data.rows
            commit('setTouzhuRows',touzhurows);
       },
        async setLandInfo({commit,dispatch}) {

          let landlist = await getLandInfo()
          let counterlist = await getGameInfoList()
          if (landlist.is_error || counterlist.is_error) {
             return;
          }
          let landrows = landlist.data.rows
          let countrows = counterlist.data.rows;
 
          commit('setLandInfo',{
            "land":landrows,
            "count":countrows
          })
        },
        async setGameInfo({commit,dispatch}) {
          let counterlist = await getGameInfoList()
          if (!counterlist.is_error) {
              commit('setGameInfo',counterlist.data.rows[0])
          } 
        }
    }
})