const mongoose = require('mongoose');

const { Schema } = mongoose;

const visitSchema = new Schema({
  geo: String,
  ip: String,
  connected_at: Date,
  left_at: Date,
});

module.exports = mongoose.model('visits', visitSchema);
