var path = require('path');
var express = require('express');
var app = express();

var staticSiteOptions = {
    portnum: 80,
    maxAge: 1000 * 60 * 15
};

app.set('view_engine', 'jade');
app.set('views', __dirname + '/views');

app.get('/', function (req, res)
{
    res.render('index.jade', {
        title: 'my index jade file'
    });
});

app.get('/reports', function (req, res)
{
    res.render('reports.jade', {

    })
});

app.get('/create', function (req, res)
{
    res.render('create.jade', {

    })
});

app.post('/report', function (req, res)
{
    console.log(1)
});

var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'tabasov.dunichev.rysin.kfrhfvf'
});


connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
    if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
});

connection.end();
connection.connect();


app.listen(8080);

//express().use(express.static(
//    path.join(__dirname, 'static'),
//    staticSiteOptions
//)).listen(staticSiteOptions.portnum);

