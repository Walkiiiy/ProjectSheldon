const express = require('express');
const mysql=require('mysql');
const fs = require('fs');

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

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Zqp021025',
  database: 'articles_db',
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
  console.log(article_data)
  let sql = 'INSERT INTO articles SET ?';
  db.query(sql, article_data, (err, result) => {
      if (err) {
          res.status(500).send({ message: "Error inserting article", error: err });
      } else {
          res.status(201).send({ message: "Article added successfully", id: result.insertId });
      }
  });
});



// 启动服务器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
