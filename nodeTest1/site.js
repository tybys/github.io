/** gmail ************************************************/

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

var scopes  = ['https://www.goggleapis.com/auth/gmail.readonly'];
var TOKEN_DIR = (process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE) + '/.credentials/';
var TOKEN_PATH = TOKEN_DIR + 'gmail-api-quickstart.json';

//console.log(TOKEN_PATH)

/** end-gmail ********************************************/

var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');
var multer = require('multer');
var app = express();
var colors = require('colors/safe'); // does not alter string prototype
// for the parse
var request = require('request');
var cheerio = require('cheerio');


app.set('view_engine', 'jade');
app.set('views', __dirname + '/views');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(multer());
require(__dirname + '/js_server/helpers.js');

//

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
                var actualRow = function () {
                    return results.getObject(req.query.reportPicker, 'id');
                };

                res.render('reports.jade', {
                    data: results,
                    title: "title",
                    header: "header",
                    actualRow: actualRow(),
                    reportPicker: req.query.reportPicker
                });
            }
        });
    }
);

app.get('/create', function (req, res)
{
    res.render('create.jade', {});
});

app.get('/getReport', function (req, res, err)
{
    var objBD = BD();

    objBD.query('SELECT * FROM report WHERE id = "'+req.query.reportPicker+'" ', function (err, results, fields)
    {
        if (err)
        {
            throw err;
        }
        else
        {
            //console.log(results)
        }
    });
    objBD.end();
});

// MYSQL
function BD() {
    var connection = mysql.createConnection({
        user: 'root',
        password: 'tabasov.dunichev.rysin.kfrhfvf',
        //password: '',
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