'use strict';
const express = require('express');
const router = express.Router();

const userValidate = require('../validates/userValidate');

const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// Protect all routes after this middleware
router.use(authController.authenticaion);
router.get('/', userValidate.list, userController.list);
router.get('/:id', userValidate.getById, userController.getById);
router.post('/', userValidate.add, userController.add);
router.put('/:id', userValidate.update, userController.update);
router.delete('/:id', userValidate.delete, userController.delete);

module.exports = router;