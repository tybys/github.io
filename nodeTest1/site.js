var path = require('path');
var express = require('express');
var app = express();

var staticSiteOptions = {
    portnum: 80,
    maxAge: 1000 * 60 * 15
};


    app.set('view', __dirname + 'app/view');
    app.set('view_engine', 'jade');
    app.use(app.mountpath);


app.get('/', function (req, res)
{
    res.render('index.jade', {
        title: 'my index jade file'
    });
});

app.listen(80);

//express().use(express.static(
//    path.join(__dirname, 'static'),
//    staticSiteOptions
//)).listen(staticSiteOptions.portnum);

