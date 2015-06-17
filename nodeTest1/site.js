var path = require('path');
var express = require('express');


var staticSiteOptions = {
    portnum: 80,
    maxAge: 1000 * 60 * 15
};

express().use(express.static(
    path.join(__dirname, 'static'),
    staticSiteOptions
)).listen(staticSiteOptions.portnum);