const path = require('path')
const captchapng = require('captchapng');


//链接数据
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017'

// Database Name
const dbName = 'szoffice'


/**
 * 最终处理  展示login 页面
 */
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../statics/views/login.html'))
};

/**
 * 最终处理，返回注册页面给浏览器
 */
exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, "../statics/views/register.html"))
};

/**
* 最终处理，返回注册结果
*/
exports.register = (req, res) => {
    //默认 的返回状态
    const result = {
        "status": 0,
        "message": "注册成功"
    }

    // Use connect method to connect to the server
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection('accountInfo');

        //先查询 数据库中间是不是有这个账号名 
        collection.findOne({ username: req.body.username }, function (err, doc) {
            if (doc) {
                client.close();//关闭数据库
                result.status = 1;
                result.message = "用户已经存在";
                //返回 数据给浏览器 
                res.json(result)
            } else {
                // 如果数据库中不存在  则生成一条数据‘
                collection.insertOne({ username: req.body.username, password: req.body.password }, function (err, result2) {
                    // console.log(result)
                    if (result2 === null) {

                        result.status = 2;
                        result.message = "用户注册失败";

                    }
                    res.json(result)
                })
            }

        });

    });
};

/**
* 最终处理，图案验证处理
*/
exports.getVcodeImage = (req, res) => {
    // console.log('dd')
    const vcode = parseInt(Math.random() * 9000 + 1000);

    // 把刚刚随机生成的验证码，存储到session中
    req.session.vcode = vcode;

    var p = new captchapng(80, 30, vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0); // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)

    var img = p.getBase64();
    var imgbase64 = new Buffer(img, "base64");
    res.writeHead(200, {
        "Content-Type": "image/png"
    });
    res.end(imgbase64);
}

/**
* 最终处理，登录
*/
exports.login = (req, res) => {
    //默认的返回状态
    const result = { "status": 0, "message": "登录成功" }

    // 判断 vcode 是否正确
    if (req.body.vcode != req.session.vcode) {
        result.status = 1;
        result.message = "验证码不正确";
        
      // 返回结果
       res.json(result);
       // 结束 运行
       return
    }

    // 判断数据库中间有这组数据
    // Use connect method to connect to the server
    MongoClient.connect(url,
        {useNewUrlParser:true},
         function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection('accountInfo');

        //先查询 数据库中间是不是有这个账号名 

        collection.findOne({ username: req.body.username, password: req.body.password }, function (err, doc) {
            client.close();//关闭数据库
            if (doc == null) {          
                result.status = 2;
                result.message = "用户名和密码有误";
                //返回 数据给浏览器 
            } 
                res.json(result)
    })

    });
}