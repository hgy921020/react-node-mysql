const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql');

app.use(cors())

const mycont = mysql.createConnection({
    host:'127.0.0.1',
    port:'3308',
    user:'root',
    password:'123456',
    database:'todo_schema'
})
mycont.connect();

// let addsql = "insert into todo_table (content) values ('张三丰')"
// // connection.query
// mycont.query(addsql,(err,retult)=>{
//     if(err){
//         console.log('插入失败')
//     }
//     console.log(retult)
// })

app.get('/',(req,res)=>{//加载页面内容接口
    let sqldata = 'select * from todo_table'   
    mycont.query(sqldata,(err,result)=>{
        if(err){
            res.send({
                code:0,
                msg:'加载失败'
            })
        }
            res.send({
                code:1,
                msg:'加载成功',
                data:result
            })
    })
})

app.get('/add',(req,res)=>{//添加内容到数据库接口
    // console.log(req.query);
    let content = req.query.content;
    // console.log(content);
    let addmysql = `insert into todo_table (content,isEdit,isCheck) values ('${content}',false,false)`
    mycont.query(addmysql,(err,result)=>{
        if(err){
            res.send({
                code:0,
                msg:'发布失败'
            })
            return false;
        }
        res.send({
            code:1,
            msg:'发布成功',  
            insertid:result.insertid        
        })
        console.log('result='+result);
    })

})

app.get('/check',(req,res)=>{
    // console.log(req.query);
    let {id,check} = req.query;
    let newcheck = `update todo_table set isCheck=${check} where id=${id}` 
    mycont.query(newcheck,(err,result)=>{
        if(err){
            res.send({
                code:0,
                msg:'设置失败'
            })
            return false
        }
            res.send({
                code:1,
                meg:'设置成功'
            })
    })
})

app.get('/edit',(req,res)=>{
    console.log(req.query.id+''+req.query.content);
    let {id,content} = req.query;
    let updateEdit =`update todo_table set content="${content}" where id=${id}`
    mycont.query(updateEdit,(err,result)=>{
        if(err){
            res.send({
                code:0,
                msg:'编辑失败'
            })
        }
            res.send({
                code:1,
                msg:'编辑成功'
            })
    })
    // res.send('接口调用成功')

    // let updateEdit = `update todo_table set content=${content} where id=${id}`;
    // mycont.query(updateEdit,(err,result)=>{
    //     if(err){
    //         res.send({
    //             code:0,
    //             msg:'编辑失败'
    //         })
    //         return false
    //     }
    //         res.send({
    //             code:1,
    //             msg:'编辑成功'
    //         })
    // })
})
app.listen(8000);