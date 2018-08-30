// 导入模块
const express=require('express')
const path=require('path')
const bodyParser=require('body-parser');
const session = require('express-session')

// 创建 应用
const app= express()

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(bodyParser.json());

// Use the session middleware
// app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 600000 }}))
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: false, cookie: { maxAge: 600000 } }))

// 集成路由
 const accountRouter=require(path.join(__dirname,'./routers/accountRouter.js'))
 app.use('/account', accountRouter)

// 开启服务
app.listen(3000,'127.0.0.1',err=>{
    if(err){
        console.log(err)
    }else{
        console.log('start ook')
    }
})

