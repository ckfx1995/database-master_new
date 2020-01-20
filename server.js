const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');


const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'ckfx1995'
});

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res) {

    var data = "";
    connection.query('SELECT * FROM food', function(err, result, fields) {
        if (err) {
            console.log(err);
        }
        var data = result;
        res.render('index.ejs', { title: 'Account Information', data: data});
    });

});

app.get('/adim', function(req, res) {

      connection.query('SELECT * FROM gamelist', function(err, result, fields) {
          if (err) {
              console.log(err);
          }
          console.log(result.length);

          var data2 = result;
          res.render('admin_management/admin_management.ejs',{title: 'Account Information',data2:data2});
      });



});
app.get('/adimfound', function(req, res) {
      var id = req.query.id;
      connection.query('SELECT * FROM gamelist', function(err, result, fields) {
          if (err) {
              console.log(err);
          }
          console.log(result.length);

          var data2 = result;
          res.render('admin_management/admin_management.ejs',{title: 'Account Information',data2:data2});
      });



});

app.get('/Signin', function(req, res) {

        res.render('Signin/index.ejs');

});

app.get('/AddFood', function(req, res,next) {

        res.render('AddFood/Addfood.ejs');

});
app.post('/AddFood2', function(req, res,next) {
  var userName = req.body.txtName,
      userPrice = req.body.txtPrice,
      userTime = req.body.txtTime
    //  md5 = crypto.createHash('md5');

    //  userPwd = md5.update(userPwd).digest('hex');
      connection.query('SELECT * FROM food', function(err, result, fields) {
          if (err) {
              console.log(err);
          }
          var data2 = result;
          connection.query('INSERT INTO food (Food_ID, Original_price,Need_how_much_time_do,Food_Name)VALUES (?, ?, ?, ?)', [data2.length+1, userPrice,userTime,userName], function (err,result) {
            if (err) {
            console.log(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/Adim');
      });
      });
  });

app.get('/reviewer', function(req, res, next) {

      var id = req.query.id;
      var orderby = req.query.orderby;
      connection.query('SELECT * FROM gamelist WHERE id = ?', [id,orderby], function(err, result, fields){
        if (err) {

            console.log(err);
          }
          console.log(result);
          var data1 = result;
      if(orderby=='playtime'){
      connection.query('SELECT * FROM reviewer WHERE gameid = ? ORDER BY playtime desc', id, function(err, result, fields) {
            if (orderby) {
                console.log(err);
              }
              console.log(result.length);
              var data2 = result;
              res.render('reviewer/reviewer.ejs', { title: 'reviewer',data1: data1 , data2: data2 });
            });
      }
      if(orderby=='recommend'){
        connection.query('SELECT * FROM reviewer WHERE gameid = ? ORDER BY recommend desc', id, function(err, result, fields) {
            if (err) {
                console.log(err);
              }
          console.log(result.length);
          var data2 = result;
          res.render('reviewer/reviewer.ejs', { title: 'reviewer',data1: data1 , data2: data2 });
        });
      }
      if(orderby=='urecommend'){
        connection.query('SELECT * FROM reviewer WHERE gameid = ? ORDER BY recommend', id, function(err, result, fields) {
            if (err) {
                console.log(err);
              }
          console.log(result.length);
          var data2 = result;
          res.render('reviewer/reviewer.ejs', { title: 'reviewer',data1: data1 , data2: data2 });
        });
      }
      if(orderby=='agree'){
        connection.query('SELECT * FROM reviewer WHERE gameid = ? ORDER BY agree desc', id, function(err, result, fields) {
            if (err) {
                console.log(err);
              }
          console.log(result.length);
          var data2 = result;
          res.render('reviewer/reviewer.ejs', { title: 'reviewer',data1: data1 , data2: data2 });
        });
      }
});
  });


  app.get('/Signup', function(req, res,next) {

          res.render('Signup/Signup.ejs');

  });
  app.post('/userSignup', function(req, res,next) {
    var userName = req.body.txtUserName,
        userPwd = req.body.txtUserPwd,
        userEmail = req.body.txtUserEmail,
        userSexy = req.body.txtSexy,
        userPhone = req.body.txtPhone
      //  md5 = crypto.createHash('md5');

      //  userPwd = md5.update(userPwd).digest('hex');
        connection.query('SELECT * FROM member', function(err, result, fields) {
            if (err) {
                console.log(err);
            }
            var data2 = result;
            connection.query('INSERT INTO Member (ID, Acount, Password, Email, Sex, PhoneNumber, Level)VALUES (?, ?, ?, ?, ?, ?, 1)', [data2.length+1,userName, userPwd,userEmail,userSexy,userPhone], function (err,result) {
              if (err) {
              console.log(err);
          }
          res.setHeader('Content-Type', 'application/json');
          res.redirect('/Adim');
        });
        });
    });
  app.get('/ADSignup', function(req, res,next) {

          res.render('AdminSignup/Signup.ejs');

  });
  app.post('/forADSignup', function(req, res,next) {
    var userName = req.body.txtUserName,
        userPwd = req.body.txtUserPwd,
        userEmail = req.body.txtUserEmail,
        userSexy = req.body.txtSexy,
        userPhone = req.body.txtPhone
        userLevel = req.body.txtLevel
      //  md5 = crypto.createHash('md5');

      //  userPwd = md5.update(userPwd).digest('hex');
        connection.query('SELECT * FROM member', function(err, result, fields) {
            if (err) {
                console.log(err);
            }
            var data2 = result;
            connection.query('INSERT INTO Member (ID, Acount, Password, Email, Sex, PhoneNumber, Level)VALUES (?, ?, ?, ?, ?, ?, ?)', [data2.length+1,userName, userPwd,userEmail,userSexy,userPhone,userLevel], function (err,result) {
              if (err) {
              console.log(err);
          }
          res.setHeader('Content-Type', 'application/json');
          res.redirect('/Adim');
        });
        });
    });
app.use('/static', express.static('public'))


connection.connect(function(err) {
    if (err) {
        console.error('Error on connecting to MySQL: ' + err.stack);
        return;
    }
    app.listen(3000, function() {
        console.log('Listening on port 3000');
    })
});
/*
connection.connect(function(err) {
  //if (err) throw err;
  connection.query("SELECT * FROM food", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});*/
