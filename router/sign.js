const express = require('express')
const router = express.Router()
const Signs = require('../models/signs')

// 查询所有的签到记录
router.get('/signs',(req,res)=>{
    Signs.find({})
    .sort({created_at : -1})
    .then(sign => {
        res.json(sign)
    })
    .catch(err => {
        res.json(err)
    })
})

//根据用户名查询所有的签到情况
router.get('/signs/:account',(req,res)=>{
    console.log(req.params.account)
    Signs.find({account:req.params.account})
    .sort({created_at : -1})
    .then(signs => {
        res.json(signs)
    })
    .catch(err => {
        res.json(err)
    })
})

//添加签到情况
router.post('/signs', (req, res) => {
    //使用Movie model上的create方法储存数据
    Signs.create(req.body, (err, sign) => {
      if (err) {
        res.json(err)
      } else {
        res.json(sign)
      }
   })
})

module.exports = router