const express = require('express')
const router = express.Router()
const GameLog = require('../models/gamelog')

// 查询所有的签到记录
router.get('/gamelog',(req,res)=>{
    GameLog.find({})
    .sort({logtime : -1})
    .then(gamelog => {
        res.json(gamelog)
    })
    .catch(err => {
        res.json(err)
    })
})

//根据用户名查询投注记录
router.get('/gamelog/:player',(req,res)=>{
    console.log(req.params.player)
    GameLog.find({player:req.params.player})
    .sort({created_at : -1})
    .then(signs => {
        res.json(signs)
    })
    .catch(err => {
        res.json(err)
    })
})

//添加签到情况
router.post('/gamelog', (req, res) => {
    //使用Movie model上的create方法储存数据
    console.log(req.body)
    GameLog.create(req.body, (err, gamelog) => {
      if (err) {
        res.json(err)
      } else {
        res.json(gamelog)
      }
   })
})

module.exports = router