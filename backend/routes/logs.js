const express = require('express');

const LogsController = require('../controllers/logs');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('', checkAuth, LogsController.createLog);

router.put('/:id', checkAuth, LogsController.updateLog);

router.get('', checkAuth, LogsController.getLogs);

router.get('/:id', LogsController.getLog);

router.delete('/:id', checkAuth, LogsController.deleteLog);

module.exports = router;
