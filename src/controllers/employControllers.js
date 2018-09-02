const path = require('path')
const xtpl = require('xtpl')


//连接 tools
const databasetool = require(path.join(__dirname, '../tools/dataBaseTools.js'))

/**
 * 最终处理，返回获取到的员工列表页面
 */
// exports.getList = (req, res) => {
//     const keyword = req.query.keyword || ''
//     // Use connect method to connect to the server
//     console.log('ddda')
//     databasetools.findList (
//         'employInfo',
//         {name:{$regex:keyword}},
//         (err,docs)=>{
//             xtpl.renderFile(path.join(__dirname, '../statics/views/list.html'), {
//             employ: docs,
//             keyword,
//             loginName:req.session.loginName
//         }, function (error, content) {
//             res.send(content)
//         })
//     })

// }


exports.getList = (req, res) => {
    // res.send("这是学生列表页面,待完善...")

    const keyword = req.query.keyword || ''
    //调用databasetool.findlist 的方法 渲染list 列表  返回浏览器
    databasetool.findList('employInfo', { name: { $regex: keyword } }, (err, docs) => {
        xtpl.renderFile(path.join(__dirname, '../statics/views/list.html'), {
            employs: docs,
            keyword,
            loginName: req.session.loginName
        }, function (error, content) {
            res.send(content)
        });

    })
}


exports.addList = (req, res) => {
    // res.send("这是学生列表新增页面,待完善...")
    //z直接渲染
    xtpl.renderFile(path.join(__dirname, '../statics/views/add.html'), {
        loginName: req.session.loginName
    }, function (error, content) {
        res.send(content)
    });
}


//增加数据
exports.addListData = (req, res) => {
    // 定义一个函数
    databasetool.insertList('employInfo', req.body, (err, result) => {
        if (err) {//插入失败
            res.send("<script>alert('插入失败')</script>")
        } else {
            res.send("<script>window.location.href='/employ/list'</script>")
        }
    })
}

//4.修改信息页面展示
exports.editListpage = (req, res) => {
 
    databasetool.findOne('employInfo',
        { _id:  databasetool.ObjectId(req.params.employId) },
        (err, doc) => {
            //渲染
            xtpl.renderFile(path.join(__dirname, '../statics/views/edit.html'), {
                loginName: req.session.loginName,
                employ:doc
            }, function (error, content) {
                res.send(content)
            });
        })
}

//5. 提交修改信息
exports.editList = (req, res) => {
    databasetool.updateList(
        'employInfo',
        { _id:  databasetool.ObjectId(req.params.employId) },  
        req.body,
        (err, result) => {
            if(result==null){//修改失败
                res.send("<script>alert('修改失败')</script>")
            }else{
                res.send("<script>window.location.href='/employ/list'</script>")  
            }
        }
 )}


 //6. 删除某一项
 exports.deleteList=(req,res)=>{
    databasetool.deleteList(
        'employInfo',
        { "_id": databasetool.ObjectId(req.params.employId) },  
        (err, result) => {
            if(result==null){//修改失败
                res.send("<script>alert('删除成功')</script>")
            }else{
                res.send("<script>window.location.href='/employ/list'</script>")  
            }
        })
 }