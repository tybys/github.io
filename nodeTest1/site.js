var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');
var app = express();

var staticSiteOptions = {
    portnum: 80,
    maxAge: 1000 * 60 * 15
};

app.set('view_engine', 'jade');
app.set('views', __dirname + '/views');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

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

    });
});

// form handling
app.post('/create', function(req, res)
{
    var lkugraph = req.body.LkuGraph;
    var lkfgraph = req.body.LkfGraph;
    var RbGraph = req.body.RbGraph;
    var RestGraph = req.body.RestGraph;
    var Rb_Payments = req.body.Rb_Payments;
    var Showcase = req.body.Showcase;
    var lku = req.body.lku;
    var lkf = req.body.lkf;
    var rb = req.body.rb;
    var sc = req.body.sc;
    var pp = req.body.pp;
    var rest = req.body.rest;

    //res.send(lku);
});

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database: 'express'
});

connection.connect();
connection.query('SELECT * FROM test', function (err, rows, fields)
{
    if (err) throw err;
    console.log(rows)
});

//connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
//    if (err) throw err;
//    console.log('The solution is: ', rows[0].solution);
//});

//connection.end();
//connection.connect();


app.listen(82);
app.use(bodyParser());