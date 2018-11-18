const Benchmark = require('../models/benchmark');

exports.createBenchmark = (req, res, next) => {
  const benchmark = new Benchmark({
    type: req.body.type,
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
  });
  // saves to db
  benchmark
    .save()
    .then(createdBenchmark => {
      res.status(201).json({
        message: 'Benchmark added successfully',
        BenchmarkId: createdBenchmark._id
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Creating a post failed!'
      });
    });
};

exports.updateBenchmark = (req, res, next) => {
  const benchmark = new Benchmark({
    _id: req.body.id,
    type: req.body.type,
    title: req.body.title,
    content: req.body.content,
    creator: req.userData.userId
  });
  Benchmark.updateOne({ _id: req.params.id }, benchmark)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: 'Update successful!' });
      } else {
        res.status(401).json({ message: 'Not authorized!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Couldn't udpate benchmark!"
      });
    });
};

exports.getBenchmarks = (req, res, next) => {
  const creator = req.userData.userId;
  Benchmark.find({ creator: creator })
    .limit(4)
    .then(benchmarks => {
      res.status(200).json({
        message: 'Benchmarks fetched successfully!',
        benchmarks: benchmarks
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching benchmarks failed!'
      });
    });
};

exports.getBenchmark = (req, res, next) => {
  Benchmark.findById(req.params.id)
    .then(benchmark => {
      if (benchmark) {
        res.status(200).json(benchmark);
      } else {
        res.status(404).json({ message: 'Benchmark not found!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Fetching benchmark failed!'
      });
    });
};

exports.deleteBenchmark = (req, res, next) => {
  Benchmark.deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then(result => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: 'Deletion successful!' });
      } else {
        res.status(401).json({ message: 'Not authorized!' });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'Deleting benchmarks failed!'
      });
    });
};
