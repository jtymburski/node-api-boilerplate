const mongoose = require('mongoose');

// SCHEMA DEFINITION

const SampleSchema = new mongoose.Schema({
  public_id: { type: String, required: true, index: { unique: true } },
  name: { type: String, required: true },
  description: { type: String, required: true },
  age: Number,
});

module.exports = mongoose.model('Sample', SampleSchema);
