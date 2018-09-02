const MongoClient = require('mongodb').MongoClient

const ObjectId = require("mongodb").ObjectId
exports.ObjectId = ObjectId
// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'szoffice';


/**
 * 最终处理 渲染数据库的 数据 list
 * collectionName--数据表 名字
 * parmas--数据内容
 * callback--返回内容
 */
exports.findList = (collectionName, params, callback) => {
    MongoClient.connect(url,
        { useNewUrlParser: true },
        function (err, client) {
            // 拿到db对象
            const db = client.db(dbName);
            // 拿到集合
            const collection = db.collection(collectionName);
            // 查询
            collection.find(params).toArray((err, docs) => {
                // console.log(docs)
                // 关闭与数据库的连接 
                client.close();
                callback(err, docs)
            }
            )
        })
    }
/**
 * 新增数据
 */
exports.insertList=(collectionName,params,callback)=>{
    MongoClient.connect(url,
        { useNewUrlParser: true },
        function (err, client) {
            // 拿到db对象
            const db = client.db(dbName);
            // 拿到集合
            const collection = db.collection(collectionName);
            // 查询
            collection.insert(params,(err, result) => {
                // console.log(docs)
                // 关闭与数据库的连接 
                client.close();
                callback(err, result)
            })
        })
    } 

/**
 * 编辑的页面 查找当前的数据项
 */
exports.findOne=(collectionName,params,callback)=>{
 
    MongoClient.connect(url,
        { useNewUrlParser: true },
        function (err, client) {
            // 拿到db对象
            const db = client.db(dbName);
            // 拿到集合
            const collection = db.collection(collectionName);
            // 查询
            collection.findOne(params,(err,doc) => {
                // 关闭与数据库的连接 
                client.close();
                //把结果返回给 控制器
                callback(err, doc)
            })
        })
}


/**
 * 更新 信息
 */
exports.updateList=(collectionName,condition,params,callback)=>{
    MongoClient.connect(url,
        { useNewUrlParser: true },
        function (err, client) {
            // 拿到db对象
            const db = client.db(dbName);
            // 拿到集合
            const collection = db.collection(collectionName);
            // 查询
            collection.updateOne(condition,{$set:params},(err,result) => {
                // 关闭与数据库的连接 
                client.close();
                //把结果返回给 控制器
                callback(err, result)
            })
        })
}

/**
 * 删除
 */
exports.deleteList=(collectionName,condition,callback)=>{
    MongoClient.connect(url,
        { useNewUrlParser: true },
        function (err, client) {
            // 拿到db对象
            const db = client.db(dbName);
            // 拿到集合
            const collection = db.collection(collectionName);
            // 查询
            collection.deleteOne(condition,(err,result) => {
                // 关闭与数据库的连接 
                client.close();
                //把结果返回给 控制器
                callback(err, result)
            })
        })
}