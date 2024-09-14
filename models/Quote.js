const mongoose = require('mongoose');

const quoteSchema = new mongoose.Schema({
  quote: { type: String, required: true },
  character: { type: String, required: true },
  anime: { type: String, required: true }
});

module.exports = mongoose.model('Quote', quoteSchema);
