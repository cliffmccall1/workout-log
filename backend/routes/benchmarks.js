const express = require('express');

const BenchmarkController = require('../controllers/benchmarks');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('', checkAuth, BenchmarkController.createBenchmark);

router.put('/:id', checkAuth, BenchmarkController.updateBenchmark);

router.get('', checkAuth, BenchmarkController.getBenchmarks);

router.get('/:id', BenchmarkController.getBenchmark);

router.delete('/:id', checkAuth, BenchmarkController.deleteBenchmark);

module.exports = router;
