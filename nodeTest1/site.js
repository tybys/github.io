var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');
var app = express();

app.set('view_engine', 'jade');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get('/', function (req, res)
{
    res.render('index.jade', {});
});

app.get('/reports', function (req, res)
{
    var objBD = BD();

    objBD.query('SELECT * FROM report', function (err, results, fields)
    {
        if (err)
        {
            throw err;
        }
        else
        {
            res.render('reports.jade', {
                data: results
            });
        }
    });
});

app.get('/create', function (req, res)
{
    res.render('create.jade', {});
});

// getting data from BD
app.get('/getReport', function (req, res)
{
   console.log(req.body.reportPicker)
});

// MYSQL
function BD() {
    var connection = mysql.createConnection({
        user: 'root',
        password: '',
        host: 'localhost',
        database: 'express'
    });
    return connection;
}

// form handling
app.post('/create', function (req, res)
{
    var objBD = BD();

    var post = {
        //Graph: req.body.Graph,
        //Rb_Payments: req.body.Rb_Payments,
        //Showcase: req.body.Showcase,
        //lku: req.body.lku,
        //lkf: req.body.lkf,
        //rb: req.body.rb,
        //sc: req.body.sc,
        //pp: req.body.pp,
        //rest: req.body.rest
    };

    objBD.query('INSERT INTO report (graph, lku, lkf, rb, sc, pp, rest, _date) values ("'+req.body.graph+'", "'+req.body.lku+'", "'+req.body.lkf+'", "'+req.body.rb+'", "'+req.body.sc+'", "'+req.body.pp+'", "'+req.body.rest+'", "'+req.body._date+'")', function (err, results, fields)
    {
        if (err)
        {
            throw err;
        }
        else
        {
            console.log(req.body.graph,req.body.lku,req.body.lkf,req.body.rb,req.body.sc,req.body.pp,req.body.rest)
            res.send('success');
        }
    });
    objBD.end();
});

app.listen(8000);