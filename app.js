const express = require('express')
const mongoose = require('./db/index')

const app = express()

const index = require('./router/index')
const signs = require('./router/sign')
const gamelog = require('./router/gamelog')
const bodyParser = require('body-parser')
// 引入文件模块
const fs = require('fs');

// 引入处理路径的模块
const path = require('path');

//引入github hooker
var GithubWebHook = require('express-github-webhook')
var webhookHandler = GithubWebHook({path:'/deploy',secret:'lemoneosgame@abc'})


app.use(webhookHandler); // use our middleware

webhookHandler.on('*', function (event, repo, data) {
});

webhookHandler.on('event', function (repo, data) {
  console.log("event on somthing" + "repo:" + repo + "data:" + data)
  run_cmd('sh',['./deploy.sh'],function(text){
    console.log(text)
  })
});

webhookHandler.on('reponame', function (event, data) {
  console.log("reponame on somthing" + "event:" + event + "data:" + data)
});

webhookHandler.on('error', function (err, req, res) {
});

function run_cmd(cmd,args,callback) {
  var spawn = require('child_process').spawn;
  var child = spawn(cmd,args)
  var resp = "";

  child.stdout.on('data',function(buffer){
    resp +=  buffer.toString();
  })
  child.stdout.on('end',function(){
    callback(resp)
  });
}


// 访问静态资源文件 这里是访问所有dist目录下的静态资源文件
app.use(express.static(path.resolve(__dirname, './dist')))
// 因为是单页应用 所有请求都走/dist/index.html
app.get('/', function(req, res) {
    const html = fs.readFileSync(path.resolve(__dirname, './dist/index.html'), 'utf-8')
    res.send(html)
})


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

app.listen(3000, (req,res) => {
})
