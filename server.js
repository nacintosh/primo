global.navigator = {
    userAgent: 'all'
};

const express = require('express');
const app = express();
const ssr = require('./public/js/ssr');
const Datastore = require('@google-cloud/datastore');

const datastore = Datastore({
    projectId: 'future-haiku-151414'
});

const query = datastore.createQuery('YouTube');

app.get('*', function(req, res, next) {
    datastore.runQuery(query, (err, entities) => {
        ssr.default(req, res, entities);
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
