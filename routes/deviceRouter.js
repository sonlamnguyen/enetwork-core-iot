'use strict';
const express = require('express');
const router = express.Router();

const deviceValidate = require('../validates/deviceValidate');

const deviceController = require('../controllers/deviceController');
const authController = require('../controllers/authController');

// Protect all routes after this middleware
router.use(authController.authenticaion);

router.get('/', deviceValidate.list, deviceController.list);
router.get('/:id', deviceValidate.getById, deviceController.getById);
router.post('/', deviceValidate.add, deviceController.add);
router.put('/:id', deviceValidate.update, deviceController.update);
router.delete('/:id', deviceValidate.delete, deviceController.delete);

module.exports = router;