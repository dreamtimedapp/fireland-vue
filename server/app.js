const express = require('express')
const mongoose = require('./db/index')

const app = express()

const index = require('./router/index')
const signs = require('./router/sign')
const gamelog = require('./router/gamelog')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({
  extended: false
}))
// 前端实现跨域请求
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.send(200); /*让options请求快速返回*/
  } else {
    next();
  }
})

app.use('/',index)
app.use('/api',signs)

app.use('/api',gamelog)



app.listen(3000, () => {
  console.log('TEST')
})
