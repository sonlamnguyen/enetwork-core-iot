'use strict';
const express = require('express');
const router = express.Router();

const reportValidate = require('../validates/reportValidate');

const reportDeviceController = require('../controllers/reportController');
const authController = require('../controllers/authController');

// Protect all routes after this middleware
router.use(authController.authenticaion);

router.get('/input', reportValidate.reportInput, reportDeviceController.reportInput);

module.exports = router;