'use strict';
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const thingControlController = require('../controllers/thingControlController');

// Protect all routes after this middleware
router.use(authController.authenticaion, authController.checkPermission);

router.post('/control', thingControlController.control);
router.post('/config', thingControlController.config);
router.get('/connection/:deviceId', thingControlController.connection);

module.exports = router;