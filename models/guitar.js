var mongoose = require('mongoose');

var guitarSchema = new mongoose.Schema({
  guitarId: { type: String, unique: true, index: true },
  brand: String,
  model: String,
  picture: String,
  wins: Number,
  losses: { type: Number, default: 0 },
  random: { type: [Number], index: '2d' },
});

module.exports = mongoose.model('Guitar', guitarSchema);