const express = require('express')
const mongoose = require('./db/index')
const crypto = require('crypto');
const bufferEq = require('buffer-equal-constant-time');

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
var webhookHandler = GithubWebHook({path:'/delopy',secret:'lemoneosgame@abc'})

/**
 * Helper functions
 */
function signData(secret, data) {
	return 'sha1=' + crypto.createHmac('sha1', secret).update(data).digest('hex');
}

function verifySignature(secret, data, signature) {
	return bufferEq(new Buffer(signature), new Buffer(signData(secret, data)));
}


app.use('/deploy',function(req,res){
    let id = req.headers['x-github-delivery'];
		if (!id) {
			console.log('No id found in the request');
    }
    console.log('start to get push')

		let event = req.headers['x-github-event'];
		if (!event) {
      console.log('No event found in the request');
      res.send('No event found in the request')
      return
		}

		let sign = req.headers['x-hub-signature'] || '';
		if (!sign) {
      console.log('No signature found in the request');
      res.send('No signature found in the request')
      return
		}

		if (!req.body) {
      res.send('Make sure body-parser is used')
      return
    }
  
		// verify signature (if any)
		if ( !verifySignature('lemoneosgame@abc', JSON.stringify(req.body), sign)) {
      console.log('Failed to verify signature');
    }
    console.log('siginature successful')

		// parse payload
		let payloadData = req.body;
		const repo = payloadData.repository && payloadData.repository.name;
    run_cmd('sh',['./deploy.sh'],function(text){
      console.log(text)
      res.send(text)
    })
})

function run_cmd(cmd,args,callback) {
  console.log('cmd start....')
  var spawn = require('child_process').spawn;
  var child = spawn(cmd,args)
  var resp = "";

  console.log('cmd processing....')

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
