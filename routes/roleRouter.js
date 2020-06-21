'use strict';
const express = require('express');
const router = express.Router();

const roleValidate = require('../validates/roleValidate');

const roleController = require('../controllers/roleController');
const authController = require('../controllers/authController');

// Protect all routes after this middleware
router.use(authController.authenticaion, authController.checkPermission);


router.get('/', roleValidate.list, roleController.list);
router.get('/:id', roleValidate.getById, roleController.getById);
router.post('/', roleValidate.add, roleController.add);
router.put('/:id', roleValidate.update, roleController.update);
router.delete('/:id', roleValidate.delete, roleController.delete);

module.exports = router;



 