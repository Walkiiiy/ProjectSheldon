const express = require('express');
const mysql=require('mysql');
const fs = require('fs');
const crypto = require('crypto');
const { error } = require('console');
const session = require('express-session');
const config = require('./config');
const app = express();
const port = 4000;
//设置CORS
app.all('*',function (req, res, next) {
  res.header('Access-Control-Allow-Origin','*'); //当允许携带cookies此处的白名单不能写’*’
  res.header('Access-Control-Allow-Headers','content-type,Content-Length, Authorization,Origin,Accept,X-Requested-With'); //允许的请求头
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT'); //允许的请求方法
  next();
});

app.use(express.json()); // 用于解析application/json类型的数据
app.use(express.urlencoded({ extended: true })); // 用于解析application/x-www-form-urlencoded类型的数据
app.use(session({
    secret: 'ThisIsTheSessionKeyOfProjectsheldon', // 用于签名会话ID的秘钥
    resave: false, // 强制保存会话即使没有变化
    saveUninitialized: false, // 强制将未初始化的会话保存到存储中
    cookie: { 
        secure: false, // 当 secure 是 true 时，cookie 在 HTTP 中是无效的，在 HTTPS 中才有效
        maxAge: 1000 * 60 * 60 * 24 // 设置 cookie 的过期时间，例如：24小时
    }
}));
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: config.password,
  database: 'project_sheldon',
});


// 连接到数据库
db.connect(err => {
  if (err) {
      throw err;
  }
  console.log('Connected to database');
});

// POST请求：插入文章数据
app.post('/sbmit_article', (req, res) => {
  let article_data = req.body;
  console.log('post article:',article_data)
  let sql = 'INSERT INTO articles SET ?';
  db.query(sql, article_data, (err, result) => {
      if (err) {
          res.status(500).send({ message: "Error inserting article", error: err });
      } else {
            user = article_data.aruthor;
            const query = 'UPDATE users SET articleNum = articleNum + 1 WHERE username = ?';
          db.query(query, [user], (err, result) => {
              if (err) {
                  res.status(500).send({ message: "Error updating user imformation", error: err });
              }
              else {
                  res.status(201).send({ message: "Article added successfully", id: result.insertId });
              }
          });       
          
      }
  });
    
});

//get article
app.get('/get_article', (req, res) => {
    const articleId = req.query.article_id;
    if (!articleId) {
        return res.status(400).send('Article ID is required');
    }

    const query = 'SELECT * FROM articles WHERE article_id = ?';
    db.query(query, [articleId], (err, results) => {
        if (err) {
            throw err;
        }
      console.log('get article:', results[0]);
      res.send(results[0]);
    });
});

//get tree list
app.get('/getarticletree', (req, res) => {
    const query = 'SELECT article_id, title, category FROM articles';
    db.query(query, (err, results) => {
        if (err) throw err;

        // 构建分类到文章映射的树形结构
        let tree = [];
        let categories = ['政治', '经济', '社会', '文化'];

        categories.forEach(category => {
            let categoryNode = {
                label: category,
                children: []
            };

            results.forEach(article => {
                if (article.category === category) {
                    categoryNode.children.push({
                        label: article.title,
                        id: article.article_id,
                    });
                }
            });

            tree.push(categoryNode);
        });
    //   console.log(tree);
        res.json(tree);
    });
});

// 用户登录
app.post('/userLogin', (req, res) => { 
    userNmae = req.body.userNmae;
    hashPassword = hashString(req.body.password);
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [userNmae], (err, result) => {
        if (err) {
            res.status(500).send('Server Error');
        }
        else {
            if (result.length === 0) {
                console.log(`no such user ${userNmae}!`)
                res.status(401).send('no such user!ask if sign up.');
            }
            else{
                console.log(result[0].username);
                if (result[0].password_hash == hashPassword) {
                    console.log(`user ${userNmae} login`);
                    res.send('user login successfully!');

                    req.session.user = { userNmae };
                } 
                else {
                    console.log(`user ${userNmae} tyied wrong password`);
                    res.status(402).send('wrong password!');
                }
            }
        }
    });
});

//用户注册
app.post('/userSignup', (req, res) => {
    userNmae = req.body.userNmae;
    hashPassword = hashString(req.body.password);
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [userNmae], (err, result) => {
        if (err) {
            res.status(500).send('Server Error');
        }
        else {
            if (result.length != 0) {
                console.log('user tried to signup with duplicate name.');
                res.status(409).send('user alreaady exists!');
            }
            else {
                const newUser = {
                    username: userNmae,
                    password_hash: hashPassword
                };
                const query = 'INSERT INTO users SET ?';
                db.query(query, newUser, (err, result) => {
                    if (err) {
                        res.status(500).send('Server Error');
                    } 
                    else {
                        console.log(`user ${userNmae} signup!`);
                        res.send('user signup successfully!');
                    }
                });
            }
        }
    })    
});

//获取统计图表数据请求
app.get('/getChartData', (req,res) => {
    const query = 'SELECT username,articleNum,correctNum FROM users'
    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send('Server Error');
        }
        else {
            console.log('获取统计数据');
            res.send(result);
        }
    })
})
// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

function hashString(string) {
    return crypto.createHash('sha256').update(string).digest('hex');
}