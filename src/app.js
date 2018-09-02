// 导入模块
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser');
const session = require('express-session')

// 创建 应用
const app = express()

app.use(bodyParser.json());

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Use the session middleware
// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 600000 }}))
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: false, cookie: { maxAge: 600000 } }))

//判断登录的情况  要在入口函数中最好
app.all('/*', function (req, res, next) {
    if(req.url.includes('account')){
        next()
    }else{
        if(req.session.loginName){
            next()
        }else{
               //新增成功
      res.send(`<script>alert('还未登录，请登录');window.location.href="/account/login"</script>`);
        }
    }
})


// 集成路由
const accountRouter = require(path.join(__dirname, '/routers/accountRouter.js'))
const employRouter = require(path.join(__dirname, '/routers/employRouter.js'))

app.use('/account', accountRouter)
app.use('/employ', employRouter)

// 开启服务
app.listen(3000, '127.0.0.1', err => {
    if (err) {
        console.log(err)
    } else {
        console.log('start ook')
    }
})

