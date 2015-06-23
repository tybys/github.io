var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');
var multer = require('multer');
var app = express();
var colors = require('colors/safe'); // does not alter string prototype


app.set('view_engine', 'jade');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(multer());

/**
 * getting /main page
 * return index tpl
 */
app.get('/', function (req, res)
{
    res.render('index.jade', {});
});

/**
 * getting /report page
 * return row from db
 */
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

/**
 * /create page
 * posting form-data to bd
 */
app.get('/create', function (req, res)
{
    res.render('create.jade', {});
});

// getting data from BD
app.get('/getReport', function (req, res, err)
{
    var objBD = BD();

    objBD.query('SELECT * FROM report WHERE id = "'+req.query.reportPicker+'" ', function (err, results, fields)
    //objBD.query('SELECT * FROM report WHERE id', function (err, results, fields)
    {
        if (err)
        {
            throw err;
        }
        else
        {
            console.log(results)
            res.send('success');
        }
    });
    objBD.end();
});

// MYSQL
function BD() {
    var connection = mysql.createConnection({
        user: 'root',
        password: 'tabasov.dunichev.rysin.kfrhfvf',
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