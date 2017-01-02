global.navigator = {
    userAgent: 'all'
};

const express = require('express');
const app = express();
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
const ssr = require('./public/js/ssr');
const Datastore = require('@google-cloud/datastore');
const datastore = Datastore({
    projectId: 'future-haiku-151414'
});

const query = datastore.createQuery('YouTube');

app.get('/', function(req, res, next) {
    datastore.runQuery(query, (err, entities) => {
        ssr.default(req, res, entities);
    });
});

app.get('/js/bundle.js', function(req, res, next) {
    res.setHeader('content-type', 'application/javascript');
    res.sendFile('./public/js/bundle.js');
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
