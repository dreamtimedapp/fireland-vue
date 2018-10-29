import axios from 'axios'
import qs from 'qs';
import store from '../store'

//获取全部签到记录
export const  get_sign_all = async ()=> {
  axios.get('/api/signs')
  .then(function (response) {
    alert(JSON.stringify(response.data))
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const get_sign_from_account = async (account)=> {
   return axios.get('/api/signs/'+account)
    .then(response => {
        return response.data;
    })
    .catch(err=>{
        console.log(err);
    })
}

export const sign_onday = async ()=> {
    let account = store.state.HomeStore.home_account_name;
    if (!account) {
        alert('请使用scatter登录后再进行签到')
        return;
    }
    let accountResult = await get_sign_from_account(account);
    let isAlreadySign = false;
    if (accountResult && accountResult.length > 0 ) {
        accountResult.forEach(element => {
           if( new Date(element.created_at).getDate() == new Date().getDate()) {
              isAlreadySign = true;
           }
        });
    }
    if (isAlreadySign) {
        alert("您今天已经签到，请明天再来")
        return;
    } else {
       // 使用团队账户进行智能合约转账
    }
    let data = qs.stringify({
        'account': store.state.HomeStore.home_account_name
    })
    if (!account) {
        alert('请登录后再进行签到')
    }
    axios.post('/api/signs',data,{headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
    .then(function (response) {
       alert("签到成功")
    })
    .catch(function (error) {
    });
}


// 更新gamelog表

export const add_gamelog = async (player,landID,amount,type)=> {
    let data = qs.stringify({
        'player': store.state.HomeStore.account,
        'landID' : landID,
        "amount" : amount,
        "type" : type
    })
    axios.post('/api/gamelog',data,{headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
    .then(function (response) {
       alert("更新投注情况成功")
    })
    .catch(function (error) {
    });
}

/**
 *  查询用户用户投注情况
 *  @player 账户名称
 * 
*/
export const get_game_log = async (player) => {
    return axios.get('/api/gamelog/'+player)
    .then(response => {
        return response.data;
    })
    .catch(err=>{
        console.log(err);
    })
}