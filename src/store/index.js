import Vue from 'vue'
import vuex from 'vuex'
Vue.use(vuex);
import Eos from 'eosjs'
import { network } from '../config'
import {getMax,formatDate} from '../utils/utils'
import {update_manifesto,query_manifesto,manifest_empor} from '../services/get_data_service';
import { getMyBalancesByContract, getLenTokenInfo,sellLen,
  getGameInfoList,getLandInfo,transfer,getPlayerList,get_touzhu_info,recast,withdraw,sellMyLand,get_fenhong_info} from '../blockchain'

import axios from 'axios'
import qs from 'qs';
import { debug } from 'util';
import { stat } from 'fs';

export default new vuex.Store({
    state: {
        scatter: null,
        identity: null,
        eos: null,
        account_name:'',
        
       
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
          minPrice:1,
          blackLand:'',
          personal_land:[],
          zhongjiang:[],
          landNum:0,
          current_landlist:[],
          poolBalace:0,
          touzhuRows:[],
          game_balance:0,
          manifesto:'我的土地我做主',
          manifestoEmpor:'',
          blackLandArray:[],
          manifestoMap:new Map(),
          accTotal:0,
          emperor: {
            "account":"",
            "num":0
          }
        },
        gameInfo : {
          gameCount :0,
          gameState: 0,
          gameMessage:'',
          avgBonusBalance:0,
          todayBonus:0
        }
    },
    getters: {
        account: ({ scatter }) => {
          if (!scatter) { 
            return null 
          }
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
          state.account_name = identity.accounts.find(({ blockchain }) => blockchain === 'eos').name;
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
        setFenhongRows(state,data) {
          let fenhong = data[0]
          state.gameInfo.avgBonusBalance = fenhong.avgBonusBalance / 10000
        },
        setGlobal (state, globalInfo) {
          state.globalInfo = globalInfo
        },
        setLandInfo(state,data) {

          state.landInfo.personal_land = []
            state.landInfo .current_landlist = []

            let landrows = data.land;
          
            state.landInfo.emperor = getMax(landrows)
          
          
            landrows.forEach((element,i) => {
    
                if (element.roundNum != state.landInfo.roundNum){
                  //  return;
                }
                if (element.owner == state.account_name) {
                   state.landInfo.personal_land.push(element)
                }
                state.landInfo.current_landlist.push(element)
            });
            state.landInfo.landNum = state.landInfo.personal_land.length;
            let oneLand =(state.landInfo.poolBalace / 3.0 ) / state.landInfo.current_landlist.length;
            state.gameInfo.todayBonus = oneLand.toFixed(4);
            
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
   
          state.landInfo.poolBalace = info.potBalance /  10000 
          
          if (state.gameInfo.gameState == 0) {
            state.gameInfo.gameMessage = "距离游戏开始还有："
          } else if (state.gameInfo.gameState == 1) {
            state.gameInfo.gameMessage = "游戏正在进行，距离结束还有："
          } else if (state.gameInfo.gameState == 2) {
            state.gameInfo.gameMessage  = "游戏暂未开始，请稍后"
         }
        },
         //获取游戏内账户信息
         setGameBalance(state,accountlist,account_name,manifest) { 
           console.log(manifest)
         // state.landInfo.manifestoEmpor = manifest
          accountlist.forEach(element => {
              if (element.player == state.account_name) {
                  state.landInfo.game_balance = element.balance / 10000 
                  state.landInfo.accTotal = element.accTotal / 10000
              }
          });
        },
        setEmporName(state,manifest) {
          console.log("3333"+manifest)
          state.landInfo.manifestoEmpor = manifest
        },
        setTouzhuRows(state,data) {
          let rows = [];
          data.forEach((element,i) => {
              if (element.amount > 1000000) {
                element.amount = 0
              }
              if (state.landInfo.manifestoMap.has(element.player)) {
                element.manifesto = state.landInfo.manifestoMap.get(element.player);
              }else {
                element.manifesto = "天下英雄谁敌手？这是朕的江山！"
              }
             
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
          dispatch('getGameBalance')
          dispatch('getFenHongInfo')
        },
        sellToken({commit,dispatch},quantity ) {
          sellLen(quantity).then((result)=>{
            if (!result.is_error) {
              alert('兑换成功')
              dispatch('updateBalance')
              dispatch('setTokenInfo')
              dispatch('getFenHongInfo')
            }
          })
        },
        async buyLand({commit,dispatch},data) {
          let result = await transfer(data[0],data[1])
          if (result.is_error) {
            alert(JSON.stringify(result.msg))
          } else {
            dispatch('updateBalance')
            dispatch('getGameBalance')
            dispatch('getTouzhuInfo')
            dispatch('setLandInfo')
            dispatch('getFenHongInfo')
            alert('下注成功！')
          }
        },
        async sellLand({commit,dispatch},landID) {
          let result = await sellMyLand(landID)
          if (result.is_error) {
            alert(JSON.stringify(result.msg))
          } else {
            dispatch('updateBalance')
            dispatch('getGameBalance')
            dispatch('getTouzhuInfo')
            dispatch('setLandInfo')
            dispatch('getFenHongInfo')
            alert('卖出1块土地成功')
          }
        },
        async recastLand({commit,dispatch},data) {
           let result = await recast(data[0],data[1])
           if (result.is_error) {
              alert(JSON.stringify(result.msg))
           } else{
            dispatch('updateBalance')
            dispatch('getGameBalance')
            dispatch('getTouzhuInfo')
            dispatch('setLandInfo')
            dispatch('getFenHongInfo')
            alert('下注成功！')
           }
        },
        async withdraw ({commit,dispatch}) {
          let result = await withdraw()
          if (result.is_error) {
             alert(JSON.stringify(result.msg))
          } else {
            dispatch('updateBalance')
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
            let manifesto = await manifest_empor(account_name)
            state.landInfo.manifestoEmpor = manifesto
            console.log("22222"+manifesto)
            commit('setEmporName',manifesto)
            commit('setGameBalance',rows,account_name,manifesto)
       },
       async getTouzhuInfo({commit,dispatch,state}) {
            let res = await get_touzhu_info()
           
            let mani_res = await query_manifesto()
            debugger
            let map = new Map();
            if ( mani_res && mani_res.length > 0) {
              mani_res.forEach((element,i)=> {
                if(mani_res.player == state.account_name) {
                  state.landInfo.manifesto = mani_res[0].manifesto
                }
                state.landInfo.manifestoMap.set(state.account_name,element.manifesto)
              })
            }
            if (res.is_error) {
             return;
            }
            let touzhurows = res.data.rows
            commit('setTouzhuRows',touzhurows);
       },
       async getFenHongInfo({commit,dispatch}) {
            let res = await get_fenhong_info()
            if (res.is_error) {
              return;
            } 
            let fenhongros = res.data.rows
            commit('setFenhongRows',fenhongros);
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