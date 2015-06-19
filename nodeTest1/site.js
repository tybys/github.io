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

app.listen(80);

//express().use(express.static(
//    path.join(__dirname, 'static'),
//    staticSiteOptions
//)).listen(staticSiteOptions.portnum);

