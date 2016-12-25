global.navigator = { userAgent: 'all' };

var express = require('express');
var app = express();
var ssr = require('./public/js/ssr');

app.get('*', function (req, res, next) {
    ssr.default(req, res);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
