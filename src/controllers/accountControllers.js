
const path=require('path')

//链接数据
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'szoffice'


/**
 * 最终处理  展示login 页面
 */
exports.getLoginPage=(req,res)=>{
    res.sendFile(path.join(__dirname,'../statics/views/login.html'))
}

/**
 * 最终处理，返回注册页面给浏览器
 */
exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../statics/views/register.html"))
  };
  
  /**
 * 最终处理，返回注册页面给浏览器
 */
exports.register = (req, res) => {
 //默认 的返回状态
  const result={
       "status":0,
       "message":"注册成功"
  }
      
 // Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName);
    const collection = db.collection('accountInfo');

     //先查询 数据库中间是不是有这个账号名 
    
     collection.findOne({username:req.body.username}).toArray(function(err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs);
        callback(docs);
      });
    client.close();
  }); 
}
