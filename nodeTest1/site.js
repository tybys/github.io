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
app.use(bodyParser.urlencoded({extended: true}));
app.use(multer());
require(__dirname + '/js_server/helpers.js');


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

app.get('/', function (req, res)
{
    var TasksRow = function (results)
    {
        var te = results.getObject(req.query.reportPicker, 'id');
        var fid = [];
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

    function view (model)
    {
        res.render('index.jade', model);
    }

    //function view (viewname, model)
    //{
    //    res.render(viewname, model);
    //}

    var objBD = BD();
    objBD.query('SELECT id, graph, lku, lkf, rb, sc, pp, rest, _date, _taskRow FROM report', function (err, results, fields)
    {
        if (err)
        {
            throw err;
        }
        else
        {
            var model = {
                data: results,
                actualRow: results.getObject(req.query.reportPicker, 'id'),
                tf: TasksRow(results)
            };

            var objBD = BD();
            objBD.query('SELECT * FROM workers', function (err, results, fields)
            {
                if (err)
                {
                    throw err;
                }
                else
                {
                    model.workers = results.getObject(9, 'id');
                    view(model);
                    //view('index.jadde');
                }
            });

        }


    });
});

app.get('/create', function (req, res)
{
    res.render('create.jade', {});
});

app.post('/two', function (req, res, err)
{
    var objBD = BD();
    objBD.query('UPDATE workers SET tabasov = ?, korshakovcki = ?, petrov = ? WHERE id = ?', [req.body.tabasov, req.body.korshakovcki, req.body.petrov, 9], function (err, results, fields)
    {
        if (err)
        {
            throw err;
        }
        else
        {
            res.send({
                workers: fields
            });
        }
    });

    objBD.end();
});

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
        }
    });
});

app.listen(8000);