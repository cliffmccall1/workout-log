const express = require('express');

const ProfileController = require('../controllers/profiles');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

router.post('', checkAuth, ProfileController.createProfile);

router.put('/:id', checkAuth, ProfileController.updateProfile);

router.get('', checkAuth, ProfileController.getProfiles);

router.get('/:id', ProfileController.getProfile);

router.delete('/:id', checkAuth, ProfileController.deleteProfile);

module.exports = router;
