const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController');


router.post('/process-rule', webhookController.process_rule);
router.post('/auth', webhookController.auth);
router.post('/access', webhookController.auth_acl);


module.exports = router;