global.navigator = { userAgent: 'all' };

var express = require('express');
var app = express();
var ssr = require('./public/js/ssr');

app.get('*', function (req, res, next) {
    ssr.default(req, res);
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
