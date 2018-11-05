const express = require('express')
const router = express.Router()
const User = require('../models/user')

// 查询所有的签到记录
router.get('/forum/user',(req,res)=>{
    User.find({})
    .sort({logtime : -1})
    .then(gamelog => {
        res.json(gamelog)
    })
    .catch(err => {
        res.json(err)
    })
})

//根据用户名查询投注记录
router.get('/forum/user/:id',(req,res)=>{
    console.log(req.params.id)
    Counter.find({account:req.params.id})
    .sort({created_at : -1})
    .then(signs => {
        res.json(signs)
    })
    .catch(err => {
        res.json(err)
    })
})

//添加签到情况
router.post('/forum/user', (req, res) => {
    //使用Movie model上的create方法储存数据
    console.log(req.body)
    Counter.create(req.body, (err, counter) => {
      if (err) {
        res.json(err)
      } else {
        res.json(counter)
      }
   })
})

module.exports = router