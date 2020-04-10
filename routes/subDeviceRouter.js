'use strict';
const express = require('express');
const router = express.Router();

const subDeviceValidate = require('../validates/subDeviceValidate');

const subDeviceController = require('../controllers/subDeviceController');
const authController = require('../controllers/authController');

// Protect all routes after this middleware
router.use(authController.authenticaion);

router.get('/', subDeviceValidate.list, subDeviceController.list);
router.get('/:id', subDeviceValidate.getById, subDeviceController.getById);
router.post('/', subDeviceValidate.add, subDeviceController.add);
router.put('/:id', subDeviceValidate.update, subDeviceController.update);
router.delete('/:id', subDeviceValidate.delete, subDeviceController.delete);

module.exports = router;