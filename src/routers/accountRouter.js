//1.account 
const express=require('express')
const path=require('path')

//2. 创建路由
const accountRouter=express.Router()

// 导入控制器
const accountCTRl=require(path.join(__dirname,'../controllers/accountControllers.js'))
//3.处理具体请求
//1.展示 登录页面
accountRouter.get('/login',accountCTRl.getLoginPage)

//2.展示注册页面
accountRouter.get('/register',accountCTRl.getRegisterPage)

//3.注册 请求
accountRouter.post('/register',accountCTRl.register)

//4.获取 图形验证码
accountRouter.get('/vcode',accountCTRl.getVcodeImage)

//5. 传输登录数据给服务器,
accountRouter.post('/login',accountCTRl.login)

// 4.导出
module.exports = accountRouter