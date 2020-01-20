const mysql = require('mysql');


const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'test'
});

connection.connect(function(err) {
  if (err) throw err;
  connection.query("SELECT * FROM food", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});
