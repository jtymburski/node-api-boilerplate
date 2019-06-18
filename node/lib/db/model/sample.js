const mongoose = require('mongoose');

// SCHEMA DEFINITION

const SampleSchema = new mongoose.Schema({
  public_id: { type: String, required: true, index: { unique: true } },
  name: { type: String, required: true },
  description: { type: String, required: true },
  age: Number
});

// MODEL DEFINITION

const SampleModel = mongoose.model('Sample', SampleSchema);

// EXPORTS

module.exports = {
  getAll: getAll
};

/**
 * Fetches all entries in the model
 * @return array of sample schema objects
 */
function getAll() {
  return SampleModel.find();
}
