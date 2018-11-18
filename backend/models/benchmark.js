const mongoose = require('mongoose');

// Schema - blueprint for mongoose
const benchmarkSchema = mongoose.Schema({
  type: String,
  title: { type: String, required: true },
  content: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

module.exports = mongoose.model('Benchmark', benchmarkSchema);

// collection on mlab will be benchmarks
