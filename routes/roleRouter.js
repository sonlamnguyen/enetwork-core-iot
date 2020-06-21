'use strict';
const express = require('express');
const router = express.Router();

const roleValidate = require('../validates/roleValidate');

const roleController = require('../controllers/roleController');
const authController = require('../controllers/authController');

// Protect all routes after this middleware
router.use(authController.authenticaion, authController.checkPermission);


router.get('/',  roleController.list);
router.get('/:id',  roleController.getById);
router.post('/', roleController.add);
router.put('/:id', roleController.update);
router.delete('/:id', roleController.delete);

module.exports = router;



 