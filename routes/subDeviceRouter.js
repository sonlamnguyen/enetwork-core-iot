'use strict';
const express = require('express');
const router = express.Router();

const deviceValidate = require('../validates/deviceValidate');


const deviceController = require('../controllers/deviceController');
const subDeviceController = require('../controllers/subDeviceController');
const authController = require('../controllers/authController');

// Protect all routes after this middleware
router.use(authController.authenticaion);

router.get('/', deviceValidate.list, deviceController.list);
router.get('/:id', deviceValidate.getById, deviceController.getById);
router.post('/', subDeviceController.add);
router.put('/:deviceId/type/:type/channelId/:channelId', subDeviceController.update);
router.delete('/:deviceId/type/:type/channelId/:channelId', subDeviceController.delete);

module.exports = router;