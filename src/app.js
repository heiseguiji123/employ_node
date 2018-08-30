// 导入模块
const express=require('express')
const path=require('path')

// 创建 应用
const app= express()

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

