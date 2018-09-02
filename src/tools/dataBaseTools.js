const MongoClient = require('mongodb').MongoClient
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
            }
            )
        })
    } 
}


