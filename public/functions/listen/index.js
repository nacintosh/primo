/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
const ssr = require('./ssr');
const Datastore = require('@google-cloud/datastore');
const datastore = Datastore({
  projectId: 'primo-159514'
});

const query = datastore.createQuery('YouTube').order('created', {
  descending: true
});

var WebClient = require('@slack/client').WebClient;
var token = process.env.SLACK_API_TOKEN || '';
var web = new WebClient(token);

exports.listen = function listen(req, res) {
  web.channels.history('C421S7TCH', {'count' : 1000}, function(err, info) {
     if (err) {
       console.log(err);
       return;
     }
     var entities = [];
     for(var i in info.messages) {
       var matches = info.messages[i].text.match(/https:\/\/www\.youtube\.com\/watch\?v=[A-Za-z0-9_-]+/g);
       if (!matches) {
         continue;
       }
       for (var j in matches) {
         var videoid = matches[j].match(/v=[A-Za-z0-9_-]+/g)[0].substr(2); // v=
         entities.push({ 'videoid' : videoid } );
       }
     }
     ssr.default(req, res, entities);
  });

//  datastore.runQuery(query, (err, entities) => {
//    console.log(entities);
//    ssr.default(req, res, entities);
//  });
};
