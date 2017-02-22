/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
const ssr = require('./public/js/ssr');
const Datastore = require('@google-cloud/datastore');
const datastore = Datastore({
    projectId: 'primo-159514'
});

const query = datastore.createQuery('YouTube')
    .order('created', {
        descending: true
    });

exports.listen = function helloGET (req, res) {
  datastore.runQuery(query, (err, entities) => {
      ssr.default(req, res, entities);
  });
};
