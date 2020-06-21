'use strict';
const express = require('express');
const router = express.Router();


const permissionController = require('../controllers/permissionController');
const authController = require('../controllers/authController');

// Protect all routes after this middleware
router.use(authController.authenticaion, authController.checkPermission);

router.get('/', permissionController.list);
router.get('/:id',  permissionController.getById);
router.post('/', permissionController.add);
router.put('/:id', permissionController.update);
router.delete('/:id', permissionController.delete);

module.exports = router;



 