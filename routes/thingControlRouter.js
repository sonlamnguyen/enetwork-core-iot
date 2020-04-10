'use strict';
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');
const thingControlController = require('../controllers/thingControlController');

// Protect all routes after this middleware
router.use(authController.authenticaion);

router.post('/control', thingControlController.control);
router.post('/connection', thingControlController.control);

module.exports = router;