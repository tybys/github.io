var mysql = require('mysql');
var bodyParser = require('body-parser');
var path = require('path');
var express = require('express');
var multer = require('multer');
var Buffer = require('buffer').Buffer;
var app = express();

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
    //res.render('index.jade', {});
    var objBD = BD();
    objBD.query('SELECT id, graph, lku, lkf, rb, sc, pp, rest, _date, _taskRow FROM report', function (err, results, fields)
    {
        if (err)
        {
            throw err;
        }
        else
        {
            var actualRow = function ()
            {
                return results.getObject(req.query.reportPicker, 'id');
            };

            var ff = function ()
            {
                te = results.getObject(req.query.reportPicker, 'id');
                fid = [];
                for (var key in te)
                {
                    if (te.hasOwnProperty(key))
                    {
                        fid.push(new Buffer(te['_taskRow'], 'base64').toString('utf8'));
                    }
                    break;
                }

                return fid;
            }

            //http://jaukia.github.io/zoomooz/
            res.render('index.jade',
                {
                    data: results,
                    actualRow: actualRow(),
                    tf: ff(),
                    //test: new Buffer(actualRow()._taskRow, 'base64').toString('utf8'),
                    reportPicker: req.query.reportPicker
                });
            //  process.exit();
        }
    });
});

app.get('/reports', function (req, res)
{

});

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
app.post('/create', function (req, res, next)
{
    var objBD = BD();
    var taskRowB64 = new Buffer(req.body.taskRow).toString('base64')

    objBD.query('INSERT INTO report (graph, lku, lkf, rb, sc, pp, rest, _date, _taskRow) values ("'+req.body.graph+'", "'+req.body.lku+'", "'+req.body.lkf+'", "'+req.body.rb+'", "'+req.body.sc+'", "'+req.body.pp+'", "'+req.body.rest+'", "'+req.body._date+'", "'+taskRowB64+'")', function (err, results, fields)
    {
        if (err)
        {
            throw err;
        }
        else
        {
            res.send('success');

            //next();
        }
    });
    objBD.end();
});

app.listen(8000);