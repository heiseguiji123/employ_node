//1.account 
const express=require('express')
const path=require('path')

//2. 创建路由
const employRouter=express.Router()

// 导入控制器
const employCTRl=require(path.join(__dirname,'../controllers/employControllers.js'))
//3.处理具体请求

//1.展示 登录页面
employRouter.get('/list',employCTRl.getList)

//2. 新增功能 展示页面
employRouter.get('/add',employCTRl.addList)

//3.新增加
employRouter.post('/add',employCTRl.addListData)
 
//4.修改信息页面 
employRouter.get('/edit/:employId',employCTRl.editListpage)

//5. 提交修改信息
employRouter.post('/edit/:employId',employCTRl.editList)

//6.删除 数据项
employRouter.get('/delete/:employId',employCTRl.deleteList)

// 4.导出
module.exports = employRouter