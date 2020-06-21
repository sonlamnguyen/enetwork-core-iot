'use strict';
const express = require('express');
const router = express.Router();

const deviceUserValidate = require('../validates/deviceUserValidate');


const deviceUserController = require('../controllers/deviceUserController');
const authController = require('../controllers/authController');

// Protect all routes after this middleware
router.use(authController.authenticaion, authController.checkPermission);

router.get('/', deviceUserValidate.list, deviceUserController.list);
router.post('/', deviceUserValidate.add, deviceUserController.insertOrUpdate);
router.get('/:id', deviceUserValidate.getById, deviceUserController.getById);
router.delete('/:id', deviceUserValidate.delete, deviceUserController.delete);

module.exports = router;