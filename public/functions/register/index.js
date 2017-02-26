/**
 * HTTP Cloud Function.
 *
 * @param {Object} req Cloud Function request context.
 * @param {Object} res Cloud Function response context.
 */
const Datastore = require('@google-cloud/datastore');
const datastore = Datastore({
  projectId: 'primo-159514'
});

exports.register = function register(req, res) {
  const taskKey = datastore.key(['YouTube']);

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
};
