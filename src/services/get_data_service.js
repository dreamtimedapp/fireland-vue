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

//获取更新誓言

export const query_manifesto  = async (account) => {
    let account_name = ""
    if (account) {
        account_name = account;
    }
    return axios.get('/api/manifesto/'+account_name)
    .then(response => {
        return response.data;
    })
    .catch(err=>{
        console.log(err);
    })
}

//更新誓言
export const update_manifesto = async(account,manifesto)=> {
    let data = qs.stringify({
        'player': account,
        "manifesto": manifesto
    })
    return await axios.post('/api/manifesto',data,{headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
    .then(response => {
       return true
    })
    .catch(function (error) {
        return false
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

export const if_people_sign = async (account_name) => {
    let accountResult = await get_sign_from_account(account_name);
    let isAlreadySign = false;
    if (accountResult && accountResult.length > 0 ) {
        accountResult.forEach(element => {
           if( new Date(element.created_at).getDate() == new Date().getDate()) {
              isAlreadySign = true;
           }
        });
    }

    if (isAlreadySign) {
        return true;
    } else {
       return false;
    }
}

export const sign_onday = async (account_name)=> {
    let data = qs.stringify({
        'account': account_name
    })
    return await axios.post('/api/signs',data,{headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
    .then(response => {
       return true
    })
    .catch(function (error) {
        return false
    });
}

// 更新gamelog表

export const add_counter = async (player)=> {

    let data = qs.stringify({
        'player': player,
    })
    axios.post('/api/counter',data,{headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
    .then(function (response) {
       //alert("更新投注情况成功")
    })
    .catch(function (error) {
       // alert(error)
    });
}

// 更新gamelog表

export const add_gamelog = async (player,amount,type,beilv)=> {

    let data = qs.stringify({
        'player': player,

        "amount" : amount,
        "type" : type,
        "beilv":beilv
    })

    axios.post('/api/gamelog',data,{headers: { 'Content-Type': 'application/x-www-form-urlencoded' }})
    .then(function (response) {
       //alert("更新投注情况成功")
    })
    .catch(function (error) {
       // alert(error)
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