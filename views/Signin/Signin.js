
var username;
var username;

function signin() {
  username = document.getElementById('AC').value;
  userpassword = document.getElementById('PW').value;
  window.alert(username + userpassword);
}


/*
var express = require('express'),
    User = require('../models/user.js'),
    router = express.Router(),
    crypto = require('crypto'),
    title = '登入';


router.get('/', function(req, res) {
    res.render('login', {title:title});
});


router.post('/', function(req, res) {
    var userName = req.body['txtUserName'],
        userPwd = req.body['txtUserPwd'],
        md5 = crypto.createHash('md5');

    User.getUserByUserName(userName, function (err, results) {
        if(results == '') {
            res.locals.error = '使用者不存在';
            res.render('login',{title:title});
            return;
        }


        userPwd = md5.update(userPwd).digest('hex');
        if(results[0].UserName != userName || results[0].UserPass != userPwd) {
            res.locals.error = '使用者帳號或密碼錯誤';
            res.render('login',{title:title});
            return;
        } else {
            res.locals.username = userName;
            //設定session
            req.session.username = res.locals.username;
            console.log(req.session.username);
            res.redirect('/');
            return;
        }
    });
});


module.exports = router;
*/
