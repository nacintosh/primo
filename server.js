const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

const ssr = require('./public/js/ssr');
const Datastore = require('@google-cloud/datastore');
const datastore = Datastore({
    projectId: 'future-haiku-151414'
});

const query = datastore.createQuery('YouTube')
    .order('created', {
        descending: true
    });

app.get('/', function(req, res, next) {
    datastore.runQuery(query, (err, entities) => {
        ssr.default(req, res, entities);
    });
});

app.get('/js/bundle.js', function(req, res, next) {
    res.setHeader('content-type', 'application/javascript');
    res.sendFile('./public/js/bundle.js');
});

app.post('/register', function(req, res, next) {
    const taskKey = datastore.key(['YouTube']);

    // Prepares the new entity
    const task = {
        key: taskKey,
        data: {
            videoid: req.body.videoid,
            created: new Date()
        }
    };

    datastore.save(task)
        .then(() => {
            console.log(`Saved ${task.data.videoid}`);
            res.send(task);
        });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});
