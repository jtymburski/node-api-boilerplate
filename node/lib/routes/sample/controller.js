const DbSample = require(`${__root}db/model/sample`);

module.exports = (app) => {
  if (!app) throw new Error('Missing parameter: \'app\' not provided');

  const express = require('express');
  const controller = express.Router();

  controller.route('/data')
    // gets all samples
    .get(getAll)
    // create a sample
    .post(create);

  return controller;
};

/**
 * Creates a single sample
 * @in SampleInfo create model
 * @out SampleInfo result model
 */
function create(req, res, next) {
  DbSample.create(req.body.name, req.body.description, req.body.age)
    .then(sample => HttpHelper.success(req, res, 201, sample))
    .catch(err => HttpHelper.processError(err, next));
}

/**
 * Fetches all samples
 * @out array of SampleInfo models
 */
function getAll(req, res, next) {
  DbSample.getAll()
    .then(samples => HttpHelper.success(req, res, 200, samples))
    .catch(err => HttpHelper.processError(err, next));
}
