const express = require('express')
const router = express.Router()
const Menifesto = require('../models/manifesto')

// 查询所有的签到记录
router.get('/manifesto',(req,res)=>{
    Menifesto.find({})
    .sort({logtime : -1})
    .then(gamelog => {
        res.json(gamelog)
    })
    .catch(err => {
        res.json(err)
    })
})

//根据用户名查询投注记录
router.get('/manifesto/:player',(req,res)=>{
    console.log(req.params.account)
    Menifesto.find({account:req.params.account})
    .sort({created_at : -1})
    .then(signs => {
        res.json(signs)
    })
    .catch(err => {
        res.json(err)
    })
})

//添加签到情况
router.post('/manifesto', (req, res) => {
    //使用Movie model上的create方法储存数据
    console.log(111111111)
    console.log(req.body.player)
    console.log(22222222)
    Menifesto.create(req.body, (err, menifesto) => {
      if (err) {
        res.json(err)
      } else {
        res.json(menifesto)
      }
   })
})

module.exports = router